# BTLTC Token Deployment Guide

This repository now includes a separate ERC-20 token contract: `contracts/BTLTC.sol`.

## Token details
- Name: BTLTC
- Symbol: BTLTC
- Decimals: 18
- Initial supply: 10,000,000,000 BTLTC
- Owner: the deployer wallet
- Features: Ownable, mintable by owner, burnable by holder

## 1) Install dependencies

If you have not already installed the repo dependencies:

```bash
npm install
```

## 2) Configure environment

Update `.env` using the existing `.env.example` template:

```bash
cp .env.example .env
```

Then add:

```env
SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/your-key"
PRIVATE_KEY="0xYOUR_PRIVATE_KEY"
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
```

## 3) Compile the token contract

```bash
npx hardhat compile
```

## 4) Deploy to Sepolia testnet

```bash
npx hardhat run scripts/deploy-btlc.js --network sepolia
```

## 5) Verify the contract on Etherscan

After deployment, you can verify the contract with:

```bash
npx hardhat verify --network sepolia <TOKEN_CONTRACT_ADDRESS> "BTLTC" "BTLTC" 10000000000000000000000000000
```

The constructor arguments are:
1. `"BTLTC"` — token name
2. `"BTLTC"` — token symbol
3. `10000000000000000000000000000` — 10,000,000,000 * 10^18 raw supply

## Notes
- This is a standard ERC-20 token for a testnet deployment.
- The token is controlled by the wallet that deploys it.
- If you want a different symbol, a tax model, or a locked supply model, the contract can be adjusted.
