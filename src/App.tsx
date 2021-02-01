import React from 'react';
import './App.css';
import { EthTransactions } from './components/EthTransactions';

const App: React.FC = () => {
  return (
    <div className="App">
      <EthTransactions />
    </div>
  );
};

export default App;
