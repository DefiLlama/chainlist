# Chainlist

## Add a chain

Submit a PR that adds a new file to the [constants/additionalChainRegistry folder](https://github.com/DefiLlama/chainlist/tree/main/constants/additionalChainRegistry). The new file should be named `chainid-{chainid_number}.js` and the contents should follow this structure:
```
{
{
  "name": "BlockGoldCoin Mainnet",
  "chain": "BGC",
  "rpc": [
    "https://rpc.blockgoldcoin.org"
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
  "infoURL": "https://blockgoldcoin.org",
  "shortName": "bgc",
  "chainId": 12345,
  "networkId": 12345,
  "icon": "blockgoldcoin",
  "explorers": [
    {
      "name": "BlockGoldCoin Explorer",
      "url": "https://explorer.blockgoldcoin.org",
      "standard": "EIP3091"
    }
  ]
}

{
  "chainId": 12345,
  "name": "BlockGoldCoin Mainnet",
  "rpc": [
    { "url": "https://rpc.blockgoldcoin.org" }
  ],
  "explorers": [
    { "name": "BlockGoldCoin Explorer", "url": "https://explorer.blockgoldcoin.org" }
  ],
  "nativeCurrency": {
    "name": "BlockGoldCoin",
    "symbol": "BGC",
    "decimals": 18
  }
}
curl https://chainlist.org/rpcs.json | jq '.[] | select(.chainId == 12345)'
const data = await fetch("https://chainlist.org/rpcs.json").then(res => res.json());
const bgc = data.find(c => c.chainId === 12345);
console.log(bgc);

```


https://chainlist.org/rpcs.json
