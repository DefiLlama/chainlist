const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { before, test } = require("node:test");
const vm = require("node:vm");
const { generateSiteMap } = require("../generate-sitemap.js");

let getActiveChains;
before(async () => {
  const source = readFileSync(path.join(__dirname, "../utils/chains.js"), "utf8");
  ({ getActiveChains } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`));
});

const chains = [
  { chainId: 1, name: "Retired Network", shortName: "retired", status: "deprecated" },
  { chainId: 2, name: "Active Network", shortName: "active", status: "active" },
  { chainId: 3, name: "Incubating Network", shortName: "incubating", status: "incubating" },
  { chainId: 4, name: "Default Network", shortName: "default" },
];
const chainIds = { 1: "retired-slug", 2: "active-slug", 3: "incubating-slug", 4: "default-slug" };
const pageFiles = ["pages/chain/[chain].js", "pages/add-network/[chain].js", "pages/zh/chain/[chain].js"];

function loadPage(file, baseChains = chains, overwrittenChains = []) {
  const source = readFileSync(path.join(__dirname, "..", file), "utf8");
  const start = source.indexOf("export async function getStaticProps(");
  const end = source.indexOf("\nfunction Chain(");
  assert.ok(start >= 0 && end > start, "Expected server-side page loaders before the JSX component");

  // Execute the actual data loaders with fixture imports, without compiling JSX or accessing the network.
  const loaders = source.slice(start, end).replace(/export async function/g, "async function");
  let populationCalls = 0;
  const context = {
    getActiveChains,
    overwrittenChains,
    chainIds,
    fetchWithCache: async (url) => url === "https://chainid.network/chains.json" ? baseChains : [],
    populateChain: (chain) => {
      populationCalls++;
      return chain;
    },
  };
  return {
    ...vm.runInNewContext(`${loaders}\n({ getStaticProps, getStaticPaths });`, context, { filename: file }),
    populationCalls: () => populationCalls,
  };
}

test("active registry excludes deprecated base records and overrides without mutating inputs", () => {
  const overrides = [
    { chainId: 2, name: "Retired Override", status: "deprecated" },
    { chainId: 5, name: "Active Override", status: "active" },
    { chainId: 6, name: "Retired Additional Network", status: "deprecated" },
  ];
  const before = JSON.stringify({ chains, overrides });
  assert.deepEqual(getActiveChains(chains, overrides).map((chain) => chain.chainId), [3, 4, 5]);
  assert.equal(JSON.stringify({ chains, overrides }), before);
});

test("homepage and RPC registry generation also reject deprecated overrides", async () => {
  const source = readFileSync(path.join(__dirname, "../utils/fetch.js"), "utf8");
  const start = source.indexOf("export async function generateChainData(");
  assert.ok(start >= 0);
  const generator = vm.runInNewContext(
    `${source.slice(start).replace("export async function", "async function")}\ngenerateChainData;`,
    {
      getActiveChains,
      overwrittenChains: [{ chainId: 2, name: "Retired Override", status: "deprecated" }],
      fetchWithCache: async (url) => url === "https://chainid.network/chains.json" ? chains : [],
      populateChain: (chain) => chain,
      handleTestnets: (chains) => chains,
    },
  );
  assert.deepEqual(Array.from(await generator(), (chain) => chain.chainId), [3, 4]);
});

for (const file of pageFiles) {
  test(`${file}: override name lookup retains precedence over a different base ID`, async () => {
    const override = { chainId: 5, name: "Active Network", shortName: "active", status: "active" };
    const page = loadPage(file, chains, [override]);
    assert.equal((await page.getStaticProps({ params: { chain: "active network" } })).props.chain, override);
    override.status = "deprecated";
    assert.equal((await page.getStaticProps({ params: { chain: "active network" } })).notFound, true);
  });

  test(`${file}: deprecated numeric, name and mapped-slug lookups fail closed`, async () => {
    const page = loadPage(file);
    for (const query of ["1", "retired network", "RETIRED%20NETWORK", "retired-slug", "missing"]) {
      const result = await page.getStaticProps({ params: { chain: query } });
      assert.equal(result.notFound, true, query);
      assert.equal(result.props, undefined, query);
    }
    assert.equal(page.populationCalls(), 0, "Rejected records must not be populated for wallet/RPC use");
  });

  test(`${file}: active, incubating and unspecified statuses stay available`, async () => {
    const page = loadPage(file);
    for (const chain of chains.slice(1)) {
      for (const query of [chain.chainId.toString(), chain.name.toLowerCase(), chainIds[chain.chainId]]) {
        const result = await page.getStaticProps({ params: { chain: query } });
        assert.equal(result.props.chain.chainId, chain.chainId, query);
      }
    }
    const { paths, fallback } = await page.getStaticPaths();
    assert.equal(fallback, false);
    assert.deepEqual(Array.from(paths, (entry) => entry.params.chain), [
      "2", "active network", "3", "incubating network", "4", "default network",
    ]);
  });

  test(`${file}: a deprecated override cannot expose its active base record`, async () => {
    const retiredOverride = { chainId: 2, name: "Retired Override", status: "deprecated" };
    const activeOverride = { chainId: 5, name: "Additional Network", status: "active" };
    const page = loadPage(file, chains, [retiredOverride, activeOverride]);
    for (const query of ["2", "active network", "retired override", "active-slug"]) {
      assert.equal((await page.getStaticProps({ params: { chain: query } })).notFound, true, query);
    }
    const { paths } = await page.getStaticPaths();
    assert.deepEqual(Array.from(paths, (entry) => entry.params.chain), [
      "3", "incubating network", "4", "default network", "5", "additional network",
    ]);
    assert.equal((await page.getStaticProps({ params: { chain: "5" } })).props.chain, activeOverride);
  });
}

test("single-chain API rejects deprecated numeric/short-name lookups and deprecated overrides", async () => {
  const source = readFileSync(path.join(__dirname, "../pages/api/chain/[chain].js"), "utf8")
    .replace(/^import .*;\n/gm, "")
    .replace("export default async function", "async function");
  let populationCalls = 0;
  const handler = vm.runInNewContext(`${source}\nhandler;`, {
    getActiveChains,
    overwrittenChains: [{ chainId: 2, name: "Retired Override", shortName: "retired-override", status: "deprecated" }],
    fetcher: async (url) => url === "https://chainid.network/chains.json" ? chains : [],
    populateChain: (chain) => { populationCalls++; return chain; },
  });
  for (const query of ["1", "retired", "2", "active", "retired-override", "missing"]) {
    const response = {
      setHeader() {},
      status(code) { this.code = code; return this; },
      json(body) { this.body = body; return this; },
    };
    await handler({ method: "GET", query: { chain: query } }, response);
    assert.equal(response.code, 404, query);
  }
  assert.equal(populationCalls, 0);
  for (const query of ["3", "incubating", "4", "default"]) {
    const response = {
      setHeader() {},
      status(code) { this.code = code; return this; },
      json(body) { this.body = body; return this; },
    };
    await handler({ method: "GET", query: { chain: query } }, response);
    assert.equal(response.code, 200, query);
  }
});

test("single-chain API retains override short-name precedence over a different base ID", async () => {
  const source = readFileSync(path.join(__dirname, "../pages/api/chain/[chain].js"), "utf8")
    .replace(/^import .*;\n/gm, "")
    .replace("export default async function", "async function");
  const override = { chainId: 5, name: "Override Network", shortName: "active", status: "active" };
  const handler = vm.runInNewContext(`${source}\nhandler;`, {
    getActiveChains,
    overwrittenChains: [override],
    fetcher: async (url) => url === "https://chainid.network/chains.json" ? chains : [],
    populateChain: (chain) => chain,
  });
  const response = {
    setHeader() {},
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
  await handler({ method: "GET", query: { chain: "active" } }, response);
  assert.equal(response.code, 200);
  assert.equal(response.body, override);
  override.status = "deprecated";
  await handler({ method: "GET", query: { chain: "active" } }, response);
  assert.equal(response.code, 404);
});

test("sitemap excludes deprecated IDs, names and every mapped alias", async () => {
  const sitemap = await generateSiteMap(chains, { ...chainIds, 99: "missing-slug" });
  assert.doesNotMatch(sitemap, /retired|missing-slug|\/chain\/1</);
  for (const chain of chains.slice(1)) {
    assert.ok(sitemap.includes(`/chain/${chain.chainId}</loc>`));
    assert.ok(sitemap.includes(`/chain/${chain.name.toLowerCase().replaceAll(" ", "%20")}</loc>`));
    for (const route of ["chain", "add-network", "best-rpcs", "top-rpcs"]) {
      assert.ok(sitemap.includes(`/${route}/${chainIds[chain.chainId]}</loc>`));
    }
  }
});
