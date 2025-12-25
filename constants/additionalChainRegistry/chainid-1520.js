module.exports = {
  name: "Dolphinet Mainnet",
  chain: "DOL",
  rpc: [
    "https://rpc.dolphinode.world",
    "wss://wss.dolphinode.world",
    "https://rpc-dev01.dolphinode.world",
    "wss://wss-dev01.dolphinode.world"
  ],
  faucets: [],
  nativeCurrency: {
    name: "DOL",
    symbol: "DOL",
    decimals: 18
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://chain.dolphinode.world/",
  shortName: "dolphinet",
  chainId: 1520,
  networkId: 1520,
  explorers: [
    {
      name: "blockscout",
      url: "https://explorer.dolphinode.world/",
      icon: "blockscout",
      standard: "EIP3091"
    }
  ]
};
