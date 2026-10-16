import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ContractConfigurator } from './components/ContractConfigurator';
import { TerminalGitGuide } from './components/TerminalGitGuide';
import { RemixWalkthrough } from './components/RemixWalkthrough';
import { NetworkAndFaucets } from './components/NetworkAndFaucets';
import { TokenImportGuide } from './components/TokenImportGuide';
import { DeploymentChecklist } from './components/DeploymentChecklist';
import { EducationalNotice } from './components/EducationalNotice';
import { TokenConfig } from './types';
import { connectWallet, isEthereumAvailable } from './utils/web3Helper';
import { Code2, GitBranch, Compass, Layers, Wallet, CheckSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('contract');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    name: 'Atlas Educational Token',
    symbol: 'ATLAS',
    decimals: 18,
    initialSupply: '5000000000000',
    burnable: true,
    ownable: true,
    pausable: false
  });

  const checkInitialWalletState = useCallback(async () => {
    if (isEthereumAvailable() && window.ethereum) {
      try {
        const accounts = (await window.ethereum.request({ method: 'eth_accounts' })) as string[];
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          const currentChainHex = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
          setChainId(parseInt(currentChainHex, 16));
        }
      } catch {
        // Quietly fail if user hasn't authorized
      }
    }
  }, []);

  useEffect(() => {
    checkInitialWalletState();

    if (isEthereumAvailable() && window.ethereum?.on) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        setWalletAddress(accs.length > 0 ? accs[0] : null);
      };

      const handleChainChanged = (chainHex: unknown) => {
        setChainId(parseInt(chainHex as string, 16));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [checkInitialWalletState]);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      setConnectError(null);
      const res = await connectWallet();
      if (res) {
        setWalletAddress(res.address);
        setChainId(res.chainId);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setConnectError(e.message || 'Failed to connect MetaMask wallet.');
      setTimeout(() => setConnectError(null), 4000);
    } finally {
      setIsConnecting(false);
    }
  };

  const tabs = [
    { id: 'contract', label: '1. Solidity Contract', icon: Code2 },
    { id: 'git', label: '2. Terminal & Git', icon: GitBranch },
    { id: 'remix', label: '3. Remix IDE Walkthrough', icon: Compass },
    { id: 'networks', label: '4. Networks & Faucets', icon: Layers },
    { id: 'wallet', label: '5. Wallet Custom Token Import', icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        walletAddress={walletAddress}
        chainId={chainId}
        onConnectWallet={handleConnectWallet}
        isConnecting={isConnecting}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
        {/* Hero Banner */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>ETHEREUM SEPOLIA (CHAIN ID: 11155111)</span>
            <span>·</span>
            <span>BASE SEPOLIA (CHAIN ID: 84532)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white max-w-3xl">
            Educational ERC-20 Deployment Studio
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            A comprehensive, safe developer guide for authoring, compiling, and deploying a high-supply
            (5,000,000,000,000 tokens) standard ERC-20 contract to Ethereum Sepolia and Base Sepolia testnets
            using OpenZeppelin v5, Remix IDE, and MetaMask.
          </p>
        </div>

        {connectError && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-200 rounded-lg">
            {connectError}
          </div>
        )}

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div>
          {activeTab === 'contract' && (
            <ContractConfigurator config={tokenConfig} setConfig={setTokenConfig} />
          )}

          {activeTab === 'git' && <TerminalGitGuide />}

          {activeTab === 'remix' && <RemixWalkthrough />}

          {activeTab === 'networks' && (
            <NetworkAndFaucets
              currentChainId={chainId}
              onRefreshChain={checkInitialWalletState}
            />
          )}

          {activeTab === 'wallet' && (
            <TokenImportGuide defaultSymbol={tokenConfig.symbol} />
          )}
        </div>

        {/* Deployment Progress Checklist Section */}
        <div className="pt-4">
          <DeploymentChecklist />
        </div>
      </main>

      <EducationalNotice />
    </div>
  );
}
