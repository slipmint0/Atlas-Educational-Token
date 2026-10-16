import { NetworkInfo } from '../types';

export const NETWORKS: Record<'sepolia' | 'baseSepolia', NetworkInfo> = {
  sepolia: {
    id: 'sepolia',
    name: 'Sepolia',
    displayName: 'Ethereum Sepolia Testnet',
    chainId: 11155111,
    chainIdHex: '0xaa36a7',
    rpcUrl: 'https://rpc.sepolia.org',
    fallbackRpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    currencySymbol: 'SEP',
    currencyName: 'Sepolia Ether',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    blockExplorerName: 'Etherscan (Sepolia)',
    layer: 'Layer 1 Testnet',
    averageBlockTime: '~12 seconds',
    description: 'The primary Proof-of-Stake testnet recommended by the Ethereum Foundation for application and contract testing.',
    faucets: [
      {
        name: 'Google Cloud Web3 Faucet',
        url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
        provider: 'Google Cloud',
        requiresAuth: false,
        notes: 'Fastest official faucet. No mainnet balance required.',
        payoutAmount: '0.05 Sepolia ETH / day'
      },
      {
        name: 'Alchemy Sepolia Faucet',
        url: 'https://sepoliafaucet.com',
        provider: 'Alchemy',
        requiresAuth: true,
        notes: 'Requires free Alchemy account; requires 0.001 ETH on Ethereum mainnet.',
        payoutAmount: '0.5 Sepolia ETH / day'
      },
      {
        name: 'QuickNode Sepolia Faucet',
        url: 'https://faucet.quicknode.com/ethereum/sepolia',
        provider: 'QuickNode',
        requiresAuth: false,
        notes: 'Quick claim; optional multiplier if sharing on X/Twitter.',
        payoutAmount: '0.05 - 0.1 Sepolia ETH / day'
      },
      {
        name: 'Sepolia PoW Faucet',
        url: 'https://sepolia-faucet.pk910.de',
        provider: 'Community (pk910)',
        requiresAuth: false,
        notes: 'Proof-of-work browser miner; mine your own testnet ETH with zero account requirements.',
        payoutAmount: 'Up to 2.5 Sepolia ETH'
      }
    ]
  },
  baseSepolia: {
    id: 'baseSepolia',
    name: 'Base Sepolia',
    displayName: 'Base Sepolia Testnet',
    chainId: 84532,
    chainIdHex: '0x14a34',
    rpcUrl: 'https://sepolia.base.org',
    fallbackRpcUrl: 'https://base-sepolia-rpc.publicnode.com',
    currencySymbol: 'ETH',
    currencyName: 'Ether',
    blockExplorerUrl: 'https://sepolia.basescan.org',
    blockExplorerName: 'Basescan (Base Sepolia)',
    layer: 'Layer 2 Rollup Testnet',
    averageBlockTime: '~2 seconds',
    description: 'Coinbase-incubated Ethereum Layer-2 testnet powered by the OP Stack. Gas costs are ultra-low fractions of a cent.',
    faucets: [
      {
        name: 'Superchain Faucet (Optimism & Base)',
        url: 'https://console.optimism.io/faucet',
        provider: 'OP Stack / Base',
        requiresAuth: true,
        notes: 'Sign in with GitHub. Grants 0.05 Base Sepolia ETH or up to 1 ETH with verification.',
        payoutAmount: '0.05 - 1.0 Base Sepolia ETH'
      },
      {
        name: 'Coinbase Developer Faucet',
        url: 'https://portal.cdp.coinbase.com/products/faucet',
        provider: 'Coinbase Developer Platform',
        requiresAuth: true,
        notes: 'Official Coinbase portal faucet for Base Sepolia developers.',
        payoutAmount: '0.1 Base Sepolia ETH / day'
      },
      {
        name: 'QuickNode Base Sepolia Faucet',
        url: 'https://faucet.quicknode.com/base/sepolia',
        provider: 'QuickNode',
        requiresAuth: false,
        notes: 'Instant claim directly into your wallet.',
        payoutAmount: '0.05 Base Sepolia ETH'
      },
      {
        name: 'Base Testnet Official Bridge',
        url: 'https://bridge.base.org/deposit',
        provider: 'Base Foundation',
        requiresAuth: false,
        notes: 'Bridge Sepolia ETH from Ethereum Sepolia directly into Base Sepolia in 1-2 minutes.',
        payoutAmount: 'Flexible (any Sepolia ETH balance)'
      }
    ]
  }
};
