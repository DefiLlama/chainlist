import { useCallback } from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

const body = JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_getBlockByNumber',
  params: ['latest', false],
  id: 1,
});

const fetchChain = async (baseURL) => {
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
        response.latency = ((Date.now() - response.config.requestStart) / 1000).toFixed(3) + 's';
        return response;
      },
      function (error) {
        if (error.response) {
          error.response.latency = null;
        }

        return Promise.reject(error);
      }
    );

    let { data, latency } = await API.post('', body);

    return { ...data, latency };
  } catch (error) {
    return null;
  }
};

const useRPCData = (urls) => {
  const queries = urls.map((url) => ({
    queryKey: [url],
    queryFn: () => fetchChain(url),
    refetchInterval: 10000,
    select: useCallback((data) => {
      let height = data?.result?.number ?? null;
      let latency = data?.latency ?? null;
      if (height) {
        const hexString = height.toString(16);
        height = parseInt(hexString, 16);
      } else {
        latency = null;
      }

      return { url, height, latency };
    }, []),
  }));
  return useQueries(queries);
};

export default useRPCData;
