import { privacyStatement } from "../extraRpcs.js";

export const data = {
    "name": "X Layer Testnet",
    "chain": "X Layer",
    "icon": "x layer",
    "rpc": [
      "https://testrpc.xlayer.tech", "https://xlayertestrpc.okx.com",
      {
        url: "https://endpoints.omniatech.io/v1/xlayer/testnet/public",
        tracking: "none",
        trackingDetails: privacyStatement.omnia,
      },
      {
        url: "https://rpc.ankr.com/xlayer_testnet",
        tracking: "none",
        trackingDetails: privacyStatement.ankr,
      },
      {
        url: "https://xlayer-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "wss://xlayer-testnet.drpc.org",
        tracking: "none",
        trackingDetails: privacyStatement.drpc,
      },
      {
        url: "https://moonbase-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
      {
        url: "wss://moonbase-rpc.dwellir.com",
        tracking: "limited",
        trackingDetails: privacyStatement.dwellir,
      },
    ],
    "faucets": ["https://www.okx.com/xlayer/faucet"],
    "nativeCurrency": {
      "name": "X Layer Global Utility Token in testnet",
      "symbol": "OKB",
      "decimals": 18
    },
    "infoURL": "https://www.okx.com/xlayer",
    "shortName": "tokb",
    "chainId": 1952,
    "networkId": 1952,
    "explorers": [
      {
        "name": "OKLink",
        "url": "https://www.oklink.com/xlayer-test",
        "standard": "EIP3091"
      }
    ]
  }

  