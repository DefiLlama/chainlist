export const data = {
  "name": "HAQQ Testethiq (L2 Sepolia Testnet)",
  "chain": "ETH",
  "rpc": [
    "https://rpc.testnet.ethiq.network",
    "wss://rpc.testnet.ethiq.network"
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
  "infoURL": "https://ethiq.network",
  "shortName": "haqq-testethiq",
  "chainId": 853211,
  "networkId": 853211,
  "testnet": true,
  "icon": "haqq",
  "explorers": [
    {
      "name": "HAQQ Testethiq Blockscout",
      "url": "https://explorer.testnet.ethiq.network",
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
