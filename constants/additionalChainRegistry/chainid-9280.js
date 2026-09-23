export const data = {
  name: "Rabbit Chain Testnet",
  chain: "RAB",
  rpc: [
    "https://rpc-testnet.rabbitchain.org"
  ],
  faucets: [
    "https://rabbitchain.org/platform/faucet"
  ],
  nativeCurrency: {
    name: "Test Rabbit",
    symbol: "tRAB",
    decimals: 18
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://rabbitchain.org",
  shortName: "rabbit-testnet",
  chainId: 9280,
  networkId: 9280,
  explorers: [
    {
      name: "Rabbit Chain Testnet Explorer",
      url: "https://explorer-testnet.rabbitchain.org",
      icon: "blockscout",
      standard: "EIP3091"
    }
  ]
};

export default data;
