export const data = {
  "name": "Jovay Mainnet",
  "chain": "ETH",
  "rpc": [
    "https://rpc.jovay.io",
    "https://api.zan.top/node/v1/jovay/mainnet/${ZAN_API_KEY}",
    "wss://api.zan.top/node/ws/v1/jovay/mainnet/${ZAN_API_KEY}"
  ],
  "faucets": [
  ],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }, { "name": "EIP2930" }],
  "infoURL": "https://jovay.io",
  "shortName": "jovay",
  "chainId": 5734951,
  "networkId": 5734951,
  "explorers": [{
    "name": "Jovay Explorer",
    "url": "https://explorer.jovay.io",
    "standard": "EIP3091"
  }]
}
