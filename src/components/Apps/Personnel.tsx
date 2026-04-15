import React from 'react';
import { Users, Shield, Award, Activity } from 'lucide-react';

export default function Personnel() {
  const staff = [
    { name: 'COL. JAMESON', role: 'COMMANDER', status: 'ON_DUTY', rank: 'O-6' },
    { name: 'MAJ. CHEN', role: 'INTEL_CHIEF', status: 'ON_DUTY', rank: 'O-4' },
    { name: 'CPT. MILLER', role: 'DRONE_OP', status: 'ON_DUTY', rank: 'O-3' },
    { name: 'SGT. ROSSI', role: 'SEC_LEAD', status: 'STANDBY', rank: 'E-5' },
    { name: 'LT. VANCE', role: 'COMMS_OFF', status: 'ON_DUTY', rank: 'O-2' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono overflow-hidden">
      <div className="p-4 border-b border-emerald-900/30 bg-emerald-950/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users size={18} className="text-emerald-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Personnel_Registry</span>
        </div>
        <div className="text-[10px] text-emerald-700">TOTAL ACTIVE: 142</div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {staff.map((p, i) => (
            <div key={i} className="bg-black/40 border border-emerald-900/20 rounded-xl p-4 flex items-center justify-between hover:bg-emerald-500/5 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center">
                  <Shield size={20} className="text-emerald-700 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest">{p.name}</div>
                  <div className="text-[9px] text-emerald-800 uppercase tracking-widest">{p.role} // {p.rank}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex flex-col items-end">
                    <div className="text-[8px] text-emerald-900 uppercase font-bold mb-1">Status</div>
                    <div className={`text-[9px] font-bold ${p.status === 'ON_DUTY' ? 'text-emerald-400' : 'text-yellow-600'}`}>
                       {p.status}
                    </div>
                 </div>
                 <div className="w-24 h-8 bg-black/40 rounded border border-emerald-900/20 flex items-center justify-center px-2">
                    <Activity size={12} className="text-emerald-800 animate-pulse" />
                    <div className="flex-1 h-[1px] bg-emerald-900/20 mx-2" />
                    <span className="text-[8px] text-emerald-800">72 BPM</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
