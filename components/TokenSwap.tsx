import React, { useState, useEffect } from 'react';
import { executeSwap } from '../utils/swap';
import { Web3Provider } from '@ethersproject/providers';
import styles from '../styles/Layout.module.css';
import FuzzyText from './FuzzyText';

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>('ETH');
  const [toToken, setToToken] = useState<string>('DAI');
  const [amount, setAmount] = useState<string>('');
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapProgress, setSwapProgress] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error('MetaMask not detected');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSwapping) {
      interval = setInterval(() => {
        setSwapProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    } else {
      setSwapProgress(0);
    }
    return () => clearInterval(interval);
  }, [isSwapping]);

  const handleSwap = async () => {
    if (!provider) {
      alert('Web3 provider not found. Please install MetaMask.');
      return;
    }

    try {
      setIsSwapping(true);
      await executeSwap(fromToken, toToken, amount, provider);
      alert('Swap successful!');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
      setSwapProgress(0);
    }
  };

  const getProgressBar = () => {
    const total = 20;
    const filled = Math.floor((swapProgress / 100) * total);
    return `[${'='.repeat(filled)}${' '.repeat(total - filled)}] ${swapProgress}%`;
  };

  return (
    <div className={styles.swapContainer}>
      <div className={styles.terminalHeader}>
        <pre className={styles.terminalPrompt}>
          {`
╔════════════════════════════════╗
║        TOKEN SWAP MODULE       ║
╚════════════════════════════════╝

> INITIALIZING_SWAP.exe
> CHECKING_LIQUIDITY_POOLS...
> READY_FOR_INPUT_
          `}
        </pre>
      </div>

      <div className={styles.swapInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.terminalLabel}>
            <FuzzyText fontSize="1rem" color="#00FF00" baseIntensity={0.1}>
              {`> FROM_TOKEN:`}
            </FuzzyText>
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className={styles.amountInput}
            />
            <select 
              value={fromToken} 
              onChange={(e) => setFromToken(e.target.value)}
              className={styles.tokenSelect}
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="BTC">BTC</option>
            </select>
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
            <FuzzyText fontSize="1rem" color="#00FF00" baseIntensity={0.1}>
              {`> TO_TOKEN:`}
            </FuzzyText>
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={amount ? (parseFloat(amount) * 1.02).toFixed(4) : ''}
              readOnly
              placeholder="0.0"
              className={styles.amountInput}
            />
            <select 
              value={toToken} 
              onChange={(e) => setToToken(e.target.value)}
              className={styles.tokenSelect}
            >
              <option value="DAI">DAI</option>
              <option value="USDC">USDC</option>
              <option value="WBTC">WBTC</option>
            </select>
          </div>
        </div>
      </div>

      {isSwapping && (
        <div className={styles.swappingOverlay}>
          <pre className={styles.terminalText}>
            {`
╔════════════════════════════════╗
║      EXECUTING SWAP...         ║
║      ${getProgressBar()}       ║
║      PLEASE STANDBY...        ║
╚════════════════════════════════╝
            `}
          </pre>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          className={styles.swapButton}
          onClick={handleSwap}
          disabled={isSwapping || !amount}
        >
          <FuzzyText fontSize="1rem" color="#00FF00" baseIntensity={0.1}>
            {isSwapping ? '> PROCESSING...' : '> EXECUTE_SWAP'}
          </FuzzyText>
        </button>
      </div>

      <div className={styles.terminalFooter}>
        <pre className={styles.terminalPrompt}>
          {`
┌────────────────────────────────┐
│ STATUS: ${isSwapping ? 'PROCESSING' : 'READY'}
│ ROUTE: ${fromToken} -> ${toToken}
│ SLIPPAGE: 2.00%
└────────────────────────────────┘
> _
          `}
        </pre>
      </div>
    </div>
  );
};

export default TokenSwap;
