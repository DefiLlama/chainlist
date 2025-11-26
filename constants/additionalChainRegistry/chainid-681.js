export const data = {
  name: "JASMY Chain Testnet",
  chain: "JASMY",
  rpc: ["wss://jasmy-chain-testnet.alt.technology/ws", "https://jasmy-chain-testnet.alt.technology"],
  faucets: ["https://faucet.janction.ai"],
  nativeCurrency: {
    name: "JasmyCoin",
    symbol: "JASMY",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://www.jasmy.co.jp/en.html",
  shortName: "jasmy",
  chainId: 681,
  networkId: 681,
  icon: "jasmy",
  explorers: [
    {
      name: "JASMY Chain Testnet Explorer",
      url: "https://jasmy-chain-testnet-explorer.alt.technology",
      icon: "jasmy",
      standard: "EIP3091",
    },
  ],
};
