import React from 'react';
import Head from 'next/head';
import WalletConnector from './WalletConnector';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>DeFi App</title>
        <meta name="description" content="A decentralized finance application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <WalletConnector />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} DeFi App. All rights reserved.</p>
      </footer>
      <style jsx>{`
        header {
          background-color: #282c34;
          padding: 1rem;
          color: white;
          text-align: center;
        }
        footer {
          background-color: #282c34;
          padding: 1rem;
          color: white;
          text-align: center;
          position: fixed;
          width: 100%;
          bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default Layout;
