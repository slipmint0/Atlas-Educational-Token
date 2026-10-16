import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ChevronRight, AlertCircle, Compass } from 'lucide-react';
import { REMIX_STEPS } from '../data/remixGuide';

export const RemixWalkthrough: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              03. Remix IDE Compilation & Deployment Walkthrough
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Compile your contract using Solidity 0.8.20+ and deploy it to Sepolia or Base Sepolia
              using the "Injected Provider - MetaMask" environment without installing heavy CLI tools.
            </p>
          </div>
          <a
            href="https://remix.ethereum.org"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>Launch Remix IDE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Step Selector Horizontal Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {REMIX_STEPS.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStepIndex(idx)}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeStepIndex === idx
                ? 'bg-slate-850 border-cyan-500/80 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[11px] font-mono text-cyan-400 block mb-0.5">
              STEP {step.number}
            </span>
            <span className="text-xs font-semibold text-white truncate block">
              {step.title.split('&')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Step Active Card */}
      {(() => {
        const current = REMIX_STEPS[activeStepIndex];
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Step Header */}
            <div className="px-6 py-5 bg-slate-950/80 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Step {current.number} of 05
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{current.title}</h3>
                <p className="text-xs text-slate-400">{current.subhead}</p>
              </div>

              {current.actionUrl && (
                <a
                  href={current.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/40 rounded-lg transition-colors self-start md:self-auto"
                >
                  <span>{current.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Step Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Instructions column */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Detailed Instructions
                </h4>

                <div className="space-y-3">
                  {current.instructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono text-cyan-400">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{inst}</p>
                    </div>
                  ))}
                </div>

                {current.tips.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 space-y-1">
                      <strong className="text-white block font-medium">Pro-Tip:</strong>
                      {current.tips.map((tip, idx) => (
                        <p key={idx} className="text-slate-400">{tip}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Simulation / Mockup column */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-mono text-slate-400">Remix UI Inspector</span>
                    <span className="text-[10px] text-cyan-400 font-mono">remix.ethereum.org</span>
                  </div>

                  {activeStepIndex === 0 && (
                    <div className="mt-4 space-y-2 text-xs font-mono">
                      <div className="text-slate-400 text-[11px]">File Explorer Panel:</div>
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                        📁 contracts/<br />
                        &nbsp;&nbsp;📄 <span className="text-cyan-300 font-bold">EducationalToken.sol</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-2">
                        OpenZeppelin contracts import directly via URL. No manual node_modules upload needed in Remix.
                      </p>
                    </div>
                  )}

                  {activeStepIndex === 1 && (
                    <div className="mt-4 space-y-3 text-xs font-mono">
                      <div className="text-slate-400 text-[11px]">Solidity Compiler Settings:</div>
                      <div className="space-y-1.5 p-3 bg-slate-900 rounded border border-slate-800">
                        <div className="text-slate-400 text-[11px]">COMPILER:</div>
                        <div className="text-cyan-300 font-semibold">0.8.24+commit.e11b9ed9</div>
                        <div className="text-slate-400 text-[11px] pt-1">EVM VERSION:</div>
                        <div className="text-slate-300">default (cancun)</div>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded flex items-center gap-2 text-emerald-300 text-[11px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Compilation successful with 0 errors</span>
                      </div>
                    </div>
                  )}

                  {activeStepIndex === 2 && (
                    <div className="mt-4 space-y-2 text-xs font-mono">
                      <div className="text-slate-400 text-[11px]">Deploy & Run Environment:</div>
                      <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
                        <div>
                          <span className="text-slate-500 block text-[10px]">ENVIRONMENT:</span>
                          <span className="text-cyan-300 font-bold">Injected Provider - MetaMask</span>
                        </div>
                        <div className="pt-1 border-t border-slate-800/80">
                          <span className="text-slate-500 block text-[10px]">NETWORK:</span>
                          <span className="text-emerald-400">Sepolia (11155111) or Base Sepolia (84532)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStepIndex === 3 && (
                    <div className="mt-4 space-y-2 text-xs font-mono">
                      <div className="text-slate-400 text-[11px]">Deployment Execution:</div>
                      <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
                        <div>
                          <span className="text-slate-500 block text-[10px]">CONTRACT TO DEPLOY:</span>
                          <span className="text-white font-bold">EducationalToken - EducationalToken.sol</span>
                        </div>
                        <button className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded text-xs cursor-default">
                          Deploy (Orange Button)
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1">
                        MetaMask pops up with estimated testnet ETH gas. Click Confirm.
                      </p>
                    </div>
                  )}

                  {activeStepIndex === 4 && (
                    <div className="mt-4 space-y-2 text-xs font-mono">
                      <div className="text-slate-400 text-[11px]">Deployed Contract Instance:</div>
                      <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-300 text-[11px] font-bold">EDUCATIONALTOKEN</span>
                          <span className="text-[10px] text-slate-400">at 0x82...3f1</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Click clipboard icon to copy contract address.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step navigation buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    disabled={activeStepIndex === 0}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStepIndex(Math.min(REMIX_STEPS.length - 1, activeStepIndex + 1))}
                    disabled={activeStepIndex === REMIX_STEPS.length - 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
