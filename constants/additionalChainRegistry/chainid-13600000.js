export const data = {
  "name": "Humanity",
  "chain": "Humanity",
  "rpc": [
    "https://humanity-main.g.alchemy.com/public"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "H",
    "symbol": "H",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
  "infoURL": "https://humanity.org",
  "shortName": "hp",
  "chainId": 13600000,
  "networkId": 13600000,
  "parent": {
    "type": "L2",
    "chain": "eip155-42161",
    "bridges": [
      {
        "url": "https://bridge.humanity.org"
      }
    ]
  },
  "explorers": [
    {
      "name": "Humanity Mainnet explorer",
      "url": "https://humanity-main.explorer.alchemy.com",
      "standard": "EIP3091"
    }
  ]
}
