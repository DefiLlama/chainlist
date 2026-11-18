export function getActiveChains(chains, overwrittenChains = []) {
  const overwrittenIds = new Set(overwrittenChains.map((chain) => chain.chainId));

  return chains
    .filter((chain) => !overwrittenIds.has(chain.chainId))
    .concat(overwrittenChains)
    .filter((chain) => chain.status !== "deprecated");
}
