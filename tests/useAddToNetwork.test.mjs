import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

test('wallet_addEthereumChain receives exactly one chain parameter', async () => {
  const calls = []
  let connects = 0
  const context = vm.createContext({
    console,
    window: { ethereum: { request: async (request) => { calls.push(request); return null } } },
  })
  const source = readFileSync(new URL('../hooks/useAddToNetwork.jsx', import.meta.url), 'utf8')
  const module = new vm.SourceTextModule(source, { context })
  const dependencies = {
    'fathom-client': { trackGoal: () => {} },
    '@tanstack/react-query': { useMutation: () => {}, QueryClient: class {} },
    './useAnalytics': { FATHOM_EVENTS_ID: {}, FATHOM_DROPDOWN_EVENTS_ID: {}, FATHOM_NO_EVENTS_ID: {}, CHAINS_MONITOR: [] },
    './useConnect': { connectWallet: async () => { connects++; return '0x123' } },
  }
  await module.link((specifier) => {
    const exports = dependencies[specifier]
    if (!exports) throw new Error(`Unexpected import: ${specifier}`)
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [name, value] of Object.entries(exports)) this.setExport(name, value)
    }, { context })
  })
  await module.evaluate()

  await module.namespace.addToNetwork({
    chain: {
      chainId: 1,
      name: 'Ethereum',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpc: ['https://example.com/rpc'],
      infoURL: 'https://example.com',
    },
  })

  assert.equal(connects, 1)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].method, 'wallet_addEthereumChain')
  assert.equal(calls[0].params.length, 1)
  assert.equal(calls[0].params[0].chainId, '0x1')
})
