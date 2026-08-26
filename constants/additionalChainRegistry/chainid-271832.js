export const data = {
  "name": "MBTX Nexus",
  "chain": "MBTX",
  "icon": "https://mbtux.uxi.rocks/static/photo_mbtxnexus.png",
  "rpc": [
    "https://p7project.mbtx.workers.dev"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ping Token",
    "symbol": "PING",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://mbtux.uxi.rocks/mbtx/",
  "shortName": "mbtxl2",
  "chainId": 271832,
  "networkId": 271832,
  "parent": {
    "type": "L2",
    "chain": "eip155-271831",
    "bridges": [
      {
        "url": "https://mbtux.uxi.rocks/mbtx/"
      }
    ]
  },
  "explorers": [
    {
      "name": "MBTX Nexus Explorer",
      "url": "https://mbtux.uxi.rocks/mbtx/",
      "icon": "https://mbtux.uxi.rocks/static/photo_mbtxnexus.png",
      "standard": "EIP3091"
    }
  ]
}
