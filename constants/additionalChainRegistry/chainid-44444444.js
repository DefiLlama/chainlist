export const data ={
  "name": "Tensora",
  "chain": "Tensora",
  "rpc": [
    "https://rpc.tensora.sh",
    "http://63.250.32.66:8545"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "BNB",
    "symbol": "BNB",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://tensora.ai",
  "shortName": "tensora",
  "chainId": 44444444,
  "networkId": 44444444,
  "icon": "tensora",
  "explorers": [{
    "name": "Tensora Explorer",
    "url": "https://explorer.tensora.sh",
    "icon": "blockscout",
    "standard": "EIP3091"
  }],
  "parent": {
    "type": "L2",
    "chain": "eip155-56",
    "bridges": [{
      "url": "https://bridge.tensora.sh"
    }]
  }
}
