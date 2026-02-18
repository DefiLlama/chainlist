export const data = {
    "name": "Fuel Sepolia Testnet",
    "chain": "ETH",
    "icon": "fuel",
    "rpc": [
      "https://fuel-testnet-rpc.getzapped.org"
    ],
    "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
    "faucets": ["https://faucet-testnet.fuel.network/"],
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://fuel.network/",
    "shortName": "fuel-sepolia",
    "chainId": 129514,
    "networkId": 129514,
    "explorers": [
      {
        "name": "Fuel Sepolia Testnet Explorer",
        "url": "https://fuel-testnet-explorer.getzapped.org",
        "standard": "none"
      }
    ],
    "parent": {
      "type": "L2",
      "chain": "eip155-11155111",
      "bridges": [
        {
          "url": "https://app-testnet.fuel.network/bridge"
        }
      ]
    }
  }