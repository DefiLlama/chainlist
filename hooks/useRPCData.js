import { useCallback, useEffect, useRef } from 'react';
import { useQueries, useQueryClient } from 'react-query';
import axios from 'axios';

export const rpcBody = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_getBlockByNumber',
  params: ['latest', false],
  id: 1,
});

export const socketBody = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_subscribe',
  params: ['newHeads'],
  id: 1,
});

const fetchChain = async (baseURL) => {
  if (baseURL.includes('API_KEY')) return null;
  try {
    let API = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
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
      }
    );

    let { data, latency } = await API.post('', rpcBody);

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
    refetchInterval: 5000,
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

const useSocketQuery = (url) => {
  const queryClient = useQueryClient();

  // small hack to wait until socket connection opens to show loading indicator on table row
  const queryFn = createPromise();

  const socket = useRef();

  const requestStart = useRef(Date.now());

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = function () {
      socket.current.send(socketBody);
      requestStart.current = Date.now();
    };

    socket.current.onmessage = function (event) {
      const { params = {} } = JSON.parse(event.data);

      const latency = Date.now() - requestStart.current;
      requestStart.current = Date.now();
      queryClient.setQueryData(url, { ...params, latency });
      queryFn.resolve();
    };

    socket.current.onerror = function (e) {
      queryFn.reject(e);
    };

    return () => {
      socket.current?.close();
      queryFn.resolve();
    };
  }, []);

  return {
    queryKey: [url],
    queryFn: () => queryFn.then(() => queryClient.getQueryData(url)).catch((e) => ({})),
    select: useCallback((data) => formatData(url, data), []),
    staleTime: Infinity,
  };
};

const useRPCData = (urls) => {
  const queries = urls.map((url) => (url.includes('wss://') ? useSocketQuery(url) : useHttpQuery(url)));
  return useQueries(queries);
};

export default useRPCData;
