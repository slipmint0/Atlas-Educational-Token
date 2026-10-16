import React, { useState } from 'react';
import { Terminal, Copy, Check, GitBranch, ShieldAlert } from 'lucide-react';
import { GIT_WORKFLOW_STEPS } from '../data/gitGuide';

export const TerminalGitGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopySingle = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyAllScript = async () => {
    const fullScript = `#!/usr/bin/env bash
# Educational ERC-20 Local Git & GitHub Setup Script
set -e

echo "=== Initializing Local Project ==="
mkdir -p educational-erc20-token/contracts
cd educational-erc20-token

git init -b main

echo "=== Creating Web3 .gitignore ==="
cat << 'EOF' > .gitignore
# Environment & Secret Keys (CRITICAL: Never commit private keys)
.env
.env.local
.secret
secrets.json

# Dependencies & Build artifacts
node_modules/
artifacts/
cache/
out/
broadcast/
typechain/
typechain-types/

# OS files
.DS_Store
Thumbs.db
EOF

echo "=== Staging and Committing ==="
git add .
git commit -m "feat: initial commit of Educational ERC-20 token with 5T supply"

echo "=== Local Git Repository Ready ==="
echo "To push to GitHub, run: gh repo create educational-erc20-token --public --source=. --remote=origin --push"
`;

    try {
      await navigator.clipboard.writeText(fullScript);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              02. Terminal & GitHub Repository Workflow
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Initialize a local Git repository, configure Web3 security rules (.gitignore to protect private keys),
              commit your smart contract, and publish it to GitHub.
            </p>
          </div>
          <button
            onClick={handleCopyAllScript}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            {copiedAll ? <Check className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
            <span>{copiedAll ? 'Copied Full Script' : 'Copy All as Bash Script'}</span>
          </button>
        </div>
      </div>

      {/* Security Warning Box */}
      <div className="bg-amber-950/30 border border-amber-900/60 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 block mb-0.5">Golden Rule of Web3 Development:</strong>
          Never commit files containing private keys, mnemonic seed phrases, or RPC API secrets to Git.
          The provided <code className="bg-amber-950/80 px-1.5 py-0.5 rounded text-amber-300 font-mono">.gitignore</code> rule ensures that testnet and mainnet credentials are never uploaded to GitHub.
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {GIT_WORKFLOW_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors"
          >
            <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>{step.title}</span>
              </div>
              <button
                onClick={() => handleCopySingle(step.command, idx)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.explanation}
              </p>

              <div className="bg-slate-950 rounded-lg p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800/80">
                <pre>{step.command}</pre>
              </div>

              {step.outputPreview && (
                <div className="mt-2 text-[11px] text-slate-500 font-mono bg-slate-950/40 p-2.5 rounded border border-slate-800/40">
                  <span className="text-slate-600 block text-[10px] uppercase mb-1">Expected Terminal Output:</span>
                  <pre className="text-slate-400">{step.outputPreview}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
