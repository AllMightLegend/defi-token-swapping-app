import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  // Check if MetaMask is installed
  const checkMetaMask = () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (isMetaMaskInstalled) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []); // Request account access
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log('Connected to MetaMask:', address);
      } else {
        alert('MetaMask is not installed. Please install MetaMask to use this app.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  useEffect(() => {
    checkMetaMask();

    // Listen for account changes
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        setWalletAddress(accounts[0] || null);
      });
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener('accountsChanged', (accounts: string[]) => {
          setWalletAddress(accounts[0] || null);
        });
      }
    };
  }, [isMetaMaskInstalled]);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect to MetaMask'}
      </button>
      {!isMetaMaskInstalled && <p>Please install MetaMask to use this app.</p>}
    </div>
  );
};

export default WalletConnector;
