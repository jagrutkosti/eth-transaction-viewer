import { EtherscanRequest, Network, HttpResponse } from '../models';

const ETHERSCAN_MAINNET_API = 'https://api.etherscan.io/api?module=account&tag=latest';
const ETHERSCAN_RINKEBY_API = 'https://api-rinkeby.etherscan.io/api?module=account&tag=latest';

// NOTE: Using an API key via .env in react app will always make it into the build and will be
// visible in dev tools. I put it here because security consideration is not the prioroty for
// this task.
const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

export const getEthAddressBalance = async ({ ethAddress, network }: EtherscanRequest): Promise<HttpResponse> => {
  const baseUrl = network === Network.Mainnet ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const urlWithParams = baseUrl + '&action=balance' + '&address=' + ethAddress + '&apikey=' + API_KEY;

  const res = await fetch(urlWithParams);
  return await res
    .json()
    .then((res) => res)
    .catch((err) => err);
};

export const getEthTransactions = async ({ ethAddress, network }: EtherscanRequest): Promise<HttpResponse> => {
  const baseUrl = network === Network.Mainnet ? ETHERSCAN_MAINNET_API : ETHERSCAN_RINKEBY_API;
  const urlWithParams =
    baseUrl +
    '&action=txlist&startBlock=0&endBlock=99999999&page=1&offset=10' +
    '&address=' +
    ethAddress +
    '&apikey=' +
    API_KEY;

  const res = await fetch(urlWithParams);
  return await res
    .json()
    .then((res) => res)
    .catch((err) => err);
};
