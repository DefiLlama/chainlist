export const data = {
  "name": "Lumia Beam Testnet",
  "shortName": "lumia-beam-testnet",
  "title": "Lumia Beam Testnet",
  "chain": "ETH",
  "icon": "lumia",
  "rpc": ["https://beam-rpc.lumia.org"],
  "faucets": ["https://beam-faucet.lumia.org/"],
  "nativeCurrency": {
    "name": "Lumia",
    "symbol": "LUMIA",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
  "infoURL": "https://lumia.org",
  "chainId": 2030232745,
  "networkId": 2030232745,
  "explorers": [
    {
      "name": "Lumia Beam Testnet Explorer",
      "url": "https://beam-explorer.lumia.org",
      "icon": "lumia",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://beam-bridge.lumia.org"
      }
    ]
  }
}
