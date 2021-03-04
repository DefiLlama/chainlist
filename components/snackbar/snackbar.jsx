import React, { Component } from "react";
import {
  Snackbar,
  IconButton,
  Button,
  Typography,
  SvgIcon
} from '@material-ui/core';

import { colors } from "../../theme/coreTheme";

const iconStyle = {
  fontSize: '22px',
  marginRight: '10px',
  verticalAlign: 'middle'
}

function CloseIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={{fontSize: '22px'}}>
      <path
        fill={ color }
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </SvgIcon>
  );
}

function SuccessIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={ color }
        d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM10.75,16.518,6.25,12.2l1.4-1.435L10.724,13.7l6.105-6.218L18.25,8.892Z"
      />
    </SvgIcon>
  );
}

function ErrorIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={ color }
        d="M16.971,0H7.029L0,7.029V16.97L7.029,24H16.97L24,16.971V7.029L16.971,0Zm-1.4,16.945-3.554-3.521L8.5,16.992,7.079,15.574l3.507-3.566L7,8.536,8.418,7.119,12,10.577l3.539-3.583,1.431,1.431-3.535,3.568L17,15.515Z"
      />
    </SvgIcon>
  );
}

function WarningIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={ color }
        d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
      />
    </SvgIcon>
  );
}

function InfoIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={iconStyle}>
      <path
        fill={ color }
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5"
      />
    </SvgIcon>
  );
}


class MySnackbar extends Component {

  state = {
    open: this.props.open,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {

    const { type, message } = this.props

    let icon = <SuccessIcon color={colors.blue} />
    let color = colors.blue
    let messageType = ''
    let actions = [
      <IconButton
        key="close"
        aria-label="Close"
        onClick={this.handleClose}
      >
        <CloseIcon />
      </IconButton>,
    ]

    switch (type) {
      case 'Error':
        icon = <ErrorIcon color={colors.red} />
        color = colors.red
        messageType = "Error"
        break;
      case 'Success':
        icon = <SuccessIcon color={colors.blue} />
        color = colors.blue
        messageType = "Success"
        break;
      case 'Warning':
        icon = <WarningIcon color={colors.orange} />
        color = colors.orange
        messageType = "Warning"
        break;
      case 'Info':
        icon = <InfoIcon color={colors.blue} />
        color = colors.blue
        messageType = "Info"
        break;
      case 'Hash':
        icon = <SuccessIcon color={colors.blue} />
        color = colors.blue
        messageType = "Hash"

        let snackbarMessage = 'https://etherscan.io/tx/'+message;
        actions = [<Button variant="text" size="small" onClick={()=> window.open(snackbarMessage, "_blank")}>
          View
        </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]
        break;
      default:
        icon = <SuccessIcon color={colors.blue} />
        color = colors.blue
        messageType = "Success"
        break;
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={ this.state.open }
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={
          <div style={{ padding: '12px', borderLeft: '5px solid '+color, borderRadius: '4px'}}>
            {icon}
            <div style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '400px' }}>
              <Typography variant='body1' style={{ fontSize: '12px', color: color }}>{ messageType }</Typography>
              <Typography variant='body1' style={{ fontSize: '10px' }}>{ message }</Typography>
            </div>
          </div>
        }
        action={actions}
      />
    );
  }
}

export default MySnackbar;
