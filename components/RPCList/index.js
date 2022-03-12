import { Paper } from '@material-ui/core';
import { useEffect } from 'react';
import { useRPCData } from '../../utils/utils';
import classes from './index.module.css';

export default function RPCList({ chain }) {
  const { data } = useRPCData(chain.rpc);
  const darkMode = window.localStorage.getItem('yearn.finance-dark-mode') === 'dark';

  useEffect(() => {
    // clear network resources list for better performance to find latency of each rpc url
    window.performance.clearResourceTimings();

    const interval = setInterval(() => {
      window.performance.clearResourceTimings();
    }, 15000);

    return () => clearInterval(interval);
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
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.url}</td>
              <td>{item.height}</td>
              <td>{item.latency}</td>
              <td>Add to Wallet</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
