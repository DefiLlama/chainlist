export const data = {
  name: "Marschain",
  chain: "MARS",
  rpc: ["https://rpcs.marschain.net/"],
  faucets: [],
  nativeCurrency: {
    name: "Mars",
    symbol: "MARS",
    decimals: 18
  },
  features: [
    { name: "EIP155" },
    { name: "EIP1559" }
  ],
  infoURL: "https://marschain.net",
  shortName: "mars",
  chainId: 890,
  networkId: 890,
  icon: "ipfs://bafkreidjevwbk3kslq6gspdpzdn3jrm7kxepd2oaem3o7u2zspmqlk7ksa",
  explorers: [
    {
      name: "Mars Explorer",
      url: "https://explorer.marschain.net",
      standard: "EIP3091"
    }
  ]
};
