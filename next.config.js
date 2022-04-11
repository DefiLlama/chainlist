const {
  ON_GITHUB_PAGES,
} = process.env;

const basePath = ON_GITHUB_PAGES ? '/chainlist' : '';
const assetPrefix = ON_GITHUB_PAGES ? '/chainlist/' : '';

module.exports = {
  reactStrictMode: true,
  basePath,
  assetPrefix,
}