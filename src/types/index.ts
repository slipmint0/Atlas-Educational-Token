export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string; // e.g. "5000000000000"
  burnable: boolean;
  ownable: boolean;
  pausable: boolean;
}

export interface NetworkInfo {
  id: string;
  name: string;
  displayName: string;
  chainId: number;
  chainIdHex: string;
  rpcUrl: string;
  fallbackRpcUrl: string;
  currencySymbol: string;
  currencyName: string;
  blockExplorerUrl: string;
  blockExplorerName: string;
  faucets: FaucetInfo[];
  description: string;
  layer: 'Layer 1 Testnet' | 'Layer 2 Rollup Testnet';
  averageBlockTime: string;
}

export interface FaucetInfo {
  name: string;
  url: string;
  provider: string;
  requiresAuth: boolean;
  notes: string;
  payoutAmount: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'prep' | 'code' | 'compile' | 'deploy' | 'verify';
}
