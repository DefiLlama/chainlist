export const data = {
  name: "Mawari Mainnet",
  chain: "MAWARI",
  rpc: [
    "https://rpc.mawari.net/http",
    "wss://rpc.mawari.net/ws"
  ],
  faucets: [],
  nativeCurrency: {
    name: "MAWARI",
    symbol: "MAWARI",
    decimals: 18
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://mawari.net",
  shortName: "mawari",
  chainId: 1576,
  networkId: 1576,
  icon: "mawari",
  explorers: [
    {
      name: "blockscout",
      url: "https://explorer.mainnet.mawari.net",
      standard: "EIP3091"
    }
  ]
};
