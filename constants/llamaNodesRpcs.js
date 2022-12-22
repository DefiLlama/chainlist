const privacyStatement = 'LlamaNodes does not collect, log, or share user data that transits through our RPCs, ever. LlamaNodes does not collect the IP addresses of your users. LlamaNodes does not collect the wallet addresses of your users. https://llamanodes.notion.site/Privacy-Practices-f20fd8fdd02a469d9d4f42a5989bb936';

export const llamaNodesRpcs = {
  1: {
    rpcs: [
      {
        url: 'https://eth.llamarpc.com',
        tracking: 'none',
        trackingDetails: privacyStatement,
      },
    ]
  },
  137: {
    rpcs: [
      {
        url: 'https://polygon.llamarpc.com',
        tracking: 'none',
        trackingDetails: privacyStatement,
      },
    ]
  },
}
