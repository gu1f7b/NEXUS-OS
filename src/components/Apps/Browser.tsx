import React, { useState } from 'react';
import { Globe, Search, ArrowLeft, ArrowRight, RotateCw, Shield } from 'lucide-react';

export default function Browser() {
  const [url, setUrl] = useState('https://www.google.com');
  const [input, setInput] = useState('https://www.google.com');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(input);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono overflow-hidden">
      <div className="p-2 border-b border-emerald-900/30 bg-emerald-950/20 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><ArrowLeft size={16} /></button>
          <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><ArrowRight size={16} /></button>
          <button className="p-1.5 hover:bg-white/5 rounded transition-colors"><RotateCw size={16} /></button>
        </div>
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800" />
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/40 border border-emerald-900/30 rounded-full pl-10 pr-4 py-1.5 text-xs outline-none focus:border-emerald-500/50 transition-all text-emerald-400"
          />
        </form>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <Shield size={12} className="text-emerald-400" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center relative">
         <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-12 text-center">
            <Globe size={64} className="text-emerald-900/20 mb-8" />
            <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-4">Nexus Secure Browser</h2>
            <p className="text-emerald-700 max-w-md text-sm leading-relaxed">
               External network access is restricted to authorized domains only. 
               All traffic is routed through the NEXUS-VPN-GRID.
            </p>
            <div className="mt-12 flex gap-4">
               <div className="px-6 py-2 border border-emerald-900/30 rounded text-xs font-bold text-emerald-800">GOOGLE_SEARCH</div>
               <div className="px-6 py-2 border border-emerald-900/30 rounded text-xs font-bold text-emerald-800">INTEL_DB</div>
               <div className="px-6 py-2 border border-emerald-900/30 rounded text-xs font-bold text-emerald-800">WIKI_TACTICAL</div>
            </div>
         </div>
      </div>
    </div>
  );
}
