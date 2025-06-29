export const data = {
  "name": "Injective Testnet",
  "chain": "Injective",
  "icon": "injective",
  "rpc": [
    "https://testnet.sentry.chain.json-rpc.injective.network",
    "wss://testnet.sentry.chain.json-rpc.injective.network",
    "https://injectiveevm-testnet-rpc.polkachu.com",
    "wss://injectiveevm-testnet-rpc.polkachu.com"
  ],
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
  "faucets": ["https://testnet.faucet.injective.network"],
  "nativeCurrency": {
    "name": "Injective",
    "symbol": "INJ",
    "decimals": 18
  },
  "infoURL": "https://injective.com",
  "shortName": "injective-testnet",
  "chainId": 1439,
  "networkId": 1439,
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://testnet.blockscout.injective.network",
      "icon": "blockscout",
      "standard": "EIP3091"
    }
  ]
}
