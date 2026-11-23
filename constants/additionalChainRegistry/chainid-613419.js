export const data = {
  name: "Galactica Mainnet",
  chain: "GNET",
  rpc: ["https://galactica-mainnet.g.alchemy.com/public"],
  nativeCurrency: {
    name: "GNET",
    symbol: "GNET",
    decimals: 18,
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://galactica.com",
  shortName: "galactica",
  chainId: 613419,
  networkId: 613419,
  icon: "https://galactica-com.s3.eu-central-1.amazonaws.com/icon_galactica.png",
  explorers: [
    {
      name: "Blockscout",
      url: "https://explorer.galactica.com",
      icon: "blockscout",
      standard: "EIP3091",
    },
  ],
  "parent": {
      "type": "L2",
      "chain": "ethereum",
      "bridges": [
        {
          "url": "https://portal.arbitrum.io/bridge?destinationChain=galactica-mainnet&sanitized=true&sourceChain=ethereum"
        }
      ]
    }
};
