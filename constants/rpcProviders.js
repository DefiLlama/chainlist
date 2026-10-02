/**
 * RPC providers that expose a predictable public endpoint per chain id.
 *
 * Chain coverage is not taken on trust: `scripts/generate-provider-rpcs.mjs`
 * probes every candidate endpoint and records only the ones that answer
 * eth_chainId with the matching id, into constants/providerRpcs.js.
 *
 * To add a provider, append an entry here and run the generator. Fields:
 *   key       matches the privacyStatement key in extraRpcs.js
 *   host      substring identifying this provider's urls, used for de-duping
 *   tracking  "none" | "limited" | "yes" -- drives the privacy icon
 *   rpcUrl    builds the public endpoint for a chain id
 *   discover  optional; returns candidate chain ids. Omit to probe every chain
 *             chainlist already knows about.
 */
export const rpcProviders = [
  {
    key: "thirdweb",
    host: "rpc.thirdweb.com",
    tracking: "yes",
    rpcUrl: (chainId) => `https://${chainId}.rpc.thirdweb.com`,
    async discover() {
      const res = await fetch("https://api.thirdweb.com/v1/chains", { headers: { accept: "application/json" } });
      if (!res.ok) throw new Error(`thirdweb registry -> HTTP ${res.status}`);
      const body = await res.json();
      const rows = Array.isArray(body) ? body : body.data;
      return rows
        .filter((c) => !c.testnet)
        .filter((c) => (c.rpc ?? []).some((u) => typeof u === "string" && u.includes("rpc.thirdweb.com")))
        .map((c) => c.chainId);
    },
  },
];

export const providerByKey = Object.fromEntries(rpcProviders.map((p) => [p.key, p]));

export default rpcProviders;
