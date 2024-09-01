import { utils, BigNumber } from '@ethersproject/utils';
import axios from 'axios';

const SWAP_API_URL = 'https://api.0x.org/swap/v1/quote';

export const executeSwap = async (fromToken: string, toToken: string, amount: string, provider: ethers.providers.Web3Provider) => {
  const walletAddress = await provider.getSigner().getAddress();

  try {
    const response = await axios.get(SWAP_API_URL, {
      params: {
        buyToken: toToken,
        sellToken: fromToken,
        sellAmount: ethers.utils.parseUnits(amount, 18).toString(),
        takerAddress: walletAddress,
      },
    });

    const { to, data, value } = response.data;

    const tx = {
      to,
      data,
      value: ethers.BigNumber.from(value).toHexString(),
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
