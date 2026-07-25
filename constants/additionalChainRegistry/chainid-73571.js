/**
 * SELEMAN Chain — DefiLlama/chainlist additionalChainRegistry
 * Public RPC/explorer only. No secrets.
 */
export const data = {
  name: "SELEMAN Chain",
  chain: "SMN",
  rpc: ["https://seleman.monarcaproject.com/rpc"],
  faucets: [],
  nativeCurrency: {
    name: "SELEMAN",
    symbol: "SMN",
    decimals: 18,
  },
  features: [{ name: "EIP155" }],
  infoURL: "https://seleman.monarcaproject.com/seleman-chain",
  shortName: "seleman",
  chainId: 73571,
  networkId: 73571,
  icon: "seleman",
  explorers: [
    {
      name: "seleman",
      url: "https://seleman.monarcaproject.com",
      icon: "seleman",
      standard: "EIP3091",
    },
  ],
};
