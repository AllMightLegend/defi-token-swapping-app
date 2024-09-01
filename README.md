# Defi App: DeFi DApp Development

## Objective:
Develop a DeFi application that provides robust features for wallet connectivity, token swapping, and real-time visualization of cryptocurrency prices.


## Required Functionalities:

- ### Wallet Connection:
    Construct a UI component leveraging Web3 modal libraries to interface with Ethereum wallets via `MetaMask or WalletConnect`. This includes auto-detection of wallet presence, secure session establishment, and error management.

- ### Cryptocurrency Price Charting:
  - #### Basic Implementation:
    - Utilize any suitable charting library to construct interactive charts for displaying cryptocurrency prices. 
    - Fetch historical price data from APIs like `CoinGecko or CryptoCompare` to initially populate these charts.
    - Implement filters within the chart to allow users to view price data by `day`, `week`, and `month`, providing flexibility in data analysis and visualization.
  - ##### Bonus Implementation:
    - Implement websocket connections to the selected cryptocurrency data APIs, such as `CoinGecko or CryptoCompare`. Use these websocket connections for real-time data streaming to dynamically update the charts, reflecting live price changes.

- ### Token Swapping Mechanism:
    Integrate a decentralized exchange protocol API (such as `0x or Bungee`) to enable ERC-20 token swaps directly within the application. The functionality should include fetching and rendering dynamic exchange pair data, managing `ERC-20 token` approvals, executing swap transactions, and handling blockchain interactions with transaction signing.

- ## Tech Stack: 
    NextJS/React, Typescript.

## Technical Deliverables:

- A deployed prototype demonstrating the integration of wallet connectivity, on-chain token swapping, and live data charting
