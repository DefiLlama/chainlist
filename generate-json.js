const { writeFileSync } = require("fs");

async function writeRpcsJson() {
  // Use dynamic import to load ES6 module
  const fetchModule = await import("./utils/fetch.js");
  const { generateChainData } = fetchModule;

  const rpcs = await generateChainData();

  const cleanedRpcs = rpcs.map((chain) => {
    if (chain.rpc) {
      chain.rpc = chain.rpc.map((rpcEntry) => {
        const { trackingDetails, ...rest } = rpcEntry;
        return rest;
      });
    }
    return chain;
  });

  writeFileSync("out/rpcs.json", JSON.stringify(cleanedRpcs, null, 2));
}
writeRpcsJson();