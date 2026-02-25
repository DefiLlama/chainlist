export const data = {
  "name": "Noreum Mainnet",
  "chain": "NOR",
  "rpc": [
    "https://rpc.noreum.org",
    "https://mainnet-rpc.noreum.org"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Noreum",
    "symbol": "NOR",
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
  "infoURL": "https://noreum.org",
  "shortName": "nor",
  "slug": "noreum-mainnet",
  "chainId": 1177,
  "networkId": 1177,
  "status": "active",
  "icon": "noreum",
  "explorers": [
    {
      "name": "NoreumScan",
      "url": "https://scan.noreum.org",
      "icon": "noreum",
      "standard": "EIP3091"
    }
  ],
  "genesis": {
    "hash": "0x000000000000000000000000000000000000000000000000000000000000dead",
    "timestamp": "2025-01-01T00:00:00Z",
    "gasLimit": "30000000"
  },
  "upgrades": [
    { "name": "Shanghai", "block": 0 },
    { "name": "Capella", "block": 0 },
    { "name": "Cancun", "block": 0 },
    { "name": "Deneb", "block": 0 }
  ],
  "bootNodes": [
    "enode://65828b55922172a65320c80c3714b0bc4624d63113dd82a5a520238559ef1bbb981069fad5bfbd33039dba67d1df46c7a0ddc244b2b53c3d486a83e054109279@109.123.247.208:30303"
  ],
  "parent": {
    "type": "L1",
    "chain": "NOR"
  }
}
