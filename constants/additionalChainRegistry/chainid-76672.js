export const data = {
  name: "CarrChain Testnet",
  chain: "CARR",
  rpc: ["https://rpc-testnet.carrchain.io"],
  faucets: ["http://faucet.carrchain.io"],
  nativeCurrency: {
    name: "CARR",
    symbol: "CARR",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://carrchain.io",
  shortName: "carrchain",
  chainId: 76672,
  networkId: 76672,
  icon: "carrchain",
  explorers: [
    {
      name: "CarrScan",
      url: "https://testnet.carrscan.io",
      standard: "EIP3091",
      icon: "carrchain",
    },
  ],
};
