import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const SwapComponent: React.FC = () => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('0');
  const [fromTokenType, setFromTokenType] = useState('ETH'); // default to ETH
  const [toTokenType, setToTokenType] = useState('ETH'); // default to ETH
  const [quote, setQuote] = useState<any>(null);

  const handleQuoteFetch = async () => {
    let apiURL;
    switch (fromTokenType) {
      case 'ETH':
      case 'ERC20':
        apiURL = 'https://api.0x.org/swap/v1/quote';
        break;
      case 'SOL':
        apiURL = 'https://solana-api.xyz/quote'; // hypothetical Solana swap API
        break;
      case 'BTC':
        apiURL = 'https://btc-api.xyz/quote'; // hypothetical Bitcoin swap API
        break;
      // Add more cases for other token types
      default:
        throw new Error('Unsupported token type');
    }

    try {
      const response = await axios.get(apiURL, {
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl mb-4">Token Swap</h2>
      <div className="mb-4">
        <label className="block mb-2">From Token Type:</label>
        <select
          value={fromTokenType}
          onChange={(e) => setFromTokenType(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="ETH">Ethereum (ETH)</option>
          <option value="SOL">Solana (SOL)</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ERC20">ERC-20 Token</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">From Token:</label>
        <input
          type="text"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Token Address or Symbol"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">To Token Type:</label>
        <select
          value={toTokenType}
          onChange={(e) => setToTokenType(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="ETH">Ethereum (ETH)</option>
          <option value="SOL">Solana (SOL)</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ERC20">ERC-20 Token</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">To Token:</label>
        <input
          type="text"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Token Address or Symbol"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <button
        onClick={handleQuoteFetch}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
      >
        Get Quote
      </button>

      {quote && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Quote Details</h3>
          <p>Buy Amount: {ethers.utils.formatUnits(quote.buyAmount, 18)}</p>
          <button
            onClick={handleSwap}
            className="px-4 py-2 mt-2 bg-green-600 rounded hover:bg-green-700 transition duration-300"
          >
            Swap
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapComponent;
