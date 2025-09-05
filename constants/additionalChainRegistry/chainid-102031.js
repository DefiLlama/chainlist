export const data = {
  name: "Creditcoin Testnet",
  chain: "CTC",
  rpc: ["https://rpc.cc3-testnet.creditcoin.network"],
  faucets: [],
  nativeCurrency: {
    name: "Testnet CTC",
    symbol: "tCTC",
    decimals: 18
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://creditcoin.org",
  shortName: "ctctest",
  chainId: 102031,
  networkId: 102031,
  icon: "creditcoin",
  explorers: [
    {
      name: "blockscout",
      url: "https://creditcoin-testnet.blockscout.com",
      icon: "blockscout",
      standard: "EIP3091"
    }
  ]
}