export const data = {
  name: "RISE",
  chain: "ETH",
  rpc: ["https://rpc.risechain.com/", "wss://rpc.risechain.com/ws"],
  features: [{ name: "EIP155" }, { name: "EIP1559" }, { name: "EIP7702" }],
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  infoURL: "https://risechain.com",
  shortName: "rise",
  chainId: 4153,
  networkId: 4153,
  explorers: [
    {
      name: "Blockscout",
      url: "https://explorer.risechain.com/",
      standard: "EIP3091",
    },
  ],
  parent: {
    type: "L2",
    chain: "eip155-1",
    bridges: [
      {
        url: "https://bridge.risechain.com",
      },
    ],
  },
};
