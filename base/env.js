import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig()

export const assetPrefix = publicRuntimeConfig.assetPrefix || 'https://www.bnbchainlist.org/static';