import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isBackpackInstalled, setIsBackpackInstalled] = useState<boolean>(false);

  const checkBackpackWallet = () => {
    const { backpack } = window as any;
    if (backpack && backpack.solana) {
      setIsBackpackInstalled(true);
      return backpack.solana;
    } else {
      setIsBackpackInstalled(false);
      return null;
    }
  };

  const connectWallet = async () => {
    try {
      const solanaWallet = checkBackpackWallet();
      if (solanaWallet) {
        const response = await solanaWallet.connect();
        setWalletAddress(response.publicKey.toString());
        console.log('Connected to wallet:', response.publicKey.toString());

        // Optionally, establish a connection to the Solana network
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        console.log('Connected to Solana network');
      } else {
        alert('Backpack wallet is not installed or could not be detected.');
      }
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  };

  useEffect(() => {
    checkBackpackWallet();
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
      {!isBackpackInstalled && <p>Please install the Backpack wallet extension to use this app.</p>}
    </div>
  );
};

export default WalletConnector;
