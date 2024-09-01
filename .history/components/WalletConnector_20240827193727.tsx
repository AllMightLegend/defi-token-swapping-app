// Example in WalletConnector.tsx

import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
        console.log('Connected to wallet:', response.publicKey.toString());
      } else {
        alert('Please install Backpack wallet to use this app.');
      }
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  };

  useEffect(() => {
    const { solana } = window as any;
    if (solana && solana.isPhantom) {
      solana.on('accountChanged', (publicKey: PublicKey) => {
        setWalletAddress(publicKey ? publicKey.toString() : null);
      });
    }
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect to Backpack'}
      </button>
    </div>
  );
};

export default WalletConnector;
