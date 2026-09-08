export const data = {
  name: "zkTanenbaum Testnet",
  chain: "ZKSYS",
  rpc: ["https://rpc-zk.tanenbaum.io"],
  faucets: ["https://faucet-zk.tanenbaum.io"],
  nativeCurrency: {
    name: "Testnet Syscoin",
    symbol: "TSYS",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://syscoin.org",
  shortName: "zktanenbaum",
  chainId: 57057,
  networkId: 57057,
  explorers: [
    {
      name: "zkTanenbaum Block Explorer",
      url: "https://explorer-zk.tanenbaum.io",
      standard: "EIP3091",
    },
  ],
};
