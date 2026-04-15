import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export default function CommandCenter() {
  const [history, setHistory] = useState<string[]>([
    'NEXUS TACTICAL OS [Version 3.0.4]', 
    'ENCRYPTION: AES-256 ACTIVE',
    'LOCATION: CLASSIFIED',
    'STATUS: ALL SYSTEMS NOMINAL',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'TACTICAL COMMANDS: help, clear, scan, status, intel, deploy, date';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'scan':
        response = 'SCANNING SECTOR... NO THREATS DETECTED. PERIMETER SECURE.';
        break;
      case 'status':
        response = 'CPU: QUANTUM X1 [STABLE] | RAM: 128GB [OPTIMAL] | NETWORK: ENCRYPTED [SECURE]';
        break;
      case 'intel':
        response = 'INTEL REPORT: SECTOR 7G SHOWS INCREASED ACTIVITY. MONITORING IN PROGRESS.';
        break;
      case 'deploy':
        response = 'DEPLOYMENT SEQUENCE INITIATED... ERROR: AUTHORIZATION LEVEL 5 REQUIRED.';
        break;
      case 'date':
        response = new Date().toString().toUpperCase();
        break;
      default:
        response = `UNKNOWN COMMAND: ${cmd}. TYPE 'HELP' FOR TACTICAL ASSISTANCE.`;
    }

    setHistory(prev => [...prev, `[OPERATOR]❯ ${input}`, `[SYSTEM]  ${response}`, '']);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a]/95 font-mono text-[11px] p-4 text-emerald-600/90 selection:bg-emerald-900/40">
      <div className="flex-1 overflow-auto space-y-1">
        {history.map((line, i) => (
          <div key={i} className={cn(
            "min-h-[1.2em] tracking-[0.05em]",
            line.startsWith('[OPERATOR]') ? "text-emerald-100/70" : "text-emerald-700/80"
          )}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-4 flex gap-2 border-t border-emerald-900/10 pt-4">
        <span className="text-emerald-800 font-bold tracking-tighter">TACTICAL_CMD❯</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-emerald-500/90 placeholder:text-emerald-950"
          spellCheck={false}
          placeholder="ENTER COMMAND..."
        />
      </form>
    </div>
  );
}
