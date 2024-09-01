import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any | null>(null);

  const connectWallet = async () => {
    const { solana } = window as any;

    if (solana && solana.isPhantom) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      console.log('Connected to Backpack:', response.publicKey.toString());
    } else {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setProvider(ethersProvider);
    }
  };

  const disconnectWallet = () => {
    if (provider?.disconnect) {
      provider.disconnect();
    }
    setWalletAddress(null);
    setProvider(null);
  };

  return (
    <div>
      {walletAddress ? (
        <>
          <p>Connected: {walletAddress}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
