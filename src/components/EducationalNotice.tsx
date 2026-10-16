import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const EducationalNotice: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-white">
              Standard Web3 Educational & Safe Development Guidelines
            </h4>
            <p className="text-slate-400 leading-relaxed">
              This deployment studio adheres strictly to standard EIP-20 and OpenZeppelin contracts.
              Smart contracts deployed on Ethereum Sepolia (Chain ID 11155111) and Base Sepolia (Chain ID 84532)
              operate in isolated public testnet sandboxes. Testnet ETH and minted tokens carry zero real-world fiat value
              and cannot be exchanged for financial currency. Never provide private keys or seed phrases to any application.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400 text-[11px] pt-4 border-t border-slate-800 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Built for developers learning Ethereum & Layer-2 smart contract deployment</span>
          </div>
          <div>
            <span>Solidity ^0.8.20 · OpenZeppelin Contracts v5.x · EIP-20 Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
