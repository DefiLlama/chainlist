import classes from './index.module.css';

export default function RPCList({ chain }) {
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
        <tr>
          <td>1</td>
          <td>https://rpc.ankr.com/fantom</td>
          <td>33064722</td>
          <td>0.576s</td>
        </tr>
      </tbody>
    </table>
  );
}
