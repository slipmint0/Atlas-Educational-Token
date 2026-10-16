import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Code2, ShieldCheck, Zap } from 'lucide-react';
import { TokenConfig } from '../types';
import { generateSolidityContract } from '../data/contractTemplates';
import { formatWeiSupply } from '../utils/web3Helper';

interface ContractConfiguratorProps {
  config: TokenConfig;
  setConfig: React.Dispatch<React.SetStateAction<TokenConfig>>;
}

export const ContractConfigurator: React.FC<ContractConfiguratorProps> = ({ config, setConfig }) => {
  const [copied, setCopied] = useState(false);

  const contractCode = generateSolidityContract(config);
  const weiSupply = formatWeiSupply(config.initialSupply, config.decimals);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(contractCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSol = () => {
    const filename = `${config.symbol.replace(/[^a-zA-Z0-9]/g, '') || 'Token'}.sol`;
    const blob = new Blob([contractCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Overview and Introduction Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              01. Solidity ERC-20 Smart Contract
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Production-grade ERC-20 smart contract powered by OpenZeppelin v5.0 contracts,
              configured with a 5 Trillion initial supply minted directly to your deployer wallet.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Code' : 'Copy Solidity'}</span>
            </button>
            <button
              onClick={handleDownloadSol}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Download .sol</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Code Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Configuration Controls (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider text-xs">
              Token Parameters
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Token Name
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="Educational Token"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Symbol (Ticker)
                  </label>
                  <input
                    type="text"
                    value={config.symbol}
                    onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
                    placeholder="EDU"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 font-mono font-medium uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Decimals
                  </label>
                  <input
                    type="number"
                    value={config.decimals}
                    disabled
                    className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-400 font-mono cursor-not-allowed"
                    title="18 decimals is the global standard for EVM ERC-20 tokens"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Initial Supply (Display Amount)
                </label>
                <input
                  type="text"
                  value={config.initialSupply}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^0-9]/g, '');
                    setConfig({ ...config, initialSupply: cleaned || '0' });
                  }}
                  placeholder="5000000000000"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 font-mono tabular-nums"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Default: 5,000,000,000,000 (5 Trillion tokens)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                OpenZeppelin Extensions
              </span>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={config.burnable}
                  onChange={(e) => setConfig({ ...config, burnable: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                    Burnable (ERC20Burnable)
                  </span>
                  <p className="text-[11px] text-slate-400">Allows token holders to destroy tokens</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={config.ownable}
                  onChange={(e) => setConfig({ ...config, ownable: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                    Ownable (OpenZeppelin 5.x)
                  </span>
                  <p className="text-[11px] text-slate-400">Sets msg.sender as initial contract owner</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={config.pausable}
                  onChange={(e) => setConfig({ ...config, pausable: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-950 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                    Pausable (ERC20Pausable)
                  </span>
                  <p className="text-[11px] text-slate-400">Allows emergency pause of all transfers</p>
                </div>
              </label>
            </div>
          </div>

          {/* EVM Token Math Deep-Dive Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="w-4 h-4" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                EVM Decimal Math Explained
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Because Ethereum does not have floating point numbers, tokens use 18 decimal places.
              To mint <strong className="text-white">5 Trillion</strong> tokens, the contract multiplies the display amount by 10<sup>18</sup>.
            </p>

            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Display Supply:</span>
                <span className="text-cyan-300 font-semibold tabular-nums">
                  {Number(config.initialSupply).toLocaleString('en-US')} {config.symbol}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Decimals:</span>
                <span className="text-slate-200 tabular-nums">18 (10^18)</span>
              </div>
              <div className="border-t border-slate-800 pt-2 text-slate-400">
                <span className="block text-[10px] text-slate-500 mb-0.5">Raw uint256 in storage (Wei):</span>
                <span className="text-[11px] text-amber-300 break-all tabular-nums font-mono">
                  {weiSupply}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Preview on Right (7 columns) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>contracts/{config.symbol || 'Educational'}Token.sol</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Solidity ^0.8.20</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://remix.ethereum.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors text-[11px]"
              >
                <span>Remix IDE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 bg-slate-950 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 max-h-[580px] overflow-y-auto">
            <pre>
              <code>{contractCode}</code>
            </pre>
          </div>

          {/* Security Features Bottom Strip */}
          <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standard OpenZeppelin v5 Security (No fees, no backdoors, no overflow traps)</span>
            </div>
            <span className="text-slate-500">uint256 safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
