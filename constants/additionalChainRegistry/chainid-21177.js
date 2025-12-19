export const data = {
  "name": "Noreum Testnet",
  "chain": "NOR",
  "rpc": [
    "https://testnet-rpc.noreum.org",
    "https://rpc-test.noreum.org"
  ],
  "faucets": [
    "https://faucet.noreum.org"
  ],
  "nativeCurrency": {
    "name": "Test Noreum",
    "symbol": "tNOR",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" },
    { "name": "EIP2718" },
    { "name": "EIP2930" },
    { "name": "EIP4844" },
    { "name": "BlobTransactions" },
    { "name": "Shanghai" },
    { "name": "Capella" },
    { "name": "Deneb" }
  ],
  "infoURL": "https://noreum.org/testnet",
  "shortName": "tnor",
  "slug": "noreum-testnet",
  "chainId": 21177,
  "networkId": 21177,
  "status": "active",
  "icon": "noreum",
  "explorers": [
    {
      "name": "NoreumScan Testnet",
      "url": "https://testnet-scan.noreum.org",
      "icon": "noreum",
      "standard": "EIP3091"
    }
  ],
  "genesis": {
    "hash": "0x000000000000000000000000000000000000000000000000000000000000beef",
    "timestamp": "2025-01-01T00:00:00Z",
    "gasLimit": "30000000"
  },
  "upgrades": [
    { "name": "Shanghai", "block": 0 },
    { "name": "Capella", "block": 0 },
    { "name": "Cancun", "block": 0 },
    { "name": "Deneb", "block": 0 }
  ],
  "bootNodes": [],
  "parent": {
    "type": "L1",
    "chain": "NOR"
  }
}
