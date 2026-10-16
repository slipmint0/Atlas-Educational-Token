import React, { useState } from 'react';
import { ExternalLink, Check, Copy, ArrowRightLeft, Droplets, Layers, ShieldCheck } from 'lucide-react';
import { NETWORKS } from '../data/networks';
import { switchNetwork, isEthereumAvailable } from '../utils/web3Helper';

interface NetworkAndFaucetsProps {
  currentChainId: number | null;
  onRefreshChain: () => void;
}

export const NetworkAndFaucets: React.FC<NetworkAndFaucetsProps> = ({ currentChainId, onRefreshChain }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<'sepolia' | 'baseSepolia'>('sepolia');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [switching, setSwitching] = useState(false);
  const [switchMessage, setSwitchMessage] = useState<string | null>(null);

  const activeNetworkData = NETWORKS[selectedNetwork];

  const handleCopyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleSwitchNetwork = async (networkKey: 'sepolia' | 'baseSepolia') => {
    if (!isEthereumAvailable()) {
      setSwitchMessage('No Web3 wallet detected. Please install MetaMask to switch networks.');
      setTimeout(() => setSwitchMessage(null), 4000);
      return;
    }

    try {
      setSwitching(true);
      setSwitchMessage(null);
      await switchNetwork(networkKey);
      onRefreshChain();
      setSwitchMessage(`Successfully switched to ${NETWORKS[networkKey].displayName}!`);
      setTimeout(() => setSwitchMessage(null), 3500);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setSwitchMessage(e.message || 'Failed to switch network.');
      setTimeout(() => setSwitchMessage(null), 4000);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              04. Networks & Official Faucets Guide
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Switch MetaMask between Ethereum Sepolia (L1) and Base Sepolia (L2),
              and obtain free testnet ETH from authorized faucets to cover deployment gas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSwitchNetwork('sepolia')}
              disabled={switching}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                currentChainId === 11155111
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {currentChainId === 11155111 ? '✓ Active: Sepolia' : 'Switch to Sepolia'}
            </button>
            <button
              onClick={() => handleSwitchNetwork('baseSepolia')}
              disabled={switching}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                currentChainId === 84532
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {currentChainId === 84532 ? '✓ Active: Base Sepolia' : 'Switch to Base Sepolia'}
            </button>
          </div>
        </div>

        {switchMessage && (
          <div className="mt-4 p-3 bg-cyan-950/50 border border-cyan-800 text-xs text-cyan-200 rounded-lg">
            {switchMessage}
          </div>
        )}
      </div>

      {/* Network Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setSelectedNetwork('sepolia')}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer ${
            selectedNetwork === 'sepolia'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Ethereum Sepolia (L1)</span>
          {currentChainId === 11155111 && (
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono">
              Connected
            </span>
          )}
        </button>

        <button
          onClick={() => setSelectedNetwork('baseSepolia')}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer ${
            selectedNetwork === 'baseSepolia'
              ? 'text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Base Sepolia (L2)</span>
          {currentChainId === 84532 && (
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono">
              Connected
            </span>
          )}
        </button>
      </div>

      {/* Network Specifications Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Network Technical Parameters (5 columns) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">{activeNetworkData.displayName}</h3>
              <p className="text-xs text-slate-400">{activeNetworkData.layer}</p>
            </div>
            <button
              onClick={() => handleSwitchNetwork(selectedNetwork)}
              disabled={switching}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>1-Click Switch</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">Chain ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-300 font-bold tabular-nums">
                  {activeNetworkData.chainId} ({activeNetworkData.chainIdHex})
                </span>
                <button
                  onClick={() => handleCopyText(activeNetworkData.chainId.toString(), 'chainId')}
                  className="text-slate-500 hover:text-white"
                >
                  {copiedKey === 'chainId' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">Currency Symbol:</span>
              <span className="text-white font-bold">{activeNetworkData.currencySymbol}</span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Public RPC Endpoint:</span>
                <button
                  onClick={() => handleCopyText(activeNetworkData.rpcUrl, 'rpc')}
                  className="text-slate-500 hover:text-white"
                >
                  {copiedKey === 'rpc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-slate-300 break-all text-[11px] font-mono">{activeNetworkData.rpcUrl}</div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Block Explorer:</span>
                <a
                  href={activeNetworkData.blockExplorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span className="text-[10px]">Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-slate-300 break-all text-[11px] font-mono">
                {activeNetworkData.blockExplorerUrl}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
              <span className="text-slate-400">Block Time:</span>
              <span className="text-emerald-400 font-bold">{activeNetworkData.averageBlockTime}</span>
            </div>
          </div>

          {/* Manual MetaMask Network Addition Guide */}
          <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-slate-200 block">
              How to enable testnets in MetaMask:
            </span>
            <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Click network picker at top left of MetaMask.</li>
              <li>Toggle on <strong className="text-slate-300">"Show test networks"</strong>.</li>
              <li>Select Sepolia directly, or click our 1-Click Switch button above.</li>
            </ol>
          </div>
        </div>

        {/* Official Faucets Directory (7 columns) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Official Faucets for {activeNetworkData.name}
                </h3>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Free Testnet ETH</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Deploying contracts requires gas fees. Testnet ETH has zero fiat value and is distributed free of charge
              to developers.
            </p>

            <div className="space-y-3 pt-2">
              {activeNetworkData.faucets.map((faucet, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{faucet.name}</span>
                      <span className="text-[10px] text-slate-400">· {faucet.provider}</span>
                    </div>
                    <p className="text-xs text-slate-400">{faucet.notes}</p>
                    <div className="text-[11px] font-mono text-cyan-300">
                      Amount: {faucet.payoutAmount}
                    </div>
                  </div>

                  <a
                    href={faucet.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Claim Free ETH</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {selectedNetwork === 'baseSepolia' && (
              <div className="p-4 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                <strong className="text-white block font-medium">Alternative: Bridge Sepolia ETH to Base Sepolia</strong>
                <p className="text-slate-400">
                  Already have Ethereum Sepolia ETH? You can bridge any amount to Base Sepolia in 60 seconds
                  using the official Base testnet bridge (<a href="https://bridge.base.org/deposit" target="_blank" rel="noreferrer" className="text-cyan-400 underline">bridge.base.org/deposit</a>).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
