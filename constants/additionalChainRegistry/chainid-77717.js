export default {
  "name": "Ventures Blockchain",
  "chain": "Ventures",
  "rpc": [
    "https://rpc.venturesblockchain.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ventures Coin",
    "symbol": "VC",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://www.venturesblockchain.io",
  "shortName": "vb",
  "chainId": 77717,   // ← replace with number only, no quotes
  "networkId": 77717,  // ← usually same as chainId
  "icon": "ventures",               // optional — you can remove this line if you want
  "explorers": [{
    "name": "Ventures Explorer",
    "url": "https://explorer.venturesblockchain.io",
    "standard": "EIP3091"
  }]
};
