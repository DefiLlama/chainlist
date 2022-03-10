import { useRPCData } from '../../utils/utils';
import classes from './index.module.css';

export default function RPCList({ chain }) {
  const { data } = useRPCData(chain.rpc[0]);
  const darkMode = window.localStorage.getItem('yearn.finance-dark-mode') === 'dark';
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
        {chain.rpc?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item}</td>
            <td>{data}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
