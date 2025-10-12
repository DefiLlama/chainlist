# Chainlist

## Add a chain

Submit a PR that adds a new file to the [constants/additionalChainRegistry folder](https://github.com/DefiLlama/chainlist/tree/main/constants/additionalChainRegistry). The new file should be named `chainid-{chainid_number}.js` and the contents should follow this structure:
```
{
  "name": "BlockGoldCoin Mainnet",
  "chain": "BGC",
  "rpc": [
    "https://rpc.blockgoldcoin.com",
    "https://mainnet.blockgoldcoin.org/rpc"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "BlockGoldCoin",
    "symbol": "BGC",
    "decimals": 18
  },
  "features": [
    { "name": "EIP155" },
    { "name": "EIP1559" }
  ],
  "infoURL": "https://blockgoldcoin.com",
  "shortName": "bgc",
  "chainId": 20240501,
  "networkId": 20240501,
  "icon": "blockgoldcoin",
  "explorers": [
    {
      "name": "BlockGoldScan",
      "url": "https://explorer.blockgoldcoin.com",
      "icon": "blockgoldscan",
      "standard": "EIP3091"
    }
  ]
}


## Add an RPC to a chain that is already listed

If you wish to add your RPC, please submit a PR modifying [constants/extraRpcs.js](https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.js) to add your RPC to the given chains.

## API
The following API returns all the data in our website, including chain data along with all of their RPCs:

https://chainlist.org/rpcs.json
