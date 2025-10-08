export const data = {
  "name": "HAQQ Testethic (L2 Sepolia Testnet)",
  "chain": "ETH",
  "rpc": [
    "https://rpc.testethic.haqq.network",
    "wss://rpc.testethic.haqq.network"
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
    { "name": "EIP2930" },
    { "name": "EIP4844" }
  ],
  "infoURL": "https://www.haqq.network",
  "shortName": "haqq-testethic",
  "chainId": 853211,
  "networkId": 853211,
  "testnet": true,
  "icon": "haqq",
  "explorers": [
    {
      "name": "HAQQ Testethic Blockscout",
      "url": "https://explorer.testethic.haqq.network",
      "icon": "blockscout",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-11155111",
    "bridges": [
      {
        "url": "https://shell.haqq.network/bridge"
      }
    ]
  }
}
