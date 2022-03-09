import { Paper } from '@material-ui/core';
import { toK } from '../../utils/utils';
import classes from './index.module.css';

export default function ChainTvl({ tvl }) {
  return (
    <Paper elevation={1} className={classes.disclosure}>
      TVL: {tvl ? `$${toK(tvl)}` : ''}
    </Paper>
  );
}
