import React from 'react';
import Head from 'next/head';
import WalletConnector from './WalletConnector';
import styles from '../styles/Layout.module.css';
import { Web3Provider } from '@ethersproject/providers';

interface LayoutProps {
  children: React.ReactNode;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | null>>;
}

const Layout: React.FC<LayoutProps> = ({ children, setWalletAddress, setProvider }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>DeFi App</title>
        <meta name="description" content="A decentralized finance application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <WalletConnector setWalletAddress={setWalletAddress} setProvider={setProvider} />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} DeFi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
