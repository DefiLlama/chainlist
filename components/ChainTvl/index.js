import { Paper } from '@material-ui/core';
import { toK } from '../../utils/utils';
import classes from './index.module.css';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

export default function ChainTvl({ chain }) {
  return (
    <Paper elevation={1} className={classes.disclosure}>
      <div className={classes.headerField}>
        <p className={classes.header}>{chain.name}</p>
        <p>TVL: {chain.tvl ? `$${toK(chain.tvl)}` : ''}</p>
      </div>
      <ParentSize>{({ width, height }) => <Chart width={width} height={300} data={[]} />}</ParentSize>{' '}
    </Paper>
  );
}
