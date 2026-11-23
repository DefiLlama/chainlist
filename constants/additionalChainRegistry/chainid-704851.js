export const data = {
  name: "Mars Chain",
  title: "Mars Chain",
  shortName: "marschain",
  chain: "MARS",
  rpc: ["https://rpc.mars-scan.io", "wss://rpc.mars-scan.io/ws"],
  faucets: [],
  nativeCurrency: {
    name: "Mars Coin",
    symbol: "MarsC",
    decimals: 18,
  },
  infoURL: "https://explorer.mars-chain.io/",
  chainId: 704851,
  networkId: 704851,
  explorers: [
    {
      name: "Mars Chain Explorer",
      url: "https://explorer.mars-chain.io/",
      standard: "EIP3091",
    },
  ],
  parent: {
    type: "L2",
    chain: "eip155-11155111",
    bridges: [
      {
        url: "https://portal.arbitrum.io/bridge",
      },
    ],
  },
  icon: "https://ipfs.io/ipfs/bafkreiahnorlibpuklbzedc3x3lw6mqry2kjmaqh3rtkdlw2ydpom2gs7y",
  status: "active",
};
