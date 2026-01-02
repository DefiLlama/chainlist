# Chainlist
## Ethereum Sepolia Testnet

**Network Name:** Ethereum Sepolia  
**Chain ID:** 11155111  
**RPC URL:** https://rpc.sepolia.org  
**Currency Symbol:** ETH  
**Block Explorer:** https://sepolia.etherscan.io  
Ethereum Sepolia is the official Ethereum proof-of-stake test network, intended for testing smart contracts, infrastructure, and decentralized applications prior to mainnet deployment. It replaces older testnets such as Ropsten and Goerli and is recommended for current Ethereum development.
## Add a chain
Add Ethereum Sepolia testnet details
Adds basic network information for Ethereum Sepolia testnet, including chain ID, RPC endpoint, and block explorer.
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

## Add an RPC to a chain that is already listed

If you wish to add your RPC, please submit a PR modifying [constants/extraRpcs.js](https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.js) to add your RPC to the given chains.

## API
The following API returns all the data in our website, including chain data along with all of their RPCs:

https://chainlist.org/rpcs.json
