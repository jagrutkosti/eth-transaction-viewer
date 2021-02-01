import React, { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Network, EtherscanTransaction } from '../models';
import { getEthAddressBalance, getEthTransactions } from '../services';

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
  },
}));

export const EthTransactions: React.FC = () => {
  const classes = useStyles();
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

  const convertWeiToEth = (wei: number): number => {
    return Number((wei / 1000000000000000000).toFixed(18));
  };

  const handleSubmit = async () => {
    const balance = await getEthAddressBalance({ ethAddress, network });

    if (balance.message === 'OK') {
      setBalance(convertWeiToEth(balance.result as number));
    } else {
      setBalance(0);
      console.error(balance.error);
    }

    const transactions = await getEthTransactions({ ethAddress, network });

    if (transactions.message === 'OK') {
      setLastTenTransactions(transactions.result as EtherscanTransaction[]);
    } else {
      setLastTenTransactions([]);
      console.error(transactions.error);
    }
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

  return (
    <>
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
          <div>
            <b>Balance: {balance} Ethers</b>
          </div>
        </div>
      </Container>
      {lastTenTransactions && lastTenTransactions.length > 0 && renderTable()}
    </>
  );
};
