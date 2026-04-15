import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, User, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'STRATEGIC AI ONLINE. STANDING BY FOR TACTICAL INQUIRIES.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: "You are the NEXUS Strategic AI. You are a high-level military intelligence advisor. You are professional, analytical, and concise. Your tone is serious and tactical. You represent NEXUS OS V3, a tactical operating system. Do not use emojis. Always respond in uppercase for emphasis on critical data."
        }
      });

      const aiContent = response.text || "ERROR: UNABLE TO PROCESS STRATEGIC DATA.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent.toUpperCase() }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "CONNECTION ERROR: NEURAL LINK SEVERED. CHECK ENCRYPTION KEYS." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a]/95 selection:bg-emerald-900/40">
      {/* Header */}
      <div className="px-4 py-3 border-b border-emerald-900/10 flex items-center gap-2 bg-emerald-900/5">
        <div className="w-6 h-6 rounded-full bg-emerald-700/50 flex items-center justify-center border border-emerald-500/20">
          <Activity size={12} className="text-emerald-400" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-600/80">Strategic Intelligence</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4 font-mono">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-3 max-w-[90%]",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded flex items-center justify-center shrink-0 border transition-colors",
              msg.role === 'user' ? "bg-emerald-900/40 border-emerald-700/50" : "bg-white/5 border-white/10"
            )}>
              {msg.role === 'user' ? <User size={16} className="text-emerald-100/60" /> : <Shield size={16} className="text-emerald-600/60" />}
            </div>
            <div className={cn(
              "p-3 rounded text-[11px] leading-relaxed tracking-tight transition-all",
              msg.role === 'user' ? "bg-emerald-900/20 text-emerald-100/80 border border-emerald-800/30" : "bg-white/5 text-emerald-600/90 border border-white/5"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] animate-pulse">
            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              <Shield size={16} className="text-emerald-900/50" />
            </div>
            <div className="p-3 rounded bg-white/5 text-emerald-900/40 text-[10px] italic font-mono">
              ANALYZING DATA...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-emerald-900/5 border-t border-emerald-900/10">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER INQUIRY..."
            className="w-full bg-black/40 border border-emerald-900/20 rounded pl-4 pr-12 py-3 text-xs outline-none focus:border-emerald-700/50 transition-all text-emerald-500/80 placeholder:text-emerald-950 uppercase font-mono"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-emerald-900/40 hover:bg-emerald-800/60 disabled:opacity-50 rounded transition-colors text-emerald-500"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
