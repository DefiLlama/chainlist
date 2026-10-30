export const chainIdToData = {
  9001: {
    name: "TOOG Chain",
    chain: "TOOG",
    icon: "https://toog-proxy.toog-chain.workers.dev/logo.jpg",
    rpc: ["https://toog-proxy.toog-chain.workers.dev/rpc"],
    faucets: [],
    nativeCurrency: {
      name: "TEST",
      symbol: "TEST",
      decimals: 18,
    },
    features: [{ name: "EIP155" }, { name: "EIP1559" }],
    infoURL: "https://toog-proxy.toog-chain.workers.dev/",
    shortName: "toog",
    chainId: 9001,
    networkId: 9001,
    explorers: [
      {
        name: "TOOG Explorer",
        url: "https://toog-proxy.toog-chain.workers.dev/",
        icon: "https://toog-proxy.toog-chain.workers.dev/logo.jpg",
        standard: "EIP3091",
      },
    ],
  },
};
