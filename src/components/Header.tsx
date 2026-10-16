import React from 'react';
import { Wallet, Check } from 'lucide-react';
import { truncateAddress } from '../utils/web3Helper';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletAddress: string | null;
  chainId: number | null;
  onConnectWallet: () => void;
  isConnecting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  walletAddress,
  chainId,
  onConnectWallet,
  isConnecting
}) => {
  const navLinks = [
    { id: 'contract', label: 'Contract Code' },
    { id: 'git', label: 'Git & GitHub' },
    { id: 'remix', label: 'Remix Guide' },
    { id: 'networks', label: 'Networks & Faucets' },
    { id: 'wallet', label: 'Wallet Import' }
  ];

  const getNetworkBadge = () => {
    if (!chainId) return null;
    if (chainId === 11155111) return 'Sepolia';
    if (chainId === 84532) return 'Base Sepolia';
    return `Chain ${chainId}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block"></span>
          Web3 Deploy Studio
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === link.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {walletAddress ? (
            <button
              onClick={onConnectWallet}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors whitespace-nowrap shrink-0"
              title="Click to reconnect or refresh account"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{truncateAddress(walletAddress)}</span>
              {getNetworkBadge() && (
                <span className="text-slate-400 text-[11px]">
                  ({getNetworkBadge()})
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={onConnectWallet}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
