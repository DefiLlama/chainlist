module.exports = {
  name: "Fluent Devnet",
  chain: "FLUENT",
  rpc: ["https://rpc.devnet.fluent.xyz"],
  faucets: ["https://testnet.fluent.xyz/dev-portal"],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }, { name: "EIP4844" }],
  infoURL: "https://www.fluent.xyz/",
  shortName: "fluent",
  chainId: 20993,
  networkId: 20993,
  explorers: [
    {
      name: "Fluent Devnet Explorer",
      url: "https://devnet.fluentscan.xyz/",
      standard: "EIP3091",
    },
  ],
};
