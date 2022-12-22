const chainIds = require("./constants/chainIds.json");
const fetch = require("node-fetch");
const fs = require("fs");

const CF_PURGE_CACHE_AUTH = process.env.CF_PURGE_CACHE_AUTH;
const CF_ZONE = process.env.CF_ZONE;

async function purgeCacheByUrls(urls) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/purge_cache`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CF_PURGE_CACHE_AUTH}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files: urls }),
  }).then((res) => res.json());

  console.log({ res });
}

async function getAllUrls() {
  const res = await fetch("https://chainid.network/chains.json");
  const chains = await res.json();

  // list of files in public folder, recursively
  const publicFiles = fs.readdirSync("public", { withFileTypes: true }).reduce((files, file) => {
    if (file.isDirectory()) {
      return files.concat(
        fs
          .readdirSync(`public/${file.name}`, {
            withFileTypes: true,
          })
          .map((f) => `${file.name}/${f.name}`),
      );
    }

    return files.concat(file.name);
  }, []);

  const urls = [
    "https://chainlist.org/",
    ...chains.map(({ chainId }) => `https://chainlist.org/chain/${chainId}`),
    ...chains.map(({ name }) => `https://chainlist.org/chain/${name.toLowerCase().split(" ").join("%20")}`),

    "https://chainlist.org/zh",
    ...chains.map(({ chainId }) => `https://chainlist.org/zh/chain/${chainId}`),
    ...chains.map(({ name }) => `https://chainlist.org/zh/chain/${name.toLowerCase().split(" ").join("%20")}`),

    ...publicFiles.map((file) => `https://chainlist.org/${file}`),
    "https://chainlist.org/sitemap.xml",
  ];

  return urls;
}

async function main() {
  const urls = await getAllUrls();
  await purgeCacheByUrls(urls);
}

main();
