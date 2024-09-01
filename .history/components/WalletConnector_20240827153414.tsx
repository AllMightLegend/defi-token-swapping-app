import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const WalletConnector: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "INFURA_ID", // Replace with your Infura Project ID
      },
    },
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const accounts = await provider.listAccounts();
    setAccount(accounts[0]);
  };

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnector;
