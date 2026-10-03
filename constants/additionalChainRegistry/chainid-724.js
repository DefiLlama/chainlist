module.exports = {
  name: "LXON Mainnet",
  chain: "LXON",
  rpc: [
    "https://rpc.lxon.in",
    "http://13.61.177.64:8546"
  ],
  nativeCurrency: {
    name: "LXON",
    symbol: "XON",
    decimals: 18
  },
  features: [{ "name": "EIP155" }, { "name": "EIP1559" }],
  infoURL: "https://www.lxon.in",
  shortName: "lxon",
  chainId: 724,
  networkId: 724,
  icon: "lxon",
  explorers: [{
    name: "LXON Explorer",
    url: "https://explorer.lxon.in",
    icon: "lxon",
    standard: "EIP3091"
  }]
}
