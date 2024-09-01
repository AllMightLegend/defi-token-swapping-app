import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isBackpackInstalled, setIsBackpackInstalled] = useState<boolean>(false);

  const checkBackpackWallet = () => {
    if (typeof window !== 'undefined') {
      const { backpack } = window as any;
      if (backpack && backpack.solana) {
        setIsBackpackInstalled(true);
        return backpack.solana;
      }
    }
    setIsBackpackInstalled(false);
    return null;
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
    // Using a slight delay to ensure the wallet object is loaded
    const timeoutId = setTimeout(() => {
      checkBackpackWallet();
    }, 1000); // 1-second delay

    return () => clearTimeout(timeoutId);
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

const checkBackpackWallet = () => {
  if (typeof window !== 'undefined') {
    const { backpack } = window as any;
    console.log('Backpack object:', backpack);
    if (backpack && backpack.solana) {
      setIsBackpackInstalled(true);
      return backpack.solana;
    }
  }
  setIsBackpackInstalled(false);
  return null;
};


export default WalletConnector;
