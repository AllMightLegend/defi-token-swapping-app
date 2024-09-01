// components/Layout.tsx
import React from 'react';
import Head from 'next/head';
import WalletConnector from './WalletConnector';
import styles from '../styles/Layout.module.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>DeFi App</title>
        <meta name="description" content="A decentralized finance application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>🚀 DeFi App</div>
        <WalletConnector />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} DeFi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
