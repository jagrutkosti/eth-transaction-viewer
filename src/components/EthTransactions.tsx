import React, { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Network, EtherscanTransaction } from '../models';
import { getEthAddressBalance, getEthTransactions } from '../services';
import { ethers } from 'ethers';
import QRCode from 'react-qr-code';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 150,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 650,
    width: '100%',
    margin: 25,
  },
}));

export const EthTransactions: React.FC = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [network, setNetwork] = useState<Network>(Network.Mainnet);
  const [ethAddress, setEthAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [lastTenTransactions, setLastTenTransactions] = useState<EtherscanTransaction[]>([]);

  const handleAddressChange = (value: string) => {
    setEthAddress(value);
  };

  const handleNetworkChange = (value: unknown) => {
    setNetwork(value as Network);
  };

  const handleSnackbarClose = () => {
    setIsError(false);
    setErrorMessage('');
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleSubmit = async () => {
    if (ethers.utils.isAddress(ethAddress)) {
      const balanceResponse = await getEthAddressBalance({ ethAddress, network });
      const transactionResponse = await getEthTransactions({ ethAddress, network });

      if (!balanceResponse.isError && !transactionResponse.isError) {
        const sortingTransactions = transactionResponse.result as EtherscanTransaction[];
        sortingTransactions.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());

        setBalance(convertWeiToEth(balanceResponse.result as number));
        setLastTenTransactions(sortingTransactions);
      } else {
        setBalance(0);
        setLastTenTransactions([]);
        setErrorMessage(balanceResponse.message + ', ' + transactionResponse.message);
        setIsError(true);
      }
    } else {
      setErrorMessage('Invalid Ethereum Address');
      setIsError(true);
    }
  };

  const convertWeiToEth = (wei: number): number => {
    return Number((wei / 1000000000000000000).toFixed(18));
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Ether(s)</TableCell>
              <TableCell>Confirmations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastTenTransactions.map((row) => (
              <TableRow key={row.hash}>
                <TableCell component="th" scope="row">
                  {row.from}
                </TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.timeStamp}</TableCell>
                <TableCell>{convertWeiToEth(row.value)}</TableCell>
                <TableCell>{row.confirmations}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderOverlayComponents = () => {
    return (
      <>
        <Snackbar open={isError} autoHideDuration={5000} onClose={handleSnackbarClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
            {errorMessage}
          </MuiAlert>
        </Snackbar>

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Scan the QR code to get the Ethereum Address'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              <QRCode value={ethAddress} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <>
      {renderOverlayComponents()}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ethereum Transaction Viewer
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="address"
              label="Ethereum Address"
              onChange={(e) => handleAddressChange(e.target.value)}
              autoFocus
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Select Network...</InputLabel>
              <Select id="network" onChange={(e) => handleNetworkChange(e.target.value)} value={network} required>
                <MenuItem value={Network.Mainnet}>{Network.Mainnet}</MenuItem>
                <MenuItem value={Network.Rinkeby}>{Network.Rinkeby}</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Get Info
            </Button>
          </form>
        </div>
      </Container>
      <div>
        {ethAddress.length > 0 && balance > 0 && (
          <>
            Balance of address: &nbsp;
            <Link component="button" onClick={() => setIsDialogOpen(true)}>
              {ethAddress}
            </Link>
            &nbsp; = {balance} Ethers
          </>
        )}
      </div>
      {lastTenTransactions && lastTenTransactions.length > 0 && renderTable()}
    </>
  );
};
