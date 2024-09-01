import { ethers } from 'ethers';

export const approveToken = async (
  tokenAddress: string,
  spenderAddress: string,
  amount: string,
  provider: ethers.providers.Web3Provider
) => {
  const ERC20_ABI = [
    'function approve(address spender, uint256 amount) public returns (bool)',
  ];

  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

  try {
    const tx = await tokenContract.approve(spenderAddress, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Token approval failed:', error);
    throw new Error('Token approval failed');
  }
};
