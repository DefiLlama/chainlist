export const chain = {
  name: "TOOG Chain",
  chain: "TOOG",
  rpc: ["https://toog-proxy.toog-chain.workers.dev/rpc"],
  faucets: [],
  nativeCurrency: {
    name: "TEST",
    symbol: "TEST",
    decimals: 18,
  },
  infoURL: "https://toogchain.com",
  shortName: "toog",
  chainId: 777001,
  networkId: 777001,
  explorers: [
    {
      name: "TOOG Explorer",
      url: "https://toog-proxy.toog-chain.workers.dev/",
      standard: "EIP3091",
    },
  ],
};

export default chain;
