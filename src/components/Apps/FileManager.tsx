import { useState } from 'react';
import { Folder, File, ChevronRight, Search, LayoutGrid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FileManager() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const sidebarItems = [
    { icon: <Folder size={16} />, label: 'Tactical_Data' },
    { icon: <Folder size={16} />, label: 'Intel_Reports' },
    { icon: <Folder size={16} />, label: 'Mission_Logs' },
    { icon: <Folder size={16} />, label: 'Satellite_Imagery' },
    { icon: <Folder size={16} />, label: 'Personnel' },
  ];

  const files = [
    { name: 'OP_NEXUS', type: 'folder', size: '--' },
    { name: 'SEC_7_MAP', type: 'file', size: '1.8 MB' },
    { name: 'INTEL_RPT', type: 'file', size: '128 KB' },
    { name: 'DRONE_LOG', type: 'file', size: '156 MB' },
    { name: 'PERSONNEL', type: 'folder', size: '--' },
    { name: 'SAT_IMGS', type: 'folder', size: '--' },
    { name: 'ENCRYPT_K', type: 'file', size: '12 KB' },
    { name: 'MISSION_Z', type: 'file', size: '4.5 MB' },
  ];

  return (
    <div className="flex h-full bg-[#0a0c0a]/95 text-white/90 selection:bg-emerald-900/40">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-1">
        <div className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em] mb-6 px-2">Intel Assets</div>
        {sidebarItems.map((item, i) => (
          <button key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 text-[11px] transition-all group">
            <span className="text-emerald-800 group-hover:text-emerald-600 transition-colors">{item.icon}</span>
            <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white/20">
              <ChevronRight size={14} />
              <span className="text-[10px] uppercase tracking-widest">NEXUS_INTEL</span>
              <ChevronRight size={14} />
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Tactical_Data</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                placeholder="SEARCH INTEL..." 
                className="bg-white/5 border border-white/10 rounded-md pl-8 pr-2 py-1 text-[9px] outline-none focus:border-emerald-900/50 transition-colors w-40 uppercase tracking-[0.2em] font-mono"
              />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <button onClick={() => setView('grid')} className={cn("p-1.5 rounded", view === 'grid' ? "bg-white/10" : "hover:bg-white/5")}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setView('list')} className={cn("p-1.5 rounded", view === 'list' ? "bg-white/10" : "hover:bg-white/5")}>
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Files Area */}
        <div className={cn(
          "flex-1 p-6 overflow-auto",
          view === 'grid' ? "grid grid-cols-4 md:grid-cols-6 gap-8 content-start" : "flex flex-col"
        )}>
          {files.map((file, i) => (
            <div 
              key={i} 
              className={cn(
                "group cursor-pointer transition-all",
                view === 'grid' 
                  ? "flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-white/5" 
                  : "flex items-center gap-4 px-4 py-2 hover:bg-white/5 border-b border-white/5"
              )}
            >
              <div className={cn(
                "text-emerald-900/60 group-hover:text-emerald-600 group-hover:scale-110 transition-all",
                view === 'grid' ? "w-12 h-12 flex items-center justify-center" : ""
              )}>
                {file.type === 'folder' ? <Folder size={view === 'grid' ? 44 : 18} /> : <File size={view === 'grid' ? 44 : 18} />}
              </div>
              <div className={cn(view === 'grid' ? "text-center" : "flex-1 flex items-center justify-between")}>
                <div className="text-[10px] font-bold truncate max-w-[120px] uppercase tracking-tighter text-white/70 group-hover:text-white transition-colors">{file.name}</div>
                {view === 'list' && <div className="text-[10px] text-white/20 font-mono">{file.size}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
