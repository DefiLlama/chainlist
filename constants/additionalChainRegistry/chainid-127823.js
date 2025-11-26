export const data = {
  name: "Etherlink Shadownet Testnet",
  chain: "Etherlink",
  rpc: ["https://node.shadownet.etherlink.com", "https://edge.goldsky.com/standard/evm/127823?secret=public"],
  faucets: [],
  nativeCurrency: {
    name: "tez",
    symbol: "XTZ",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://etherlink.com",
  shortName: "etls",
  chainId: 127823,
  networkId: 127823,
  icon: "etherlink",
  explorers: [
    {
      name: "Etherlink Shadownet Explorer",
      url: "https://shadownet.explorer.etherlink.com",
      icon: "blockscout",
      standard: "EIP3091",
    },
  ],
};
