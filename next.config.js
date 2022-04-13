const {
  ON_GITHUB_PAGES,
} = process.env;

const basePath = ON_GITHUB_PAGES ? '/bnbchainlist' : '';
const assetPrefix = ON_GITHUB_PAGES ? '/bnbchainlist/' : '';

module.exports = {
  reactStrictMode: true,
  basePath,
  assetPrefix,
}