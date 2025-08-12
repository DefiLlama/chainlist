export const data = {
  name: 'Stable Testnet',
  chain: 'stabletestnet_2201-1',
  rpc: ['https://stable-jsonrpc.testnet.chain0.dev'],
  icon: 'stable',
  faucets: ['https://demo.testnet.chain0.dev/faucet'],
  nativeCurrency: {
    name: 'USDT',
    symbol: 'USDT',
    decimals: 18,
  },
  features: [{ name: 'EIP1559' }],
  infoURL: 'https://docs.partners.stable.xyz/testnet/testnet-information',
  shortName: 'STABLE',
  chainId: 2201,
  networkId: 2201,
  explorers: [{
    name: 'Stable Explorer',
    url: 'https://stable-explorer.testnet.chain0.dev',
    standard: 'EIP3091'
  }],
};