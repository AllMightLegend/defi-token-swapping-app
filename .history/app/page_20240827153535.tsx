import React from 'react';
import WalletConnector from '../components/WalletConnector';
import PriceChart from '../components/PriceChart';

const Home: React.FC = () => {
  return (
    <div>
      <h1>DeFi Application</h1>
      <WalletConnector />
    </div>
  );
};

export default Home;
