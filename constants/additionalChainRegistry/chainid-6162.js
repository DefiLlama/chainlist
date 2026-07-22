export const data = {
  name: "Blockmaze Testnet V2",
  chain: "BLOCKMAZE",
  rpc: [
    "https://v2-evm-rpc.testnet.stackflow.site",
    "https://v2-evm-rpc-arc.testnet.stackflow.site",
    "wss://v2-evm-ws-arc.testnet.stackflow.site",
    "wss://v2-evm-ws.testnet.stackflow.site",
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
      url: "https://explorer.testnet.stackflow.site",
    },
  ],
};
