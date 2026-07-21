export const data ={
  name: "Prismo Glassnet",
  chain: "PRISMO",
  rpc: [
    "https://rpc.glassnet.prismo.network",
    "wss://rpc.glassnet.prismo.network"
  ],
  faucets: [
    "https://faucet.glassnet.prismo.network"
  ],
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18
  },
  features: [{ name: "EIP155" }, { name: "EIP1559" }],
  infoURL: "https://prismo.technology",
  shortName: "prsm",
  chainId: 101001000,
  networkId: 101001000,
  icon: {
    url: "ipfs://bafkreihx2y5xfpk5kzhypo4z4ugzjqgnslqkfgyhpl5uo2wba77epg4lgq",
    format: "svg",
    width: 512,
    height: 512
  },
  explorers: [{
    name: "Glassnet Explorer",
    url: "https://explorer.glassnet.prismo.network",
    icon: "blockscout",
    standard: "EIP3091"
  }]
}