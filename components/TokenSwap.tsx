import React, { useState, useEffect } from 'react'; // Import useEffect
import { executeSwap } from '../utils/swap';
import { Web3Provider } from '@ethersproject/providers';

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>('ETH');
  const [toToken, setToToken] = useState<string>('DAI');
  const [amount, setAmount] = useState<string>('');
  const [provider, setProvider] = useState<Web3Provider | null>(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error('MetaMask not detected');
    }
  }, []);

  const handleSwap = async () => {
    if (!provider) {
      alert('Web3 provider not found. Please install MetaMask.');
      return;
    }

    try {
      await executeSwap(fromToken, toToken, amount, provider);
      alert('Swap successful!');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="SOL">SOL</option>
        <option value="BTC">BTC</option>
      </select>
      <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
        <option value="DAI">DAI</option>
        <option value="USDC">USDC</option>
        <option value="WBTC">WBTC</option>
      </select>
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};

export default TokenSwap;
