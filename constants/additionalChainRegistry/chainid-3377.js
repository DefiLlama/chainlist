export const data = {
  name: "Tajirchain",
  chain: "TJR",
  rpc: ["https://rpc.tajirchain.com", "wss://ws.tajirchain.com"],
  faucets: [],
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  nativeCurrency: {
    name: "Tajir",
    symbol: "TJR",
    decimals: 18,
  },
  infoURL: "https://tajirchain.com",
  shortName: "tjr",
  chainId: 3377,
  networkId: 3377,
  status: "incubating",
  explorers: [
    {
      name: "Tajirchain Explorer",
      url: "https://explorer.tajirchain.com",
      icon: "tajirchain",
      standard: "EIP3091",
    },
  ],
  parent: {
    type: "L2",
    chain: "eip155-1",
    bridges: [
      {
        url: "https://bridge.tajirchain.com",
      },
    ],
  },
};
