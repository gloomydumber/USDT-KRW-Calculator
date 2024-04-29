import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomizedSelect from './CustomizedSelect';
import { Box } from '@mui/material';
import CustomizedSwitches from './CustomizedSwitches';
import { PAIR, KEY_CURRENCY, STABLE_TOKEN, BASE_EXCHANGE, QUOTE_EXCHANGE } from '../constants/data';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [pair, setPair] = React.useState('KRW-USD');
  const [crypto, setCrypto] = React.useState('BTC');
  const [stable, setStable] = React.useState('USDT');
  const [baseExchange, setBaseExchange] = React.useState('Upbit');
  const [quoteExchange, setQuoteExchange] = React.useState('Binance');

  const handlePair = (event: SelectChangeEvent) => {
    setPair(event.target.value as string);
  };

  const handleCrypto = (event: SelectChangeEvent) => {
    setCrypto(event.target.value as string);
  };

  const handleStable = (event: SelectChangeEvent) => {
    setStable(event.target.value as string);
  };

  const handleBaseExchange = (event: SelectChangeEvent) => {
    setBaseExchange(event.target.value as string);
  }

  const handleQuoteExchange = (event: SelectChangeEvent) => {
    setQuoteExchange(event.target.value as string);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        SETTINGS
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Settings
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

          <CustomizedSelect selectId="pairSelect" labelId="pairLabel" label="Pair" handleChange={handlePair} value={pair} items={PAIR} disabled />
          <CustomizedSelect selectId="cryptoSelect" labelId="cryptoLabel" label="Crypto" handleChange={handleCrypto} value={crypto} items={KEY_CURRENCY} disabled />
          <CustomizedSelect selectId="stableSelect" labelId="stableLabel" label="Stable Token" handleChange={handleStable} value={stable} items={STABLE_TOKEN} disabled />
          <CustomizedSelect selectId="baseSelect" labelId="baseLabel" label="Base Exchange" handleChange={handleBaseExchange} value={baseExchange} items={BASE_EXCHANGE}disabled />
          <CustomizedSelect selectId="quoteSelect" labelId="quoteLabel" label="Quote Exchange" handleChange={handleQuoteExchange} value={quoteExchange} items={QUOTE_EXCHANGE} disabled />
          
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
            <CustomizedSwitches />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            DONE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}