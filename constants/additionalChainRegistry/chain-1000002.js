module.exports = {
  name: "WLD Chain Testnet",
  chain: "WLD",
  rpc: [
    "https://rpc-testnet.wldchain.org"
  ],
  faucets: [
    "https://faucet.wldchain.org"
  ],
  nativeCurrency: {
    name: "Test Worldcoin",
    symbol: "tWLD",
    decimals: 18
  },
  infoURL: "https://testnet.wldchain.org",
  shortName: "twld",
  chainId: 1000002,
  networkId: 1000002,
  explorers: [
    {
      name: "WLD Testnet Explorer",
      url: "https://explorer-testnet.wldchain.org",
      standard: "EIP3091"
    }
  ],
  status: "active",
  slip44: 1,
  tags: ["wld", "testnet"]
};
