export const data = {
  name: "Pexli Testnet",
  chain: "PEX",
  rpc: ["https://testrpc.pex.li"],
  faucets: ["https://faucet.pex.li"],
  features: [{ name: "EIP155" }],
  nativeCurrency: {
    name: "Pexli",
    symbol: "PEX",
    decimals: 18,
  },
  infoURL: "https://pex.li",
  shortName: "pexli-testnet",
  chainId: 78901,
  networkId: 78901,
  explorers: [
    {
      name: "Pexli Explorer",
      url: "https://explorer.pex.li",
      standard: "EIP3091",
    },
    {
      name: "Pexli Testscan",
      url: "https://testscan.pex.li",
      standard: "EIP3091",
    },
  ],
};
