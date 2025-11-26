export const data = {
  name: "Stable Mainnet",
  chain: "stable",
  rpc: ["https://rpc.stable.xyz", "https://edge.goldsky.com/standard/evm/988?secret=public"],
  faucets: [],
  nativeCurrency: {
    name: "gUSDT",
    symbol: "gUSDT",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://stable.xyz",
  shortName: "stable",
  chainId: 988,
  networkId: 988,
  icon: "stable",
  explorers: [
    {
      name: "stablescan",
      url: "https://stablescan.xyz",
      standard: "EIP3091",
    },
  ],
};
