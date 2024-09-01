const { ethers } = require("ethers");
import { Connection, clusterApiUrl } from '@solana/web3.js';
import Web3Modal from 'web3modal';

// Function to connect wallet, supporting both Phantom (for Solana) and MetaMask (for Ethereum)
export const connectWallet = async (
  setWalletAddress: (address: string | null) => void,
  setProvider: (provider: any) => void
) => {
  const { solana } = window as any;

  if (solana && solana.isPhantom) {
    // Connecting to Phantom wallet for Solana
    try {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      console.log('Connected to Backpack:', response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  } else {
    // Connecting to MetaMask wallet for Ethereum
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      const address = await ethersProvider.getSigner().getAddress();
      setWalletAddress(address);
      setProvider(ethersProvider);
      console.log('Connected to MetaMask:', address);
    } catch (error) {
      console.error('Error connecting to MetaMask wallet:', error);
    }
  }
};

// Function to disconnect the wallet
export const disconnectWallet = (
  setWalletAddress: (address: string | null) => void,
  setProvider: (provider: any) => void
) => {
  // Clear wallet address and provider state
  setWalletAddress(null);
  setProvider(null);
  console.log('Disconnected wallet');
};
