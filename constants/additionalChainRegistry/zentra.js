export const data = {
  name: "Zentra Privacy",
  chain: "Zentra",
  rpc: [
    "http://rpc.zentraprivacy.org:29081/json_rpc"
  ],
  faucets: [],
  nativeCurrency: {
    name: "Zentra",
    symbol: "ZTRA",
    decimals: 12
  },
  infoURL: "https://github.com/Zentra-Privacy/zentra",
  shortName: "zentra",
  chainId: "5d9f4218634cf27b701647ebff5f2a38010739bb1ca45c6f9debbeef55c71308",
  networkId: "5d9f4218634cf27b701647ebff5f2a38010739bb1ca45c6f9debbeef55c71308",
  explorers: [
    {
      name: "Zentra Explorer",
      url: "http://explorer.zentraprivacy.org", // Update with actual explorer URL if available
      standard: "none" // Monero-based chains don't follow EIP3091
    }
  ],
  icon: null, // Add icon URL if available
  features: [
    {
      name: "Privacy"
    }
  ],
  slip44: 1, // Testnet SLIP44, update if mainnet has registered number
  ens: {
    registry: null
  },
  network: "mainnet",
  consensus: "Hybrid PoP + PoW"
};
