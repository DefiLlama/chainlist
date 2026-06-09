export const data = {
  name: "GTBS Chain",
  chain: "GTBS",
  rpc: ["https://rpc.gtbsblockchain.com/evmrpc"],
  faucets: [],
  nativeCurrency: {
    name: "GTBS",
    symbol: "GTBS",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://gtbs.live",
  shortName: "GTBS",
  chainId: 9001,
  networkId: 9001,
  icon: "https://gtbs.live/favicon.png",
  explorers: [
    {
      name: "GTBSscan",
      url: "https://gtbsblockchain.com",
      icon: "gtbsscan",
      standard: "EIP3091",
    },
  ],
};
