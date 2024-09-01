const { ethers } = require("ethers");
import { Web3Provider } from '@ethersproject/providers';

export const approveToken = async (
  tokenAddress: string,
  spenderAddress: string,
  amount: string,
  provider: Web3Provider // Use Web3Provider from ethers
) => {
  const ERC20_ABI = [
    'function approve(address spender, uint256 amount) public returns (bool)',
  ];

  const signer = provider.getSigner(); // Get the signer from the provider
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI,signer);

  try {
    // Use ethers.utils from the ethers package
    const tx = await tokenContract.approve(spenderAddress, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Token approval failed:', error);
    throw new Error('Token approval failed');
  }
};
