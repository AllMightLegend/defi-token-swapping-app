// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="app-container">
        <header className="header">
          <h1>DeFi Token Swapping App</h1>
        </header>
        <main className="main-content">
          <Component {...pageProps} />
        </main>
        <footer className="footer">
          <p>© 2024 DeFi Token Swapping. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
