import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import classes from '../../styles/Home.module.css';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function ChainPage() {
  const router = useRouter();
  const { chain } = router.query;
  return (
    <Layout>
      <div className={classes.chainContainer}>
        <Button variant="outlined" onClick={() => router.push('/')}>
          <ArrowBackIcon />
        </Button>
        <p>{chain}</p>
      </div>
    </Layout>
  );
}
