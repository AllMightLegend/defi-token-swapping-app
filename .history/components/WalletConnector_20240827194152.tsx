import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        const wallets = [solana.phantom, solana.backpack]; // Add supported wallets here

        const walletSelection = await new Promise<any>((resolve, reject) => {
          const userSelection = prompt(
            `Choose a wallet to connect:\n1. Phantom\n2. Backpack`,
            '1'
          );
          if (userSelection === '1') {
            resolve(solana.phantom);
          } else if (userSelection === '2') {
            resolve(solana.backpack);
          } else {
            reject('No wallet selected or invalid selection');
          }
        });

        const response = await walletSelection.connect();
        setWalletAddress(response.publicKey.toString());
        console.log('Connected to wallet:', response.publicKey.toString());
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
