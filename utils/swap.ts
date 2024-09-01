 // Import everything from ethers
import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
const { ethers } = require("ethers");
const SWAP_API_URL = 'https://api.0x.org/swap/v1/quote';

export const executeSwap = async (
  fromToken: string,
  toToken: string,
  amount: string,
  provider: Web3Provider // Use Web3Provider from ethers
) => {
  const walletAddress = await provider.getSigner().getAddress();

  try {
    const response = await axios.get(SWAP_API_URL, {
      params: {
        buyToken: toToken,
        sellToken: fromToken,
        sellAmount: ethers.parseUnits(amount, 18).toString(), // Correctly access parseUnits
        takerAddress: walletAddress,
      },
    });

    const { to, data, value } = response.data;

    const tx = {
      to,
      data,
      value: ethers.BigNumber.from(value).toHexString(), // Correctly access BigNumber
      from: walletAddress,
    };

    const transactionResponse = await provider.getSigner().sendTransaction(tx);
    await transactionResponse.wait();

    return transactionResponse;
  } catch (error) {
    console.error('Swap failed:', error);
    throw new Error('Swap failed');
  }
};
