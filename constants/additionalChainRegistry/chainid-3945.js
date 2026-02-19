export const data = {
  name: "Nexus Testnet",
  chain: "Nexus",
  rpc: ["https://testnet.rpc.nexus.xyz"],
  faucets: ["https://faucet.nexus.xyz"],
  nativeCurrency: {
    name: "Nexus",
    symbol: "NEX",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://nexus.xyz",
  shortName: "NEX",
  chainId: 3945,
  networkId: 3495,
  icon: "Nexus testnet",
  explorers: [
    {
      name: "Nexus Testnet Explorer",
      url: "https://nexus.testnet.blockscout.com",
      icon: "NEX",
      standard: "EIP3091",
    },
  ],
};
