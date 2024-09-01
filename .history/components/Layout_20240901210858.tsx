import React from 'react';
import Head from 'next/head';
import WalletConnector from './WalletConnector';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>DeFi App</title>
        <meta name="description" content="A decentralized finance application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <WalletConnector />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} DeFi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
