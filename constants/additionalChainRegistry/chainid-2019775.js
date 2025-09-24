export const data = {
  "name": "Jovay Sepolia Testnet",
  "chain": "ETH",
  "rpc": [
    "https://api.zan.top/public/jovay-testnet",
    "https://api.zan.top/node/v1/jovay/testnet/${ZAN_API_KEY}",
    "wss://api.zan.top/node/ws/v1/jovay/testnet/${ZAN_API_KEY}"
  ],
  "faucets": [
    "https://zan.top/faucet/jovay"
  ],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }, { "name": "EIP2930" }],
  "infoURL": "https://jovay.io",
  "shortName": "jovay",
  "chainId": 2019775,
  "networkId": 2019775,
  "explorers": [{
    "name": "Jovay Testnet Explorer",
    "url": "https://sepolia-explorer.jovay.io/l2",
    "standard": "EIP3091"
  }]
}
