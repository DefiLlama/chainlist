import { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const refetchInterval = 60_000;
const websocketRequestTimeout = 15_000;

export const rpcBody = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_getBlockByNumber",
  params: ["latest", false],
  id: 1,
});

const fetchChain = async (baseURL) => {
  if (baseURL.includes("API_KEY")) return null;
  try {
    let API = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    API.interceptors.request.use(function (request) {
      request.requestStart = Date.now();
      return request;
    });

    API.interceptors.response.use(
      function (response) {
        response.latency = Date.now() - response.config.requestStart;
        return response;
      },
      function (error) {
        if (error.response) {
          error.response.latency = null;
        }

        return Promise.reject(error);
      },
    );

    let { data, latency } = await API.post("", rpcBody);

    return { ...data, latency };
  } catch (error) {
    return null;
  }
};

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

const fetchWssChain = async (baseURL, signal) => {
  try {
    return await new Promise((resolve, reject) => {
      const socket = new WebSocket(baseURL);
      let requestStart;
      let timeoutId;
      let settled = false;

      const cleanup = () => {
        clearTimeout(timeoutId);
        signal?.removeEventListener("abort", onAbort);
        socket.onopen = null;
        socket.onmessage = null;
        socket.onerror = null;
        socket.onclose = null;
        socket.close();
      };

      const finish = (callback, value) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback(value);
      };

      const onAbort = () => {
        const error = new Error("WebSocket query was cancelled");
        error.name = "AbortError";
        finish(reject, error);
      };

      timeoutId = setTimeout(() => finish(reject, new Error("WebSocket request timed out")), websocketRequestTimeout);
      signal?.addEventListener("abort", onAbort, { once: true });

      if (signal?.aborted) {
        onAbort();
        return;
      }

      socket.onopen = function () {
        try {
          socket.send(rpcBody);
          requestStart = Date.now();
        } catch (error) {
          finish(reject, error);
        }
      };

      socket.onmessage = function (event) {
        try {
          const data = JSON.parse(event.data);
          const latency = Date.now() - requestStart;
          finish(resolve, { ...data, latency });
        } catch (error) {
          finish(reject, error);
        }
      };

      socket.onerror = function (error) {
        finish(reject, error);
      };

      socket.onclose = function () {
        finish(resolve, null);
      };
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    return null;
  }
};

const useSocketQuery = (url) => {
  return {
    queryKey: [url],
    queryFn: ({ signal }) => fetchWssChain(url, signal),
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
