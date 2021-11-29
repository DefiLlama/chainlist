## How to add a new chain

Fork this repo and add your evm chain info into `chains.json` 

Example:

```javascript
{
    "name": "xDAI Chain",
    "chainId": 100,
    "shortName": "xdai",
    "chain": "XDAI",
    "network": "mainnet",
    "networkId": 100,
    "nativeCurrency": {
        "name": "xDAI",
        "symbol": "xDAI",
        "decimals": 18
    },
    "rpc": [
        "https://rpc.xdaichain.com",
        "https://xdai.poanetwork.dev",
        "wss://rpc.xdaichain.com/wss",
        "wss://xdai.poanetwork.dev/wss",
        "http://xdai.poanetwork.dev",
        "https://dai.poa.network",
        "ws://xdai.poanetwork.dev:8546"
    ],
    "faucets": [],
    "infoURL": "https://forum.poa.network/c/xdai-chain",
    "app_resource": {
        "ic_chain_select": "https://tp-upload.cdn.bcebos.com/v1/blockChain/xDAI/1.png",
        "ic_chain_unselect": "https://tp-upload.cdn.bcebos.com/v1/blockChain/xDAI/0.png",
        "color_chain_bg": "0x58B2AF"
    }
}
```

`app_resource` is optional, which is only affect the appearance in TokenPocket Wallet. You can follow the standard below:


![standard](https://tp-statics.tokenpocket.pro/images/custom-chains-standard-1.png)
![standard](https://tp-statics.tokenpocket.pro/images/custom-chains-standard-2.png)
![standard](https://tp-statics.tokenpocket.pro/images/custom-chains-standard-3.png)
![standard](https://tp-statics.tokenpocket.pro/images/custom-chains-standard-4.png)
![standard](https://tp-statics.tokenpocket.pro/images/custom-chains-standard-5.png)

