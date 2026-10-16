import React, { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw } from 'lucide-react';

export interface Milestone {
  id: string;
  title: string;
  category: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'git-repo',
    title: 'Initialize Git Repository & .gitignore',
    category: 'Local Setup',
    desc: 'Local git workspace created with .gitignore blocking .env and private keys.'
  },
  {
    id: 'contract-configured',
    title: 'Configure OpenZeppelin ERC-20 Contract',
    category: 'Smart Contract',
    desc: 'Solidity ^0.8.20 contract with 5 Trillion initial supply minted to msg.sender.'
  },
  {
    id: 'remix-compile',
    title: 'Compile Contract in Remix IDE',
    category: 'Compilation',
    desc: 'Compiled in remix.ethereum.org with Solidity 0.8.20+ with zero compiler errors.'
  },
  {
    id: 'testnet-faucet',
    title: 'Acquire Testnet ETH from Official Faucets',
    category: 'Funding',
    desc: 'Free testnet ETH obtained on Ethereum Sepolia or Base Sepolia to pay deployment gas.'
  },
  {
    id: 'injected-deploy',
    title: 'Deploy via Injected Provider - MetaMask',
    category: 'Deployment',
    desc: 'Transaction signed and broadcast through MetaMask; contract address copied.'
  },
  {
    id: 'wallet-import',
    title: 'Import Custom Token into MetaMask / Trust Wallet',
    category: 'Verification',
    desc: 'Contract address imported into wallet; 5,000,000,000,000 token balance visible.'
  }
];

export const DeploymentChecklist: React.FC = () => {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleMilestone = (id: string) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    setCompleted({});
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / MILESTONES.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white">
            Deployment Progress & Readiness Checklist
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Track your progress across each phase of the testnet deployment pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-cyan-400">
              {completedCount} / {MILESTONES.length}
            </span>
            <span className="text-[11px] text-slate-400 ml-1">completed</span>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Reset checklist"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-cyan-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Milestones List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MILESTONES.map((item) => {
          const isDone = Boolean(completed[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => toggleMilestone(item.id)}
              className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-colors ${
                isDone
                  ? 'bg-cyan-950/20 border-cyan-800/80'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      isDone ? 'text-cyan-200 line-through opacity-80' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    · {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
