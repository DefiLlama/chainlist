export const data ={
  name: "Fluent Testnet",
  chain: "FLUENT",
  rpc: ["https://rpc.testnet.fluent.xyz"],
  faucets: ["https://testnet.fluent.xyz/dev-portal"],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }, { name: "EIP4844" }],
  infoURL: "https://www.fluent.xyz/",
  shortName: "fluent-testnet",
  chainId: 20994,
  networkId: 20994,
  explorers: [
    {
      name: "Fluent Testnet Explorer",
      url: "https://testnet.fluentscan.xyz/",
      standard: "EIP3091",
    },
  ],
};