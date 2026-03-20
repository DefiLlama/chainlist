export const data = {
    "name": "Haust Network",
    "chain": "HAUST",
    "icon": "https://ipfs.io/ipfs/QmXVnvLrEEj9Nev2r67Z1tRc1jLDeqC3y95thAkEiCyjwb",
    "rpc": [
      "https://haust-network-rpc.eu-north-2.gateway.fm/",
      "wss://haust-network-rpc.eu-north-2.gateway.fm/ws"
    ],
    "features": [
        { "name": "EIP155" },
        { "name": "EIP1559" },
    ],
    "faucets": [],
    "nativeCurrency": {
      "name": "Haust",
      "symbol": "HAUST",
      "decimals": 18
    },
    "infoURL": "https://haust.network/",
    "shortName": "haust-network",
    "chainId": 3864,
    "networkId": 3864,
    "explorers": [
      {
        "name": "Haust Network blockchain explorer",
        "url": "https://haustscan.com",
        "standard": "EIP3091"
      }
    ],
    "parent": {
      "type": "L2",
      "chain": "eip155-1",
      "bridges": [
        {
          "url": "https://haustbridge.com"
        }
      ]
    }
  }
