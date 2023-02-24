import { fetcher, populateChain, arrayMove } from "../../../utils";
import { llamaNodesRpcs } from "../../../constants/llamaNodesRpcs";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const { chain: chainIdOrName } = req.query;

  if (req.method === "GET") {
    const chains = await fetcher("https://chainid.network/chains.json");

    let chain = chains.find((chain) => chain.chainId.toString() === chainIdOrName || chain.shortName === chainIdOrName);
    if (!chain) {
      return res.status(404).json({ message: "chain not found" });
    }

    chain = populateChain(chain, []);

    const llamaNodesRpc = llamaNodesRpcs[chain.chainId] ?? null;

    if (llamaNodesRpc) {
      const llamaNodesRpcIndex = chain.rpc.findIndex((rpc) => rpc.url === llamaNodesRpc.rpcs[0].url);

      if (llamaNodesRpcIndex || llamaNodesRpcIndex === 0) {
        chain.rpc = arrayMove(chain.rpc, llamaNodesRpcIndex, 0);
      }
    }

    return res.status(200).json(chain);
  }
}
