export const data = {
  name: "Mitosis",
  chain: "MITO",
  rpc: ["https://rpc.mitosis.org", "https://edge.goldsky.com/standard/evm/124816?secret=public"],
  faucets: [],
  nativeCurrency: {
    name: "Mitosis",
    symbol: "MITO",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://mitosis.org",
  shortName: "mitosis",
  chainId: 124816,
  networkId: 124816,
  icon: "https://storage.googleapis.com/mitosis-statics/logos/mitosis_logo_symbol_basic.png",
  explorers: [
    {
      name: "Mitoscan",
      url: "https://mitoscan.io/",
      standard: "EIP3091",
    },
  ],
};
