module.exports = {
  name: "Fraxtal",
  chain: "ETH",
  rpc: [
    "https://rpc.frax.com",
    "https://fraxtal.drpc.org"
  ],
  faucets: [],
  nativeCurrency: {
    name: "Frax Ether",
    symbol: "frxETH",
    decimals: 18,
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://frax.com/fraxtal",
  shortName: "fraxtal",
  chainId: 252,
  networkId: 252,
  icon: "fraxtal",
  explorers: [
    {
      name: "Fraxscan",
      url: "https://fraxscan.com",
      icon: "fraxscan",
      standard: "EIP3091"
    }
  ],
};
