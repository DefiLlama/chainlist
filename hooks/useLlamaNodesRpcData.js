import { useMemo } from "react";
import { arrayMoveImmutable } from 'array-move';

import { llamaNodesRpcs } from "../constants/llamaNodesRpcs";

export const useLlamaNodesRpcData = (chainId, data) => {
  const [rpcData, hasLlamaNodesRpc] = useMemo(() => {
    const llamaNodesRpc = llamaNodesRpcs[chainId] ?? null;

    if (llamaNodesRpc) {
      const llamaNodesRpcIndex = data.findIndex(rpc => rpc?.data.url === llamaNodesRpc.rpcs[0].url);

      if (llamaNodesRpcIndex) {
        return [arrayMoveImmutable(data, llamaNodesRpcIndex, 0), true];
      }

      return [data, false];
    }

    return [data, false];
  }, [chainId, data]);

  return { rpcData, hasLlamaNodesRpc };
}
