import { ethers } from 'ethers';

const testEthers = () => {
  console.log('ethers:', ethers);
  try {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    console.log('Provider created:', provider);
  } catch (error) {
    console.error('Error creating provider:', error);
  }
};

testEthers();
