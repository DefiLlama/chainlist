export const data = {
    name: "Tajirchain Devnet",
    chain: "TJR",
    rpc: [
      "https://rpc.devnet.tajirchain.com",
      "wss://wss.devnet.tajirchain.com"
    ],
    faucets: ["https://faucet.devnet.tajirchain.com"],
    features: [{ name: "EIP155" }],
    nativeCurrency: {
      name: "Tajirchain Test Token",
      symbol: "tTJR",
      decimals: 18,
    },
    infoURL: "https://tajirchain.com",
    shortName: "tjr-devnet",
    chainId: 21519080,
    networkId: 21519080,
    status: "active",
    explorers: [
      {
        name: "Blockscout",
        url: "https://explorer.devnet.tajirchain.com",
        icon: "blockscout",
        standard: "EIP3091",
      },
    ],
    parent: {
      type: "L2",
      chain: "eip155-11155111",
      bridges: [
        {
          url: "https://bridge.devnet.tajirchain.com",
        },
      ],
    },
  };
