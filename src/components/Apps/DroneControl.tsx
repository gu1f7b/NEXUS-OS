import React from 'react';
import { Target, Navigation, Camera, Zap, Shield } from 'lucide-react';

export default function DroneControl() {
  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono overflow-hidden">
      <div className="p-4 border-b border-emerald-900/30 bg-emerald-950/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target size={18} className="text-emerald-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Drone_Control_v1.0</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-emerald-700">
          <span className="flex items-center gap-1"><Zap size={12} /> BATTERY: 92%</span>
          <span className="flex items-center gap-1"><Shield size={12} /> SIGNAL: STRONG</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3 bg-black/40 border border-emerald-900/30 rounded-xl relative overflow-hidden flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2670&auto=format&fit=crop" 
            alt="Drone Feed" 
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/20 rounded-full flex items-center justify-center">
             <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold bg-black/80 px-1">LOCK_ON</div>
          </div>
          
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-[10px] font-bold text-emerald-400/60">
             <span>ALT: 450M</span>
             <span>SPD: 45 KPH</span>
             <span>HDG: 124°</span>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-red-500 uppercase">REC</span>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4">Controls</h3>
              <div className="grid grid-cols-2 gap-2">
                 {['TAKEOFF', 'LAND', 'RTL', 'LOITER'].map(cmd => (
                   <button key={cmd} className="py-2 bg-black/40 border border-emerald-900/30 rounded text-[9px] font-bold hover:bg-emerald-500/10 transition-colors">{cmd}</button>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl flex-1">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4">Payload</h3>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[10px]">
                    <span className="text-emerald-700">HELLFIRE_X2</span>
                    <span className="text-emerald-400">READY</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px]">
                    <span className="text-emerald-700">FLIR_CAM</span>
                    <span className="text-emerald-400">ONLINE</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
