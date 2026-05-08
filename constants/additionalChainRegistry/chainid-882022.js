import { defineChain } from 'viem'

export const vdchain = defineChain({
  id: 882022,
  name: 'VDChain Mainnet',
  nativeCurrency: { name: 'VDC', symbol: 'VDC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.vdscan.io'] }
  },
  blockExplorers: {
    default: { name: 'VDScan', url: 'https://vdscan.io' }
  }
})
