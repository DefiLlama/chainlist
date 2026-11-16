export const data = {
  name: "LitVM Liteforge Testnet",
  chain: "Liteforge",
  rpc: ["https://rpc.testnet.liteforge.zeeve.net/"],
  features: [{ name: "EIP155" }],
  faucets: ["https://faucet.testnet.liteforge.zeeve.net/"],
  nativeCurrency: {
    name: "zkLTC",
    symbol: "zkLTC",
    decimals: 18,
  },
  shortName: "liteforge",
  chainId: 4441,
  networkId: 4441,
  explorers: [
    {
      name: "Liteforge Explorer",
      url: "https://explorer.testnet.liteforge.zeeve.net",
      standard: "EIP3091",
    },
  ],
};
