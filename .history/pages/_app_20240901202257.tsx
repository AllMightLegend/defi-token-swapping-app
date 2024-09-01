// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [dynamicTitle, setDynamicTitle] = useState('🚀 DeFi Token Swapping App');

  // Update the title dynamically for a funky effect
  useEffect(() => {
    const titles = [
      '🚀 DeFi Token Swapping App',
      '💸 Swap Your Tokens with Ease!',
      '🪙 DeFi App - Swap, Earn, Repeat!',
    ];
    let index = 0;
    const titleInterval = setInterval(() => {
      setDynamicTitle(titles[index]);
      index = (index + 1) % titles.length;
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A funky decentralized finance application for token swapping!" />
        <link rel="icon" href="/funky-favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Pacifico', cursive;
              background: linear-gradient(135deg, #fc466b, #3f5efb);
              color: white;
            }
          `}
        </style>
      </Head>
      <div className="app-container">
        <header className="header">
          <h1 className="funky-title">DeFi Token Swapping App</h1>
        </header>
        <main className="main-content">
          <Component {...pageProps} />
        </main>
        <footer className="footer">
          <p>© 2024 DeFi Token Swapping. All rights reserved.</p>
        </footer>
        <style jsx>{`
          .header {
            background-color:  linear-gradient(135deg, #ff5f6d, #ffc371);
            padding: 1.5rem;
            text-align: center;
            color: #fff;
            animation: headerAnimation 5s infinite alternate;
          }

          .main-content {
            padding: 2rem;
          }

          .footer {
            background-color: #1e1e1e;
            padding: 1rem;
            text-align: center;
            color: #fff;
            border-top: 2px solid rgba(255, 255, 255, 0.2);
          }

          .funky-title {
            font-size: 2.5rem;
            color: #ffeb3b;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            margin: 0;
            animation: titlePulse 2s infinite;
          }

          @keyframes headerAnimation {
            from {
              background-color:  linear-gradient(135deg, #ff5f6d, #ffc371);
            }
            to {
              background-color:  linear-gradient(135deg, #ff5f6d, #ffc371);
            }
          }

          @keyframes titlePulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
              text-shadow: 3px 3px 10px rgba(255, 255, 0, 0.7);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default MyApp;
