export const data = {
    name: "Tajirchain Testnet",
    chain: "TJR",
    rpc: [
      "https://rpc.testnet.tajirchain.com",
      "wss://wss.testnet.tajirchain.com"
    ],
    faucets: ["https://faucet.testnet.tajirchain.com"],
    features: [{ name: "EIP155" }],
    nativeCurrency: {
      name: "Tajirchain Test Token",
      symbol: "TJR",
      decimals: 18,
    },
    infoURL: "https://tajirchain.com",
    shortName: "tjr-testnet",
    chainId: 7733,
    networkId: 7733,
    status: "active",
    explorers: [
      {
        name: "Blockscout",
        url: "https://explorer.testnet.tajirchain.com",
        icon: "blockscout",
        standard: "EIP3091",
      },
    ],
    parent: {
      type: "L2",
      chain: "eip155-11155111",
      bridges: [
        {
          url: "https://bridge.testnet.tajirchain.com",
        },
      ],
    },
  };
