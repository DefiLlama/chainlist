export const data = {
  name: "Galactica Testnet",
  chain: "GNET",
  rpc: ["https://galactica-cassiopeia.g.alchemy.com/public"],
  faucets: ["https://faucet-cassiopeia.galactica.com"],
  nativeCurrency: {
    name: "Gnet",
    symbol: "GNET",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://galactica.com",
  shortName: "galactica-testnet",
  chainId: 843843,
  networkId: 843843,
  icon: "https://galactica-com.s3.eu-central-1.amazonaws.com/icon_galactica.png",
  explorers: [
    {
      name: "Blockscout",
      url: "https://galactica-cassiopeia.explorer.alchemy.com",
      icon: "blockscout",
      standard: "EIP3091",
    },
  ],
};
