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

        // Optionally, establish a connection to the Solana network
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        console.log('Connected to wallet:', response.publicKey.toString());

        // You can now use the connection to interact with the Solana network
      } else {
        alert('Please install Backpack wallet to use this app.');
      }
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    // Optionally, you could clear the provider or any other connection-related state here
    console.log('Disconnected from wallet');
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
      {walletAddress ? (
        <>
          <p>Connected: {walletAddress}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect to Backpack</button>
      )}
    </div>
  );
};

export default WalletConnector;
