export const data = {
  name: "Creditcoin Devnet",
  chain: "CTC",
  rpc: ["https://rpc.cc3-devnet.creditcoin.network"],
  faucets: [],
  nativeCurrency: {
    name: "Devnet CTC",
    symbol: "devCTC",
    decimals: 18
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://creditcoin.org",
  shortName: "ctcdev",
  chainId: 102032,
  networkId: 102032,
  icon: "creditcoin",
  explorers: [
    {
      name: "blockscout",
      url: "https://creditcoin-devnet.blockscout.com",
      icon: "blockscout",
      standard: "EIP3091"
    }
  ]
}