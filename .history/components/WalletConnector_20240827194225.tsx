import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        const walletType = prompt(
          'Choose a wallet: 1. Phantom 2. Backpack',
          '1'
        );
  
        let selectedWallet;
        if (walletType === '1') {
          selectedWallet = solana.phantom;
        } else if (walletType === '2') {
          selectedWallet = solana.backpack;
        }
  
        if (selectedWallet) {
          const response = await selectedWallet.connect();
          setWalletAddress(response.publicKey.toString());
          console.log('Connected to wallet:', response.publicKey.toString());
        } else {
          alert('Please select a valid wallet.');
        }
      } else {
        alert('Please install Phantom or Backpack wallet to use this app.');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };
  

  useEffect(() => {
    const { solana } = window as any;
    if (solana) {
      solana.on('accountChanged', (publicKey: PublicKey) => {
        setWalletAddress(publicKey ? publicKey.toString() : null);
      });
    }
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect to Wallet'}
      </button>
    </div>
  );
};

export default WalletConnector;
