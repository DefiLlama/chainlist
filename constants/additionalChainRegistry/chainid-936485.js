export const data = {
  name: "Zenith EVM Testnet",
  chain: "ZENITH",
  rpc: ["https://rpc.testnet.zenith.network/"],
  faucets: ["https://explorer.testnet.zenith.network/faucet"],
  nativeCurrency: {
    name: "Zenith token",
    symbol: "ZTH",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://docs.zenith.network/zenith-testnet",
  shortName: "zenith-evm-testnet",
  chainId: 936485,
  networkId: 936485,
  explorers: [
    {
      name: "Zenith EVM Explorer",
      url: "https://explorer.testnet.zenith.network",
      standard: "EIP3091",
    },
  ],
};
