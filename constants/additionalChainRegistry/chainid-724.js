export default {
  name: 'LXON Mainnet',
  chain: 'LXON',
  rpc: [
    'https://rpc.lxon.in',
    'http://13.61.177.64:8546'
  ],
  faucets: [],
  nativeCurrency: {
    name: 'LXON',
    symbol: 'XON',
    decimals: 18
  },
  infoURL: 'https://lxon.io',
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