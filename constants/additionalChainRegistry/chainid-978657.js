export const data = {
  "name": "Treasure Ruby",
  "chain": "TRS",
  "rpc": [
    "https://rpc-testnet.treasure.lol/http",
    "wss://rpc-testnet.treasure.lol/ws"
  ],
  "faucets": [
    "https://portal.treasure.lol/faucet"
  ],
  "nativeCurrency": {
    "name": "Testnet MAGIC",
    "symbol": "MAGIC",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
  "infoURL": "https://portal.treasure.lol",
  "shortName": "treasure-ruby",
  "chainId": 978657,
  "networkId": 978657,
  "icon": "treasureruby",
  "explorers": [
    {
      "name": "treasurescan",
      "url": "https://testnet.treasurescan.io",
      "icon": "treasure",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://portal.treasure.lol/bridge"
      }
    ]
  }
}
