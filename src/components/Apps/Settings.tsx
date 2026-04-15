import { Monitor, Shield, Cpu, Info, User, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Theme } from '../../App';
import { cn } from '../../lib/utils';

export default function Settings({ theme, setTheme }: { theme: Theme, setTheme: (t: Theme) => void }) {
  const sections = [
    { icon: <Monitor size={18} />, label: 'System', description: 'Display, sound, notifications' },
    { icon: <Palette size={18} />, label: 'Personalization', description: 'Themes, wallpaper, colors' },
    { icon: <Shield size={18} />, label: 'Security', description: 'Privacy, encryption, firewall' },
    { icon: <Cpu size={18} />, label: 'Hardware', description: 'Processor, memory, storage' },
    { icon: <Info size={18} />, label: 'About', description: 'OS version, credits, legal' },
  ];

  const accentColor = theme === 'tactical' ? 'text-cyan-500/90' : 'text-blue-400';
  const accentBorder = theme === 'tactical' ? 'border-cyan-900/30' : 'border-blue-500/20';
  const accentBg = theme === 'tactical' ? 'bg-cyan-900/10' : 'bg-blue-500/5';

  return (
    <div className="flex h-full bg-[#0d0f0d]/80 text-white/90 backdrop-blur-xl">
      <div className="w-56 border-r border-white/5 p-4 flex flex-col gap-1">
        <h2 className="text-lg font-bold mb-6 px-2 tracking-tight">Settings</h2>
        {sections.map((section, i) => (
          <button key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition-all text-left group">
            <span className={cn("transition-colors", accentColor)}>{section.icon}</span>
            <span className="group-hover:translate-x-1 transition-transform">{section.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-10">
          <section>
            <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-6">Personalization</h3>
            <div className="grid grid-cols-2 gap-6">
              <button 
                onClick={() => setTheme('professional')}
                className={cn(
                  "p-5 rounded-2xl border transition-all text-left relative overflow-hidden group",
                  theme === 'professional' ? "bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/5" : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="text-xs font-bold mb-1">Standard Pro</div>
                <div className="text-[10px] text-white/40">Clean blue aesthetic</div>
                {theme === 'professional' && <motion.div layoutId="active-theme" className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />}
              </button>
              <button 
                onClick={() => setTheme('tactical')}
                className={cn(
                  "p-5 rounded-2xl border transition-all text-left relative overflow-hidden group",
                  theme === 'tactical' ? "bg-cyan-900/20 border-cyan-600/40 shadow-lg shadow-cyan-900/20" : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="text-xs font-bold mb-1 uppercase tracking-wider">Tactical Matrix</div>
                <div className="text-[10px] text-white/40 uppercase tracking-tighter">Cyan & Emerald HUD aesthetic</div>
                {theme === 'tactical' && <motion.div layoutId="active-theme" className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full" />}
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">System Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard label="OS Name" value="NEXUS OS V3" />
              <InfoCard label="Interface" value={theme === 'tactical' ? "Tactical HUD" : "Modern Desktop"} />
              <InfoCard label="Build" value="2026.04.15" />
              <InfoCard label="Kernel" value="NX-Core 1.2.0" />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Hardware Specs</h3>
            <div className="glass-light rounded-xl p-6 space-y-4">
              <SpecRow label="Processor" value="Quantum X1 @ 5.4GHz" />
              <SpecRow label="Memory" value="128GB LPDDR6" />
              <SpecRow label="Graphics" value="Neural-RTX 9000" />
              <SpecRow label="Storage" value="10PB NVMe Gen 8" />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Credits</h3>
            <div className={cn("p-6 border rounded-xl", accentBorder, accentBg)}>
              <p className="text-sm text-white/70 leading-relaxed">
                NEXUS OS V3 was developed as a high-end simulation of a next-generation operating system. 
                Special thanks to the core development team.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className={cn("text-xs font-bold", accentColor)}>System Architect</span>
                <span className="text-xs font-medium">bader\gu1f7</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
      <div className="text-[10px] text-white/30 uppercase font-bold mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-white/50">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}
