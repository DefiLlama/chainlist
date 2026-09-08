export const data = {
  name: "Blockmaze Testnet V2",
  chain: "BLOCKMAZE",
  rpc: [
    "https://testnet-evm-rpc.blockmaze.com",
    "https://testnet-evm-rpc-arc.blockmaze.com",
    "wss://testnet-evm-ws-arc.blockmaze.com",
    "wss://testnet-evm-ws.blockmaze.com",
  ],
  faucets: [],
  nativeCurrency: {
    name: "BMZ",
    symbol: "BMZ",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://blockmaze.com",
  shortName: "bmz",
  chainId: 6162,
  networkId: 6162,
  icon: "BMZ",
  explorers: [
    {
      name: "Blockmaze testnet explorer",
      url: "https://testnet-explorer.bmzscan.com/",
    },
  ],
};
