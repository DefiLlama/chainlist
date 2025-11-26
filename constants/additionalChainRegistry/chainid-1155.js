export const data = {
  name: "Intuition Mainnet",
  chain: "INTUITION",
  rpc: ["https://intuition.calderachain.xyz/http", "https://rpc.intuition.systems"],
  faucets: [],
  nativeCurrency: {
    name: "Intuition",
    symbol: "TRUST",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://intuition.systems",
  shortName: "intuition-mainnet",
  chainId: 1155,
  networkId: 1155,
  icon: "intuition",
  explorers: [
    {
      name: "Intuition Explorer (Mainnet)",
      url: "https://intuition.calderaexplorer.xyz",
      standard: "EIP3091",
    },
    {
      name: "Intuition Explorer (Mainnet)",
      url: "https://explorer.intuition.systems",
      standard: "EIP3091",
    },
  ],
  testnet: false,
};
