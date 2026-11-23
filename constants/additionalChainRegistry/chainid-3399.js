export const data = {
  name: "ByteChain Testnet",
  chain: "tBEXC",
  rpc: [
    "https://test-rpc.bexc.io"
  ],
  faucets: [],
  nativeCurrency: {
    name: "BEXC",
    symbol: "BEXC",
    decimals: 18
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://bexc.io",
  shortName: "bytechaintest",
  chainId: 3399,
  networkId: 3399,
  icon: "bytechain",
  explorers: [
    {
      name: "ByteChain Testnet Explorer",
      url: "https://testnet.bexc.io",
      icon: "bytechain",
      standard: "EIP3091"
    }
  ]
};

export default data;
