# [18/12 03:16] Davi Calixto: // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CalixtoSuperToken is ERC20, Ownable {

    constructor(address initialRecipient)
        ERC20("Calixto Super Token", "CLX")
        Ownable(initialRecipient)
    {
        _mint(initialRecipient, 10_000_000 ether);
    }
}
[18/12 03:40] Davi Calixto: // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CalixtoSuperToken is ERC20, Ownable {

    constructor(address initialRecipient)
        ERC20("Calixto Super Token", "CLX")
        Ownable(initialRecipient)
    {
        _mint(initialRecipient, 10_000_000 ether);
    }
}
[18/12 04:07] Davi Calixto: const BSC_CHAIN_ID = "0x38"; // 56
const BSC_PARAMS = {
  chainId: "0x38",
  chainName: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};
[19/12 23:28] Davi Calixto: https://rpc.calixto.network

## Add an RPC to a chain that is already listed

If you wish to add your RPC, please submit a PR modifying [constants/extraRpcs.js](https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.js) to add your RPC to the given chains.

## API
The following API returns all the data in our website, including chain data along with all of their RPCs:

https://chainlist.org/rpcs.json
