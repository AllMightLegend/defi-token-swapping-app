"use client"; // This ensures the component is treated as a client component
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnector from '../components/WalletConnector';
import { approveToken } from '../utils/approval';
import { executeSwap } from '../utils/swap';
import Layout from '../components/Layout';

const IndexPage: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [fromToken, setFromToken] = useState<string>('ETH');
  const [toToken, setToToken] = useState<string>('DAI');
  const [amount, setAmount] = useState<string>('1');
  const [swapResult, setSwapResult] = useState<string | null>(null);

  const handleSwap = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      const swapTx = await executeSwap(fromToken, toToken, amount, provider);
      setSwapResult(`Swap successful: ${swapTx.hash}`);
    } catch (error) {
      console.error('Swap failed:', error);
      setSwapResult('Swap failed.');
    }
  };

  const handleApprove = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    const spenderAddress = '0xYourSpenderAddress'; // Replace with actual spender address

    try {
      const approvalTx = await approveToken(fromToken, spenderAddress, amount, provider);
      alert(`Approval successful: ${approvalTx.hash}`);
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed.');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        <h1>DeFi Token Swap</h1>
        <WalletConnector setWalletAddress={setWalletAddress} setProvider={setProvider} />

        <div style={{ marginTop: '2rem' }}>
          <h2>Swap Tokens</h2>
          <label>
            From Token:
            <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="DAI">Dai (DAI)</option>
            </select>
          </label>
          <label>
            To Token:
            <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="DAI">Dai (DAI)</option>
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <div>
            <button onClick={handleApprove} style={{ marginRight: '1rem' }}>
              Approve
            </button>
            <button onClick={handleSwap}>Swap</button>
          </div>

          {swapResult && <p>{swapResult}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
