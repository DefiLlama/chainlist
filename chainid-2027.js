module.exports = {
  name: "AXION Mainnet",
  chain: "AXION",
  rpc: [
    "https://rpc.axiondefi.com"
  ],
  faucets: [],
  nativeCurrency: {
    name: "AXION",
    symbol: "AX",
    decimals: 18
  },
  features: [
    { name: "EIP155" }
  ],
  infoURL: "https://www.axiondefi.com",
  shortName: "axion",
  chainId: 2027,
  networkId: 2027,
  icon: "axion",
  explorers: [
    {
      name: "axscan",
      url: "https://axscan.axiondefi.com",
      standard: "EIP3091"
    }
  ]
}
