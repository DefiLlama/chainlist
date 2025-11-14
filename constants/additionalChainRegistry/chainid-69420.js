// File: constants/additionalChainRegistry/chainid-69420.js
// This file should be added to the DefiLlama/chainlist repository

export default {
  "name": "ETO Network",
  "chain": "ETO",
  "rpc": [
    "https://eto.ash.center/rpc",
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "DRI",
    "symbol": "DRI",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://eto.ash.center",
  "shortName": "eto",
  "chainId": 69420,
  "networkId": 69420,
  "icon": "ethereum",
  "explorers": [
    {
      "name": "ETO Explorer",
      "url": "https://eto.ash.center",
      "icon": "ethereum",
      "standard": "EIP3091"
    }
  ]
};

