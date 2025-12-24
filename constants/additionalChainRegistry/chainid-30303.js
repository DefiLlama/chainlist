export const data = {
  "name": "Ethiq",
  "chain": "ETH",
  "rpc": [
    "https://rpc.ethiq.network",
    "wss://rpc.ethiq.network"
  ],
  "faucets": [
  ],
  "nativeCurrency": {
    "name": "ETH",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" },
    { "name": "EIP2718" },
    { "name": "EIP2930" }
  ],
  "infoURL": "https://www.ethiq.network",
  "shortName": "Ethiq",
  "chainId": 30303,
  "networkId": 30303,
  "testnet": false,
  "icon": "ethiq",
  "explorers": [
    {
      "name": "Ethiq Blockscout",
      "url": "https://explorer.ethiq.haqq.network",
      "icon": "blockscout",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://shell.haqq.network/bridge"
      }
    ]
  }
}
