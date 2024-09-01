import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  const connectWallet = async () => {
    try {
      // Create WalletConnect Provider
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: "YOUR_INFURA_PROJECT_ID" // Replace with your Infura Project ID
      });

      // Enable session (triggers QR Code modal)
      await walletConnectProvider.enable();

      // Create ethers provider
      const ethersProvider = new ethers.providers.Web3Provider(walletConnectProvider);
      setProvider(ethersProvider);

      // Get the user's account address
      const accounts = await ethersProvider.listAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress(null);
      }

      console.log('Connected to wallet:', accounts[0]);
    } catch (error) {
      console.error('Error connecting to WalletConnect wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      try {
        // Disconnect the WalletConnect provider
        const walletConnectProvider = provider.provider as WalletConnectProvider;
        await walletConnectProvider.disconnect();
        setWalletAddress(null);
        setProvider(null);
        console.log('Disconnected from wallet');
      } catch (error) {
        console.error('Error disconnecting from WalletConnect wallet:', error);
      }
    }
  };

  useEffect(() => {
    // No setup needed for WalletConnect on mount
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect to WalletConnect'}
      </button>
      {walletAddress && (
        <button onClick={disconnectWallet}>Disconnect</button>
      )}
    </div>
  );
};

export default WalletConnector;
