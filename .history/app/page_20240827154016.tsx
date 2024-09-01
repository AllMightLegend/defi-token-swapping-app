"use client"; // This ensures the component is treated as a client component

import React from 'react';
import WalletConnector from '../components/WalletConnector';
import PriceChart from '../components/PriceChart';
import SwapComponent from '../components/SwapComponent';

const Home: React.FC = () => {
  return (
    <div>
      <h1>DeFi Application</h1>
      <WalletConnector />
      <PriceChart />
      <SwapComponent />
    </div>
  );
};

export default Home;
