"use client"; // This ensures the component is treated as a client component
import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { approveToken } from '../utils/approval';
import { executeSwap } from '../utils/swap';
import Layout from '../components/Layout';
import { ethers } from 'ethers'; // Ensure proper import from ethers
import styles from '../styles/Home.module.css';

const IndexPage: React.FC = () => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
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
    <Layout setWalletAddress={setWalletAddress} setProvider={setProvider}>
      <div className={styles.container}>
        <div className={styles.swapSection}>
          <h2 className={styles.heading}>Swap Tokens</h2>
          <div className={styles.formGroup}>
            <label>From Token:</label>
            <select value={fromToken} onChange={(e) => setFromToken(e.target.value)} className={styles.select}>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="DAI">Dai (DAI)</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>To Token:</label>
            <select value={toToken} onChange={(e) => setToToken(e.target.value)} className={styles.select}>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="DAI">Dai (DAI)</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={handleApprove} className={styles.button}>
              Approve
            </button>
            <button onClick={handleSwap} className={styles.button}>
              Swap
            </button>
          </div>
          {swapResult && <p className={styles.result}>{swapResult}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
