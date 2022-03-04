import { Dialog, Typography, Button } from '@material-ui/core';
import classes from "./shutdownNotice.module.css";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export default function shutdownNotice({ close }) {

  return (
    <Dialog fullScreen open={ true } onClose={close} >
      <div className={ classes.dialogContainer }>
        <div className={classes.warningContainer}>
          <PowerSettingsNewIcon className={ classes.warningIcon } />
          <Typography className={classes.para2} align='center'>
            This service will no longer be available from 03 April 2022.
          </Typography>
          <Typography className={classes.para2} align='center'>
            The source code is open source, anyone that would like to continue hosting this service is welcome to.
          </Typography>
          <div className={ classes.buttonsContainer }>
            <Button
              fullWidth
              variant='contained'
              size='large'
              className={classes.primaryButton }
              onClick={close}>
              <Typography className={ classes.buttonTextPrimary }>Okay</Typography>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
