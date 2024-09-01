import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { backpack } = window as any;
      if (backpack && backpack.solana) {
        // Accessing the Backpack Solana interface
        const response = await backpack.solana.connect();
        setWalletAddress(response.publicKey.toString());
        console.log('Connected to wallet:', response.publicKey.toString());

        // Optionally, establish a connection to the Solana network
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        console.log('Connected to Solana network');
      } else {
        alert('Please install the Backpack wallet extension to use this app.');
      }
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  };

  useEffect(() => {
    const { backpack } = window as any;
    if (backpack && backpack.solana) {
      backpack.solana.on('accountChanged', (publicKey: PublicKey) => {
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
