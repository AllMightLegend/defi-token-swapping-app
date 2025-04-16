"use client"; // This ensures the component is treated as a client component
import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { approveToken } from '../utils/approval';
import { executeSwap } from '../utils/swap';
import Layout from '../components/Layout';
import { ethers } from 'ethers'; // Ensure proper import from ethers
import styles from '../styles/Home.module.css';
import FuzzyText from '../components/FuzzyText';

const IndexPage: React.FC = () => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [fromToken, setFromToken] = useState<string>('ETH');
  const [toToken, setToToken] = useState<string>('DAI');
  const [amount, setAmount] = useState<string>('1');
  const [swapResult, setSwapResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSwap = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setIsProcessing(true);
      const swapTx = await executeSwap(fromToken, toToken, amount, provider);
      setSwapResult(`SWAP_SUCCESS: TX_HASH=${swapTx.hash}`);
    } catch (error) {
      console.error('Swap failed:', error);
      setSwapResult('ERROR: SWAP_FAILED');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    const spenderAddress = '0xYourSpenderAddress'; // Replace with actual spender address

    try {
      setIsProcessing(true);
      const approvalTx = await approveToken(fromToken, spenderAddress, amount, provider);
      setSwapResult(`APPROVAL_SUCCESS: TX_HASH=${approvalTx.hash}`);
    } catch (error) {
      console.error('Approval failed:', error);
      setSwapResult('ERROR: APPROVAL_FAILED');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout setWalletAddress={setWalletAddress} setProvider={setProvider}>
      <div className={styles.terminalContainer}>
        <div className={styles.terminalHeader}>
          <pre>
            {`
╔════════════════════════════════╗
║      TOKEN SWAP TERMINAL       ║
╚════════════════════════════════╝

> INITIALIZING_SWAP_MODULE.exe
> READY_FOR_INPUT_
            `}
          </pre>
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <label className={styles.terminalLabel}>
                <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
                  {`> FROM_TOKEN:`}
                </FuzzyText>
              </label>
              <div className={styles.inputWrapper}>
                <select 
                  value={fromToken} 
                  onChange={(e) => setFromToken(e.target.value)}
                  className={styles.terminalSelect}
                >
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="BTC">BTC</option>
                  <option value="DAI">DAI</option>
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={styles.terminalInput}
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className={styles.terminalDivider}>
              <pre>{`
┌────────────────────────────────┐
│      CALCULATING ROUTE...      │
└────────────────────────────────┘`}</pre>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.terminalLabel}>
                <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
                  {`> TO_TOKEN:`}
                </FuzzyText>
              </label>
              <div className={styles.inputWrapper}>
                <select 
                  value={toToken} 
                  onChange={(e) => setToToken(e.target.value)}
                  className={styles.terminalSelect}
                >
                  <option value="ETH">ETH</option>
                  <option value="SOL">SOL</option>
                  <option value="BTC">BTC</option>
                  <option value="DAI">DAI</option>
                </select>
                <input
                  type="text"
                  value={amount ? (parseFloat(amount) * 1.02).toFixed(4) : ''}
                  readOnly
                  className={styles.terminalInput}
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              onClick={handleApprove} 
              className={styles.terminalButton}
              disabled={isProcessing}
            >
              <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
                {`> APPROVE_TOKEN`}
              </FuzzyText>
            </button>
            <button 
              onClick={handleSwap} 
              className={styles.terminalButton}
              disabled={isProcessing}
            >
              <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
                {`> EXECUTE_SWAP`}
              </FuzzyText>
            </button>
          </div>

          {isProcessing && (
            <div className={styles.processingOverlay}>
              <pre className={styles.terminalText}>
                {`
╔════════════════════════════════╗
║      PROCESSING REQUEST...     ║
║      PLEASE STAND BY...       ║
╚════════════════════════════════╝
                `}
              </pre>
            </div>
          )}

          {swapResult && (
            <div className={styles.terminalFooter}>
              <pre>
                {`
┌────────────────────────────────┐
│ STATUS: ${swapResult}
└────────────────────────────────┘
> _
                `}
              </pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
