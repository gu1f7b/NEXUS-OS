import React, { useState } from 'react';
import { Radio, Send, Shield, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SecureComms() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'HQ', content: 'All units, maintain radio silence.', time: '14:05' },
    { id: 2, sender: 'ALPHA_LEAD', content: 'Copy that, HQ. Position secured.', time: '14:07' },
    { id: 3, sender: 'HQ', content: 'Awaiting drone feed from Sector 7.', time: '14:10' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'OPERATOR', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono overflow-hidden">
      <div className="p-4 border-b border-emerald-900/30 bg-emerald-950/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Radio size={18} className="text-emerald-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Secure_Comms_v2</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-600">
          <Lock size={12} />
          <span>ENCRYPTION: AES-256</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex flex-col max-w-[80%] gap-1",
            msg.sender === 'OPERATOR' ? "ml-auto items-end" : "items-start"
          )}>
            <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-700">
              <span>{msg.sender}</span>
              <span>•</span>
              <span>{msg.time}</span>
            </div>
            <div className={cn(
              "p-3 rounded-lg text-[11px] border",
              msg.sender === 'OPERATOR' 
                ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-100" 
                : "bg-black/40 border-emerald-900/30 text-emerald-500"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-emerald-900/30 bg-black/40">
        <div className="relative flex items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TRANSMIT MESSAGE..."
            className="w-full bg-emerald-950/20 border border-emerald-900/30 rounded pl-4 pr-12 py-3 text-xs outline-none focus:border-emerald-500/50 transition-all text-emerald-400 placeholder:text-emerald-900/40 uppercase"
          />
          <button type="submit" className="absolute right-2 p-2 text-emerald-500 hover:text-emerald-400 transition-colors">
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
