export const data = {
  name: "Autheo Mainnet",
  chain: "Autheo",
  rpc: ["https://rpc1.autheo.com", "https://rpc2.autheo.com", "https://rpc3.autheo.com"],
  faucets: [],
  nativeCurrency: {
    name: "THEO",
    symbol: "THEO",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://autheo.com",
  shortName: "autheo",
  chainId: 2127,
  networkId: 2127,
  icon: "autheo",
  explorers: [
    {
      name: "Autheo Cosmos Explorer",
      url: "https://cosmos.autheo.com",
      icon: "autheo",
      standard: "none",
    },
    {
      name: "Autheo Mainnet EVM Explorer",
      url: "https://evm-explorer.autheo.com",
      icon: "autheo",
      standard: "none",
    },
  ],
};
