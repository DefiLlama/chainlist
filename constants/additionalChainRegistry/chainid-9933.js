export const data = {
  name: "ByteChain Mainnet",
  chain: "BEXC",
  rpc: [
    "https://rpc.bexc.io",
    "https://rpc2.bexc.io"
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
  shortName: "bytechain",
  chainId: 9933,
  networkId: 9933,
  icon: "bytechain",
  explorers: [
    {
      name: "ByteChain Explorer",
      url: "https://mainnet.bexc.io",
      icon: "bytechain",
      standard: "EIP3091"
    }
  ]
};

export default data;
