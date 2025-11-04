module.exports = {
  name: "Linea",
  chain: "ETH",
  rpc: [
    "https://rpc.linea.build",
    "https://mainnet-rpc.linea.build"
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
  infoURL: "https://linea.build",
  shortName: "linea",
  chainId: 59144,
  networkId: 59144,
  icon: "linea",
  explorers: [
    {
      name: "LineaScan",
      url: "https://lineascan.build",
      icon: "lineascan",
      standard: "EIP3091"
    }
  ],
};
