export const data = {
  name: "Autheo Testnet",
  chain: "Autheo",
  rpc: ["https://rpc.testnet.autheo.com"],
  faucets: ["https://faucet.testnet.autheo.com"],
  nativeCurrency: {
    name: "THEO",
    symbol: "THEO",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://autheo.com",
  shortName: "autheo-testnet",
  chainId: 21270,
  networkId: 21270,
  icon: "autheo",
  explorers: [
    {
      name: "Autheo Testnet Cosmos Explorer",
      url: "https://cosmos.testnet.autheo.com",
      icon: "autheo",
      standard: "none",
    },
    {
      name: "Autheo Testnet EVM Explorer",
      url: "https://evm-explorer.testnet.autheo.com",
      icon: "autheo",
      standard: "none",
    },
  ],
};
