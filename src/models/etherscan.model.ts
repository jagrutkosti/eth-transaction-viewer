export type EtherscanTransaction = {
  blockNumber: number;
  timeStamp: Date;
  hash: string;
  nonce: number;
  blockHash: string;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: number;
  isError: number;
  cumulativeGasUsed: number;
  gasUsed: number;
  confirmations: number;
  txreceipt_status?: string;
  input?: string;
  contractAddress?: string;
};

export type EtherscanRequest = {
  ethAddress: string;
  network: Network;
};

export enum Network {
  Mainnet = 'Mainnet',
  Rinkeby = 'Rinkeby',
}
