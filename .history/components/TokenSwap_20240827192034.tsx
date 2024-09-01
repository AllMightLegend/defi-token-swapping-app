import React, { useState } from 'react';
import { executeSwap } from '../utils/swap';

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('DAI');
  const [amount, setAmount] = useState('');

  const handleSwap = async () => {
    try {
      await executeSwap(fromToken, toToken, amount);
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
