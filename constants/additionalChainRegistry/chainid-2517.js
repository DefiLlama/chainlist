export const data ={
  "name": "SVP Chain Testnet",
  "title": "SVP Testnet",
  "chain": "SVPTEST",
  "status": "active",
  "rpc": ["https://svp-dataseeds-testnet.svpchain.org"],
  "nativeCurrency": {
    "name": "SVP Coin",
    "symbol": "SVP",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://svpchain.org",
  "shortName": "svp-testnet",
  "chainId": 2517,
  "networkId": 2517,
  "icon": "svp",
  "explorers": [
    {
      "name": "SVP Testnet Explorer",
      "url": "https://testnet.svpchain.com",
      "standard": "EIP3091",
      "icon": "svp"
    }
  ],
  faucets: [
    "https://faucet.svpchain.org"
  ]
};
