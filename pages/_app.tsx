// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import FuzzyText from '../components/FuzzyText';

function MyApp({ Component, pageProps }: AppProps) {
  const [bootSequence, setBootSequence] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootSteps = [
      'INITIALIZING SYSTEM...',
      'LOADING DEFI MODULES...',
      'CHECKING BLOCKCHAIN CONNECTION...',
      'ESTABLISHING SECURE CHANNEL...',
      'TERMINAL READY'
    ];

    let currentStep = 0;
    const bootInterval = setInterval(() => {
      if (currentStep < bootSteps.length - 1) {
        setBootSequence(prev => prev + 1);
        currentStep++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setIsBooting(false), 1000);
      }
    }, 800);

    return () => clearInterval(bootInterval);
  }, []);

  const getBootMessage = () => {
    const bootSteps = [
      'INITIALIZING SYSTEM...',
      'LOADING DEFI MODULES...',
      'CHECKING BLOCKCHAIN CONNECTION...',
      'ESTABLISHING SECURE CHANNEL...',
      'TERMINAL READY'
    ];
    return bootSteps[bootSequence] || bootSteps[0];
  };

  if (isBooting) {
    return (
      <div className="boot-screen">
        <pre className="boot-sequence">
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
        <style jsx>{`
          .boot-screen {
            background: #000;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'VT323', monospace;
            color: #00FF00;
            padding: 2rem;
          }

          .boot-sequence {
            white-space: pre;
            line-height: 1.5;
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          .boot-sequence::after {
            content: '█';
            animation: blink 1s steps(1) infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>DEFI TERMINAL v1.0</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Retro-style decentralized finance terminal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="terminal-container">
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background: #000;
            color: #00FF00;
            font-family: 'VT323', monospace;
            line-height: 1.6;
            overflow-x: hidden;
          }

          /* CRT screen effect */
          .terminal-container {
            min-height: 100vh;
            position: relative;
          }

          .terminal-container::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(
                rgba(0, 255, 0, 0.03) 50%, 
                rgba(0, 0, 0, 0.1) 50%
              ),
              linear-gradient(
                90deg,
                rgba(0, 255, 0, 0.04),
                rgba(0, 255, 0, 0.04) 3px,
                transparent 3px
              );
            background-size: 100% 2px, 4px 100%;
            pointer-events: none;
            z-index: 2;
          }

          @keyframes flicker {
            0% { opacity: 0.97; }
            5% { opacity: 0.95; }
            10% { opacity: 0.9; }
            15% { opacity: 0.95; }
            20% { opacity: 0.98; }
            25% { opacity: 0.95; }
            30% { opacity: 0.9; }
            35% { opacity: 0.95; }
            40% { opacity: 0.98; }
            45% { opacity: 0.95; }
            50% { opacity: 0.9; }
            55% { opacity: 0.95; }
            60% { opacity: 0.98; }
            65% { opacity: 0.95; }
            70% { opacity: 0.9; }
            75% { opacity: 0.95; }
            80% { opacity: 0.98; }
            85% { opacity: 0.95; }
            90% { opacity: 0.9; }
            95% { opacity: 0.95; }
            100% { opacity: 0.98; }
          }

          body {
            animation: flicker 0.15s infinite;
          }

          * {
            box-sizing: border-box;
          }

          ::-webkit-scrollbar {
            width: 10px;
            background: #000;
          }

          ::-webkit-scrollbar-thumb {
            background: #00FF00;
            border: 1px solid #000;
          }

          ::selection {
            background: #00FF00;
            color: #000;
          }
        `}</style>
      </div>
    </>
  );
}

export default MyApp;
