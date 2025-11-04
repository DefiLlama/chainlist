module.exports = {
  name: "Base",
  chain: "ETH",
  rpc: [
    "https://mainnet.base.org",
    "https://developer-access-mainnet.base.org"
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
  infoURL: "https://base.org",
  shortName: "base",
  chainId: 8453,
  networkId: 8453,
  icon: "base",
  explorers: [
    {
      name: "Basescan",
      url: "https://basescan.org",
      icon: "basescan",
      standard: "EIP3091"
    }
  ],
};
