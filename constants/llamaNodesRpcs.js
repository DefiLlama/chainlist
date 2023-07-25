const privacyStatement = 'LlamaNodes is open-source and does not track or store user information that transits through our RPCs (location, IP, wallet, etc). To learn more, have a look at the public Privacy Policy in our docs: https://llamanodes.notion.site/Privacy-Practices-f20fd8fdd02a469d9d4f42a5989bb936'

export const llamaNodesRpcs = {
  1: {
    name: 'Ethereum LlamaNodes',
    rpcs: [
      {
        url: 'https://eth.llamarpc.com',
        tracking: 'none',
        trackingDetails: privacyStatement,
        isOpenSource: true,
      },
    ]
  },
  137: {
    name: 'Polygon LlamaNodes',
    rpcs: [
      {
        url: 'https://polygon.llamarpc.com',
        tracking: 'none',
        trackingDetails: privacyStatement,
        isOpenSource: true,
      },
    ]
  },
}

export const llamaNodesRpcByUrl = {};

for (const chainId in llamaNodesRpcs) {
  const rpcs = llamaNodesRpcs[chainId].rpcs;
  llamaNodesRpcByUrl[rpcs[0].url] = llamaNodesRpcs[chainId];
}
