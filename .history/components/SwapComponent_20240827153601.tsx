import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const SwapComponent: React.FC = () => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('0');
  const [quote, setQuote] = useState<any>(null);

  const handleQuoteFetch = async () => {
    try {
      const response = await axios.get(`https://api.0x.org/swap/v1/quote`, {
        params: {
          buyToken: toToken,
          sellToken: fromToken,
          sellAmount: ethers.utils.parseUnits(amount, 18).toString(),
        },
      });
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleSwap = async () => {
    if (!quote) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txResponse = await signer.sendTransaction({
        to: quote.to,
        data: quote.data,
        value: ethers.BigNumber.from(quote.value),
        gasLimit: ethers.BigNumber.from(quote.gas),
        gasPrice: ethers.BigNumber.from(quote.gasPrice),
      });
      await txResponse.wait();
      alert('Swap executed successfully');
    } catch (error) {
      console.error('Swap execution error:', error);
      alert('Swap execution failed');
    }
  };

  return (
    <div>
      <h2>Token Swap</h2>
      <div>
        <label>
          From Token:
          <input
            type="text"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            placeholder="0x Token Address"
          />
        </label>
      </div>
      <div>
        <label>
          To Token:
          <input
            type="text"
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            placeholder="0x Token Address"
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleQuoteFetch}>Get Quote</button>

      {quote && (
        <div>
          <h3>Quote Details</h3>
          <p>Buy Amount: {ethers.utils.formatUnits(quote.buyAmount, 18)}</p>
          <button onClick={handleSwap}>Swap</button>
        </div>
      )}
    </div>
  );
};

export default SwapComponent;
