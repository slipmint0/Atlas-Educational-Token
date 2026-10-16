import { NETWORKS } from '../data/networks';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
      on?: (eventName: string, handler: (...args: unknown[]) => void) => void;
      removeListener?: (eventName: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}

export function isEthereumAvailable(): boolean {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

export async function connectWallet(): Promise<{ address: string; chainId: number } | null> {
  if (!window.ethereum) {
    throw new Error('No Web3 wallet detected. Please install MetaMask or Trust Wallet extension.');
  }

  const accounts = (await window.ethereum.request({
    method: 'eth_requestAccounts'
  })) as string[];

  const chainIdHex = (await window.ethereum.request({
    method: 'eth_chainId'
  })) as string;

  return {
    address: accounts[0] || '',
    chainId: parseInt(chainIdHex, 16)
  };
}

export async function switchNetwork(networkKey: 'sepolia' | 'baseSepolia'): Promise<void> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed.');
  }

  const network = NETWORKS[networkKey];

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainIdHex }]
    });
  } catch (switchError: unknown) {
    // 4902 code indicates chain has not been added to MetaMask yet
    const errorObj = switchError as { code?: number; message?: string };
    if (errorObj?.code === 4902 || errorObj?.message?.includes('Unrecognized chain ID')) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: network.chainIdHex,
            chainName: network.displayName,
            nativeCurrency: {
              name: network.currencyName,
              symbol: network.currencySymbol,
              decimals: 18
            },
            rpcUrls: [network.rpcUrl, network.fallbackRpcUrl],
            blockExplorerUrls: [network.blockExplorerUrl]
          }
        ]
      });
    } else {
      throw switchError;
    }
  }
}

export async function watchAssetInMetaMask(
  contractAddress: string,
  symbol: string,
  decimals: number = 18
): Promise<boolean> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed.');
  }

  const result = (await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: contractAddress,
        symbol: symbol.slice(0, 11), // MetaMask limits symbol to 11 chars
        decimals: decimals
      }
    } as unknown as unknown[]
  })) as boolean;

  return result;
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatWeiSupply(supply: string, decimals: number = 18): string {
  try {
    const rawNumber = BigInt(supply.replace(/,/g, ''));
    const multiplier = 10n ** BigInt(decimals);
    const weiTotal = rawNumber * multiplier;
    return weiTotal.toString();
  } catch {
    return '0';
  }
}
