"use client"; // This ensures the component is treated as a client component

import React from 'react';
import WalletConnector from '../components/WalletConnector';
import PriceChart from '../components/PriceChart';
import SwapComponent from '../components/SwapComponent';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <WalletConnector />
      <PriceChart />
      <SwapComponent />
    </Layout>
  );
};

export default Home;
