module.exports = {
  name: "Blast",
  chain: "ETH",
  rpc: [
    "https://rpc.blast.io"
  ],
  faucets: [],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://blast.io",
  shortName: "blast",
  chainId: 81457,
  networkId: 81457,
  icon: "blast",
  explorers: [
    {
      name: "Blastscan",
      url: "https://blastscan.io",
      icon: "blastscan",
      standard: "EIP3091"
    }
  ],
};
