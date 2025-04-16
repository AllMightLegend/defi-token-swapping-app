import React, { useState } from 'react';
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import styles from '../styles/Layout.module.css';
import FuzzyText from './FuzzyText';

interface WalletConnectorProps {
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | null>>;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ setWalletAddress, setProvider }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setLocalWalletAddress] = useState<string | null>(null);
  const [localProvider, setLocalProvider] = useState<Web3Provider | null>(null);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: "YOUR_INFURA_PROJECT_ID"
      });

      await walletConnectProvider.enable();
      const provider = new Web3Provider(walletConnectProvider);
      setLocalProvider(provider);
      setProvider(provider);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setLocalWalletAddress(address);
      setWalletAddress(address);
    } catch (error) {
      console.error('Error connecting to WalletConnect wallet:', error);
      setLocalWalletAddress(null);
      setWalletAddress(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (localProvider) {
      try {
        const walletConnectProvider = localProvider.provider as any as WalletConnectProvider;
        await walletConnectProvider.disconnect();
        setLocalWalletAddress(null);
        setWalletAddress(null);
        setLocalProvider(null);
        setProvider(null);
      } catch (error) {
        console.error('Error disconnecting from WalletConnect wallet:', error);
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={styles.walletContainer}>
      {isConnecting && (
        <div className={styles.connectingOverlay}>
          <pre className={styles.terminalText}>
            {`
╔════════════════════════════════╗
║    ESTABLISHING CONNECTION     ║
║      PLEASE STAND BY...       ║
╚════════════════════════════════╝

[${'.'.repeat(Math.floor(Date.now() / 500) % 20)}${' '.repeat(20 - Math.floor(Date.now() / 500) % 20)}]

> CONNECTING TO WALLET...
> AWAITING AUTHORIZATION...
            `}
          </pre>
        </div>
      )}

      <div className={styles.terminalBox}>
        {walletAddress ? (
          <div className={styles.walletInfo}>
            <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
              {`> WALLET: ${formatAddress(walletAddress)}`}
            </FuzzyText>
            <button
              className={styles.terminalButton}
              onClick={disconnectWallet}
            >
              <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
                {`> DISCONNECT`}
              </FuzzyText>
            </button>
          </div>
        ) : (
          <button
            className={styles.terminalButton}
            onClick={connectWallet}
            disabled={isConnecting}
          >
            <FuzzyText fontSize="1.5rem" color="#00FF00" baseIntensity={0.2}>
              {`> CONNECT_WALLET.exe`}
            </FuzzyText>
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnector;
