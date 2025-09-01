module.exports = {
  name: "WLD Chain Mainnet",
  chain: "WLD",
  rpc: [
    "https://rpc.wldchain.org"
  ],
  faucets: [],
  nativeCurrency: {
    name: "Worldcoin",
    symbol: "WLD",
    decimals: 18
  },
  infoURL: "https://wldchain.org",
  shortName: "wld",
  chainId: 1000001,         // เลข chainId (ตัวอย่างที่ยังไม่ถูกใช้)
  networkId: 100001,
  explorers: [
    {
      name: "WLD Explorer",
      url: "https://explorer.wldchain.org",
      standard: "EIP3091"
    }
  ],
  status: "active",
  slip44: 60,
  tags: ["wld", "mainnet"]
};
