import { fetcher, populateChain } from "../../../utils/fetch";
import { overwrittenChains } from "../../../constants/additionalChainRegistry/list";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const { chain: chainIdOrName } = req.query;

  if (req.method === "GET") {
    const [chains, chainTvls] = await Promise.all([
      fetcher("https://chainid.network/chains.json"),
      fetcher("https://api.llama.fi/chains")
    ]);

    let chain =
      overwrittenChains.find(
        (chain) => chain.chainId.toString() === chainIdOrName || chain.shortName === chainIdOrName,
      ) ?? chains.find((chain) => chain.chainId.toString() === chainIdOrName || chain.shortName === chainIdOrName);

    if (!chain) {
      return res.status(404).json({ message: "chain not found" });
    }

    chain = populateChain(chain, chainTvls);

    return res.status(200).json(chain);
  }
}
