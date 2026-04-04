module.exports = {
  name: "TrustBitcoin Mainnet",
  chain: "TBC",
  rpc: ["https://rpc.trustbitcoin.io"],
  faucets: [],
  nativeCurrency: {
    name: "TrustBitcoin",
    symbol: "TBC",
    decimals: 18,
  },
  features: [{ name: "EIP155" }],
  infoURL: "https://trustbitcoin.io",
  shortName: "trustbtc",
  chainId: 10791,
  networkId: 10791,
  icon: "trustbitcoin",
  explorers: [
    {
      name: "TrustBitcoin Scan",
      url: "https://scan.trustbitcoin.io",
      standard: "EIP3091",
    },
  ],
};
