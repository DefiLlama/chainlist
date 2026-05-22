export const data = {
  name: "Seismic Testnet",
  chain: "Seismic",
  rpc: ["https://testnet-1.seismictest.net/rpc"],
  faucets: ["https://faucet.seismictest.net"],
  nativeCurrency: {
    name: "SIZE",
    symbol: "SIZE",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://seismic.systems",
  shortName: "seismic-testnet",
  chainId: 5124,
  networkId: 5124,
  icon: "seismic",
  explorers: [
    {
      name: "SocialScan",
      url: "https://seismic-testnet.socialscan.io",
      standard: "EIP3091",
    },
  ],
  testnet: true,
};
