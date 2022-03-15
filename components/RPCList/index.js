import { Button, Paper } from '@material-ui/core';
import { useEffect, useMemo } from 'react';
import useRPCData from '../../hooks/useRPCData';
import { useAccount, useRpcStore } from '../../stores';
import { addToNetwork, renderProviderText } from '../../utils/utils';
import classes from './index.module.css';

export default function RPCList({ chain, providerText }) {
  const chains = useRPCData(chain.rpc);

  const data = useMemo(() => {
    return chains?.sort((a, b) => {
      if (a.isLoading) {
        return 1;
      }

      const h1 = a?.data?.height;
      const h2 = b?.data?.height;
      const l1 = a?.data?.latency;
      const l2 = b?.data?.latency;

      if (!h2) {
        return -1;
      }

      if (h2 - h1 > 0) {
        return 1;
      }
      if (h2 - h1 < 0) {
        return -1;
      }
      if (h1 === h2) {
        if (l1 < l2) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }, [chains]);

  const darkMode = window.localStorage.getItem('yearn.finance-dark-mode') === 'dark';

  useEffect(() => {
    const socket = new WebSocket('wss://arb1.arbitrum.io/ws');

    socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
  }, []);

  return (
    <Paper elevation={1} className={classes.disclosure}>
      <table
        className={classes.table}
        style={{ '--border-color': darkMode ? 'hsl(0deg 0% 39% / 33%)' : 'hsl(0deg 0% 17% / 4%)' }}
      >
        <caption>{`${chain.name} RPC URL List`}</caption>
        <thead>
          <tr>
            <th>RPC Server Address</th>
            <th>Height</th>
            <th>Latency</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Row values={item} chain={chain} key={index} />
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

const Shimmer = () => {
  const darkMode = window.localStorage.getItem('yearn.finance-dark-mode') === 'dark';
  const linearGradient = darkMode
    ? 'linear-gradient(90deg, rgb(255 247 247 / 7%) 0px, rgb(85 85 85 / 80%) 40px, rgb(255 247 247 / 7%) 80px)'
    : 'linear-gradient(90deg, #f4f4f4 0px, rgba(229, 229, 229, 0.8) 40px, #f4f4f4 80px)';
  return <div className={classes.shimmer} style={{ '--linear-gradient': linearGradient }}></div>;
};

const Row = ({ values, chain }) => {
  const { data, isLoading, refetch } = values;

  const rpcs = useRpcStore((state) => state.rpcs);
  const addRpc = useRpcStore((state) => state.addRpc);
  const account = useAccount((state) => state.account);

  useEffect(() => {
    // ignore first request to a url and refetch to calculate latency which doesn't include DNS lookup
    if (data && !rpcs.includes(data.url)) {
      refetch();
      addRpc(data.url);
    }
  }, [data, rpcs, addRpc, refetch]);

  return (
    <tr>
      <td>{isLoading ? <Shimmer /> : data?.url}</td>
      <td>{isLoading ? <Shimmer /> : data?.height}</td>
      <td>{isLoading ? <Shimmer /> : data?.latency}</td>
      <td>
        {isLoading ? (
          <Shimmer />
        ) : (
          <Button style={{ padding: '0 8px' }} onClick={() => addToNetwork(account, chain, data?.url)}>
            {renderProviderText(account)}
          </Button>
        )}
      </td>
    </tr>
  );
};
