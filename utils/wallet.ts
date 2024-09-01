import { ethers } from 'ethers';
import { Connection, clusterApiUrl } from '@solana/web3.js';

export const connectWallet = async (setWalletAddress: (address: string | null) => void, setProvider: (provider: any) => void) => {
  const { solana } = window as any;

  if (solana && solana.isPhantom) {
    try {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      console.log('Connected to Backpack:', response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Backpack wallet:', error);
    }
  } else {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(instance);
      const address = await ethersProvider.getSigner().getAddress();
      setWalletAddress(address);
      setProvider(ethersProvider);
    } catch (error) {
      console.error('Error connecting to MetaMask wallet:', error);
    }
  }
};

export const disconnectWallet = (setWalletAddress: (addre
