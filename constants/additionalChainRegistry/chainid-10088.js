export const data = {
  name: "Gate Layer",
  chain: "GT",
  rpc: ["https://gatelayer-mainnet.gatenode.cc"],
  nativeCurrency: {
    name: "GT",
    symbol: "GT",
    decimals: 18,
  },
  features: [{ name: "EIP1559" }, { name: "EIP1559" }],
  infoURL: "https://gatechain.io/gatelayer",
  shortName: "GateLayer",
  chainId: 10088,
  networkId: 10088,
  icon: "https://www.woofswap.finance/image/tokens/gatelayer.png",
  explorers: [
    {
      name: "GateLayer",
      url: "https://www.gatescan.org/gatelayer",
      icon: "https://www.woofswap.finance/image/tokens/gatelayer.png",
      standard: "EIP-1559",
    },
  ],
  "parent": {
      "type": "L2",
      "chain": "ethereum",
      "bridges": [
        {
          "url": "https://www.gate.com/"
        }
      ]
    }
};
