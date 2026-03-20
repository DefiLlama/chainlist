export const data = {
  name: "Steem Virtual Machine Testnet",
  chain: "SVM",
  rpc: ["https://evmrpc.blazescanner.org"],
  faucets: [],
  nativeCurrency: {
    name: "STEEM",
    symbol: "STEEM",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://svmscan.blazeapps.org",
  shortName: "svm-testnet",
  chainId: 8163,
  networkId: 8163,
  icon: "steem",
  explorers: [
    {
      name: "SVM Scan",
      url: "https://svmscan.blazeapps.org",
      standard: "EIP3091",
    },
  ],
};
