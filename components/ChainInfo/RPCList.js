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
    <table
      className={classes.table}
      style={{ '--border-color': darkMode ? 'hsl(0deg 0% 39% / 33%)' : 'hsl(0deg 0% 17% / 4%)' }}
    >
      <caption>{`${chain.name} RPC URL List`}</caption>
      <thead>
        <tr>
          <th>S.No</th>
          <th>RPC Server Address</th>
          <th>Height</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.url}</td>
            <td>{item.height}</td>
            <td>{item.latency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
