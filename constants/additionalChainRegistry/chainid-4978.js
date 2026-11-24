// Ready-to-submit chainlist entry for the hypr public testnet.
//
// Copy this file to `constants/additionalChainRegistry/chainid-4978.js` in a
// fork of https://github.com/DefiLlama/chainlist and open one PR.
// Regenerate it from `GET /chainlist.json` if the host ever changes.
export const data = {
  name: "hypr testnet",
  chain: "HYPR",
  rpc: ["https://hypr-testnet.tail9d9f7e.ts.net"],
  faucets: ["https://hypr-testnet.tail9d9f7e.ts.net/faucet"],
  nativeCurrency: {
    name: "hypr testnet",
    symbol: "HYPR",
    decimals: 18,
  },
  features: [{ name: "EIP155" }],
  infoURL: "https://hypr-testnet.tail9d9f7e.ts.net",
  shortName: "hypr-testnet",
  chainId: 4978,
  networkId: 4978,
  icon: "hypr-network",
  explorers: [
    {
      name: "hypr testnet explorer",
      url: "https://hypr-testnet.tail9d9f7e.ts.net",
      standard: "none",
    },
  ],
};
