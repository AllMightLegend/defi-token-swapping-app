import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import WalletConnector from './WalletConnector';
import FuzzyText from './FuzzyText';
import styles from '../styles/Layout.module.css';
import { Web3Provider } from '@ethersproject/providers';

interface LayoutProps {
  children: React.ReactNode;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | null>>;
}

const Layout: React.FC<LayoutProps> = ({ children, setWalletAddress, setProvider }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState(0);

  useEffect(() => {
    const bootSteps = [
      'INITIALIZING SYSTEM...',
      'CHECKING MEMORY BLOCKS...',
      'LOADING DEFI MODULES...',
      'ESTABLISHING BLOCKCHAIN CONNECTION...',
      'SYSTEM READY'
    ];

    let currentStep = 0;
    const bootInterval = setInterval(() => {
      if (currentStep < bootSteps.length - 1) {
        setBootSequence(prev => prev + 1);
        currentStep++;
      } else {
        clearInterval(bootInterval);
        setIsLoading(false);
      }
    }, 500);

    return () => clearInterval(bootInterval);
  }, []);

  const getBootMessage = () => {
    const bootSteps = [
      'INITIALIZING SYSTEM...',
      'CHECKING MEMORY BLOCKS...',
      'LOADING DEFI MODULES...',
      'ESTABLISHING BLOCKCHAIN CONNECTION...',
      'SYSTEM READY'
    ];
    return bootSteps[bootSequence] || bootSteps[0];
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>DeFi Terminal</title>
        <meta name="description" content="A decentralized finance terminal application" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {isLoading ? (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingContent}>
            <pre className={styles.bootSequence}>
              {`
╔════════════════════════════════╗
║     DEFI TERMINAL OS v1.0      ║
╚════════════════════════════════╝

${getBootMessage()}
[${'='.repeat(bootSequence * 5)}${' '.repeat((4 - bootSequence) * 5)}] ${bootSequence * 25}%

Memory Check: OK
Blockchain Status: CONNECTING
Terminal Ready: ${bootSequence === 4 ? 'YES' : 'NO'}

Press any key to continue..._
              `}
            </pre>
          </div>
        </div>
      ) : (
        <>
          <header className={styles.header}>
            <div className={styles.terminalBar}>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalDot}></span>
              <span className={styles.terminalTitle}>DEFI_TERMINAL.exe</span>
            </div>
            <WalletConnector setWalletAddress={setWalletAddress} setProvider={setProvider} />
          </header>

          <div className={styles.titleContainer}>
            <FuzzyText
              fontSize="3rem"
              fontFamily="VT323"
              color="#00FF00"
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
            >
              DEFI TOKEN TERMINAL
            </FuzzyText>
          </div>

          <main className={styles.container}>
            <div className={styles.terminalWindow}>
              {children}
            </div>
          </main>

          <footer className={styles.footer}>
            <pre className={styles.terminalFooter}>
              {`
╔════════════════════════════════════════════╗
║  © ${new Date().getFullYear()} DEFI_TERMINAL v1.0.0  READY: OK  ║
║  MEM: 640K  BLOCKCHAIN: CONNECTED  STATUS: OK  ║
╚════════════════════════════════════════════╝
> _`}
            </pre>
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
