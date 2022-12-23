const privacyStatement = 'LlamaNodes is open-source and does not track or store any kind of user information (i.e., location, IP, wallet address, etc) that transits through our RPCs, ever. To learn more, review the public privacy policy: https://llamanodes.notion.site/Privacy-Practices-f20fd8fdd02a469d9d4f42a5989bb936';

export const llamaNodesRpcs = {
  1: {
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
