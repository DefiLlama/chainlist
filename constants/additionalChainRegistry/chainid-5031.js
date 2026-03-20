export const data = {
  name: "Somnia Mainnet",
  chain: "SOMNIA",
  rpc: ["https://api.infra.mainnet.somnia.network", "https://somnia-rpc.publicnode.com", "https://rpc.ankr.com/somnia_mainnet"],
  faucets: [],
  nativeCurrency: {
    name: "SOMI",
    symbol: "SOMI",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://somnia.network",
  shortName: "Somnia",
  chainId: 5031,
  networkId: 5031,
  icon: "somnia",
  explorers: [
    {
      name: "Somnia Explorer",
      url: "https://explorer.somnia.network",
      icon: "somnia explorer",
      standard: "EIP3091",
    },
  ],
};
