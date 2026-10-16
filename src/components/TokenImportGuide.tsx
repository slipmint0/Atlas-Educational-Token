import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Wallet, PlusCircle, Search } from 'lucide-react';
import { WALLET_IMPORT_GUIDES } from '../data/walletGuide';
import { watchAssetInMetaMask, isEthereumAvailable } from '../utils/web3Helper';

interface TokenImportGuideProps {
  defaultSymbol: string;
}

export const TokenImportGuide: React.FC<TokenImportGuideProps> = ({ defaultSymbol }) => {
  const [selectedWallet, setSelectedWallet] = useState<'MetaMask' | 'Trust Wallet'>('MetaMask');
  const [deployedAddress, setDeployedAddress] = useState<string>('');
  const [symbol, setSymbol] = useState<string>(defaultSymbol || 'ATLAS');
  const [watchStatus, setWatchStatus] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [copiedExplorerLink, setCopiedExplorerLink] = useState(false);

  const activeGuide = WALLET_IMPORT_GUIDES.find((g) => g.app === selectedWallet)!;

  const handle1ClickWatchAsset = async () => {
    if (!deployedAddress || !deployedAddress.startsWith('0x') || deployedAddress.length !== 42) {
      setWatchStatus('Please enter a valid 42-character contract address (0x...)');
      setTimeout(() => setWatchStatus(null), 3500);
      return;
    }

    if (!isEthereumAvailable()) {
      setWatchStatus('MetaMask extension not detected in your browser.');
      setTimeout(() => setWatchStatus(null), 3500);
      return;
    }

    try {
      setIsWatching(true);
      setWatchStatus(null);
      await watchAssetInMetaMask(deployedAddress, symbol, 18);
      setWatchStatus('Token watch prompt submitted to MetaMask! Check your wallet extension.');
      setTimeout(() => setWatchStatus(null), 4000);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWatchStatus(e.message || 'MetaMask prompt was rejected or failed.');
      setTimeout(() => setWatchStatus(null), 4000);
    } finally {
      setIsWatching(false);
    }
  };

  const handleCopySepoliaUrl = async () => {
    if (!deployedAddress) return;
    const url = `https://sepolia.etherscan.io/token/${deployedAddress}`;
    await navigator.clipboard.writeText(url);
    setCopiedExplorerLink(true);
    setTimeout(() => setCopiedExplorerLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            05. Import Custom Token into MetaMask & Trust Wallet
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Because newly deployed testnet tokens are not in public token registries, you must import
            the contract address as a custom asset so your wallet can query and display your 5 Trillion token balance.
          </p>
        </div>
      </div>

      {/* Interactive 1-Click Token Watcher & Explorer Verifier */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">
            Interactive Token Importer & Explorer Verifier
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Paste the contract address from Remix's "Deployed Contracts" tab to trigger the standard EIP-747
          watch asset popup in MetaMask or view the contract on block explorers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Deployed Contract Address
            </label>
            <input
              type="text"
              value={deployedAddress}
              onChange={(e) => setDeployedAddress(e.target.value.trim())}
              placeholder="0x1234567890abcdef1234567890abcdef12345678"
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Symbol
            </label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="EDU"
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono uppercase text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <button
              onClick={handle1ClickWatchAsset}
              disabled={isWatching}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isWatching ? 'Prompting...' : '1-Click Add to MetaMask'}</span>
            </button>
          </div>
        </div>

        {watchStatus && (
          <div className="p-3 bg-cyan-950/60 border border-cyan-800 rounded-lg text-xs text-cyan-200">
            {watchStatus}
          </div>
        )}

        {deployedAddress && (
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">View on Explorers:</span>
            <a
              href={`https://sepolia.etherscan.io/token/${deployedAddress}`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Sepolia Etherscan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={`https://sepolia.basescan.org/token/${deployedAddress}`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Base Sepolia Basescan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">·</span>
            <button
              onClick={handleCopySepoliaUrl}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedExplorerLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedExplorerLink ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Manual Step-by-Step Instructions */}
      <div className="space-y-4">
        {/* Wallet Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setSelectedWallet('MetaMask')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedWallet === 'MetaMask'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            MetaMask Instructions
          </button>
          <button
            onClick={() => setSelectedWallet('Trust Wallet')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedWallet === 'Trust Wallet'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Trust Wallet Instructions
          </button>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeGuide.steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-cyan-400">
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                {step.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Balance Verification Callout */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-2">
          Verifying Balance on Block Explorers
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          In addition to checking in your wallet, you can view the token contract directly on{' '}
          <strong className="text-slate-200">Sepolia Etherscan</strong> or{' '}
          <strong className="text-slate-200">Basescan</strong>. The <em>Token Tracker</em> page will show:
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TOTAL SUPPLY</span>
            <span className="text-white font-semibold">5,000,000,000,000</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">HOLDERS</span>
            <span className="text-cyan-400 font-semibold">1 (Deployer Wallet 100%)</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">DECIMALS</span>
            <span className="text-slate-300 font-semibold">18</span>
          </div>
        </div>
      </div>
    </div>
  );
};
