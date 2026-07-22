export const data = {
  name: "Gleec Mainnet",
  chain: "GLEEC",
  rpc: ["https://evm-rpc.gleec.com", "wss://evm-ws.gleec.com"],
  faucets: [],
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  nativeCurrency: {
    name: "GLEEC",
    symbol: "GLEEC",
    decimals: 18,
  },
  infoURL: "https://evm-info.gleec.com/",
  shortName: "gleec",
  chainId: 11169,
  networkId: 11169,
  explorers: [
    {
      name: "Gleec EVM Explorer",
      url: "https://evm-explorer.gleec.com",
      standard: "EIP3091",
    },
  ],
};
