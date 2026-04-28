# Chainlist

## Add a chain

Submit a PR that adds a new file to the [constants/additionalChainRegistry folder](https://github.com/DefiLlama/chainlist/tree/main/constants/additionalChainRegistry). The new file should be named `chainid-{chainid_number}.js` and the contents should follow this structure:
```
{
  "name": "Ethereum Mainnet",
  "chain": "ETH",
  "rpc": [
    "https://eth.llamarpc.com",
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
  "infoURL": "https://ethereum.org",
  "shortName": "eth",
  "chainId": 1,
  "networkId": 1,
  "icon": "ethereum",
  "explorers": [{
    "name": "etherscan",
    "url": "https://etherscan.io",
    "icon": "etherscan",
    "standard": "EIP3091"
  }]
}
```

## Update a chain icon

Chain icons are served from `https://icons.llamao.fi/icons/chains/rsz_<slug>.jpg` and may be cached by the CDN. If you've updated an icon in the icons repo but Chainlist still shows the old image, add an optional `iconVersion` field to your chain's override file:

```
{
  ...
  "icon": "ethereum",
  "iconVersion": 2
}
```

This appends `?v=<n>` to the icon URL, forcing the CDN to fetch a fresh copy. Bump the number on each subsequent update.

## Add an RPC to a chain that is already listed

If you wish to add your RPC, please submit a PR modifying [constants/extraRpcs.js](https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.js) to add your RPC to the given chains.

## API
The following API returns all the data in our website, including chain data along with all of their RPCs:

https://chainlist.org/rpcs.json
