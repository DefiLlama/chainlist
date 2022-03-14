import { Paper } from '@material-ui/core';
import { useMemo } from 'react';
import useRPCData from '../../hooks/useRPCData';
import classes from './index.module.css';

export default function RPCList({ chain }) {
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
            <Row values={item} key={index} />
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

const Row = ({ values }) => {
  const { data, isLoading } = values;

  return (
    <tr>
      <td>{isLoading ? <Shimmer /> : data?.url}</td>
      <td>{isLoading ? <Shimmer /> : data?.height}</td>
      <td>{isLoading ? <Shimmer /> : data?.latency}</td>
      <td>{isLoading ? <Shimmer /> : 'Add to Wallet'}</td>
    </tr>
  );
};
