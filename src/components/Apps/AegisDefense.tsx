import React from 'react';
import { Shield, Activity, Target, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AegisDefense() {
  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8 border-b border-emerald-900/30 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center">
            <Shield size={24} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest uppercase">AEGIS DEFENSE SYSTEMS</h1>
            <p className="text-[10px] text-emerald-700 uppercase tracking-[0.3em]">Global Threat Mitigation Matrix</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-emerald-400 animate-pulse">SYSTEM STATUS: ACTIVE</div>
          <div className="text-[10px] text-emerald-800">THREAT LEVEL: MINIMAL</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        <div className="col-span-2 bg-black/40 border border-emerald-900/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target size={14} /> Global Intercept Grid
          </h2>
          <div className="aspect-video bg-emerald-950/10 rounded border border-emerald-900/20 flex items-center justify-center relative">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-emerald-500/10 rounded-full animate-[ping_3s_linear_infinite]" />
                <div className="w-1/2 h-1/2 border border-emerald-500/10 rounded-full animate-[ping_4s_linear_infinite]" />
             </div>
             <Radar size={64} className="text-emerald-900/20" />
             <div className="text-[10px] text-emerald-700/50 uppercase tracking-widest">Scanning Sectors...</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 border border-emerald-900/20 rounded-xl p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-emerald-700">Power Core</h3>
            <div className="h-2 bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-bold">
              <span>85% STABLE</span>
              <span>4.2 GW</span>
            </div>
          </div>

          <div className="bg-black/40 border border-emerald-900/20 rounded-xl p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-emerald-700">Neural Link</h3>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-800">NODE_{i}</span>
                  <span className="text-emerald-400">SYNCED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex-1">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Alert Log</h3>
             <div className="space-y-2 font-mono text-[9px]">
                <div className="text-emerald-400/60">[14:12:04] SECURE CHANNEL OPENED</div>
                <div className="text-emerald-400/60">[14:12:05] AEGIS PROTOCOL V3.4 INIT</div>
                <div className="text-emerald-400/60">[14:12:08] SCANNING FOR ANOMALIES</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Radar({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}
