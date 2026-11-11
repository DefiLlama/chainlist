// One RPC, deliberately: https://explorer.lxon.in/api/eth-rpc also answers eth_chainId with CORS,
// but it does not answer net_version and wallets call net_version on connect, so it is not an RPC and
// listing it would make "add to wallet" fail for the clients that ask. Verified, not assumed.
export const data = {
  name: 'LXON Mainnet',
  chain: 'LXON',
  rpc: ['https://rpc.lxon.in'],
  faucets: [],
  nativeCurrency: {
    name: 'LXON',
    symbol: 'XON',
    decimals: 18
  },
  infoURL: 'https://www.lxon.in',
  shortName: 'lxon',
  chainId: 724,
  networkId: 724,
  icon: 'lxon',
  explorers: [
    {
      name: 'LXON Explorer',
      url: 'https://explorer.lxon.in',
      standard: 'EIP3091'
    }
  ],
  status: 'active',
  features: [{ name: 'EIP155' }]
}
