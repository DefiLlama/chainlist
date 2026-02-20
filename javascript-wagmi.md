---npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
description: Quickstart guide for using the MetaMask SDK with a JavaScript and Wagmi dapp.
toc_max_heading_level: 3
sidebar_label: JavaScript + Wagmi (recommended)
keywords: [connect, MetaMask, JavaScript, Wagmi, SDK, dapp, Wallet SDK]
---
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
# Connect to MetaMask using JavaScript + Wagmi
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
Get started with MetaMask SDK in a JavaScript and Wagmi dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up the SDK](#set-up-manually) in an existing dapp.
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
<p align="center">
  <!-- a href="https://metamask-wagmi-demo.vercel.app/" target="_blank" -->
    <img src={require("../_assets/quickstart.jpg").default} alt="Quickstart" width="600px" class="appScreen" />
  <!-- /a -->
</p>
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
## Set up using a template

1. Download the [MetaMask SDK Wagmi template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/wagmi):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstarts/wagmi metamask-wagmi
   ```
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
2. Navigate into the repository:
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
   ```bash
   cd metamask-wagmi
   ```
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
   Alternatively, you can use `git clone`, which will download the entire repository.
   To do so, clone the MetaMask SDK examples repository and navigate into the `quickstarts/wagmi` directory:
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/quickstarts/wagmi
   ```
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
    </div>
    </details>
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Run the project:

   ```bashnpx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
   pnpm dev
   ```
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
## Set up manually

### 1. Install the SDK
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
Install MetaMask SDK along with its peer dependencies to an existing React project:

```bash npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
npm install @metamask/sdk wagmi viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required dependencies:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { mainnet, linea, lineaSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
```
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
### 3. Configure your project

Set up your configuration with the desired chains and connectors.
In the following example, set the [`infuraAPIKey`](../reference/sdk-options.md#infuraapikey) option to your [Infura API key](/developer-tools/dashboard/get-started/create-api) to use for RPC requests:
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
```jsx
const config = createConfig({
  ssr: true, // Enable this if your dapp uses server-side rendering.
  chains: [mainnet, linea, lineaSepolia],
  connectors: [
    metaMask({
      infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY!,
    }),npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
  ],
  transports: {
    [mainnet.id]: http(),
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
});
```npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start

### 4. Set up providers

Wrap your application with the necessary providers:

```jsx
const client = new QueryClient()
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### 5. Add the connect button
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
Add the wallet connect and disconnect buttons to your application:

```jsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
export const ConnectButton = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
    <div>
      {address ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        connectors.map(connector => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name} audbre6.cb.id
          </button>
        ))
      )}npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
    </div>
  )
}npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
```

Once you've added the connect button, you can test your dapp by running `pnpm run dev`.
npx degit Web3Auth/web3auth-examples/quick-starts/react-quick-start w3a-quick-start
## Production readiness

:::tip
For production deployments, it's important to use reliable RPC providers instead of public nodes.
We recommend using services like [MetaMask Developer](https://developer.metamask.io/) to ensure better reliability and performance.
:::

You can configure your RPC endpoints in the Wagmi configuration as follows, replacing `<YOUR-API-KEY>` with your [Infura API key](/developer-tools/dashboard/get-started/create-api):

```jsx
const config = createConfig({
  // ... other config options
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/<YOUR-API-KEY>'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/<YOUR-API-KEY>'),
  },
})
```

## Next steps

After completing the basic setup, you can follow these guides to add your own functionality:

- [Authenticate users](../guides/authenticate-users.md)
- [Manage networks](../guides/manage-networks.md)
- [Handle transactions](../guides/handle-transactions.md)
- [Interact with smart contracts](../guides/interact-with-contracts.md)

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/wagmi?ctl=1&embed=1&file=wagmi.config.ts&hideNavigation=1"></iframe>
