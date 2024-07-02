import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { rpcBody, fetchChain } from "../utils/fetch";

const refetchInterval = 60_000;

const formatData = (url, data) => {
  let height = data?.result?.number ?? null;
  let latency = data?.latency ?? null;
  if (height) {
    const hexString = height.toString(16);
    height = parseInt(hexString, 16);
  } else {
    latency = null;
  }
  return { url, height, latency };
};

const useHttpQuery = (url) => {
  return {
    queryKey: [url],
    queryFn: () => fetchChain(url),
    refetchInterval,
    select: useCallback((data) => formatData(url, data), []),
  };
};

function createPromise() {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  promise.resolve = resolve;
  promise.reject = reject;

  return promise;
}

const fetchWssChain = async (baseURL) => {
  try {
    // small hack to wait until socket connection opens to show loading indicator on table row
    const queryFn = createPromise();

    const socket = new WebSocket(baseURL);
    let requestStart;

    socket.onopen = function () {
      socket.send(rpcBody);
      requestStart = Date.now();
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      const latency = Date.now() - requestStart;
      queryFn.resolve({ ...data, latency });
    };

    socket.onerror = function (e) {
      queryFn.reject(e);
    };

    return await queryFn;
  } catch (error) {
    return null;
  }
};

const useSocketQuery = (url) => {
  return {
    queryKey: [url],
    queryFn: () => fetchWssChain(url),
    select: useCallback((data) => formatData(url, data), []),
    refetchInterval,
  };
};

const useRPCData = (urls) => {
  const queries =
    urls?.map((url) => (url.url.includes("wss://") ? useSocketQuery(url.url) : useHttpQuery(url.url))) ?? [];

  return useQueries({ queries });
};

export default useRPCData;
