import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { User, ArrowRight, Shield } from 'lucide-react';

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate a brief check
    setTimeout(onLogin, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black"
    >
      {/* Overlay for background darkening */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative flex flex-col items-center w-full max-w-sm"
      >
        {/* Time Display */}
        <div className="flex flex-col items-center text-emerald-50/90 select-none mb-12">
          <span className="text-7xl font-light tracking-tighter">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-sm font-medium tracking-[0.5em] uppercase opacity-40 mt-2">
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-24 h-24 rounded-full bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center mb-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] relative group">
            <div className="absolute inset-0 border border-emerald-500/10 rounded-full animate-pulse" />
            <User size={48} className="text-emerald-500/60" />
          </div>
          <h2 className="text-2xl font-light text-emerald-50/90 tracking-[0.3em] uppercase font-mono">Operator</h2>
          <div className="h-[1px] w-12 bg-emerald-500/20 mt-4" />
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-8">
          <div className="relative group">
            <input
              autoFocus
              type="password"
              placeholder="SECURE ACCESS KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-emerald-900/30 rounded-lg px-4 py-4 text-emerald-500 placeholder:text-emerald-900/40 outline-none focus:bg-black/80 focus:border-emerald-500/50 transition-all font-mono text-xs tracking-widest"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-emerald-500/10 transition-colors text-emerald-900 hover:text-emerald-500"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-emerald-900/30 border-t-emerald-500 rounded-full animate-spin" />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          </div>
          <p className="text-center text-emerald-900/40 text-[8px] uppercase tracking-[0.4em] font-bold">Encrypted Channel // Authorized Personnel Only</p>
        </form>

        <div className="mt-12 flex gap-8">
          <button className="text-[9px] text-emerald-900/60 hover:text-emerald-500 transition-colors uppercase tracking-widest font-bold">Emergency Override</button>
          <button className="text-[9px] text-emerald-900/60 hover:text-emerald-500 transition-colors uppercase tracking-widest font-bold">System Status</button>
        </div>
      </motion.div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 right-8 flex gap-6 text-emerald-900/40">
        <button className="hover:text-emerald-500 transition-colors">
          <Shield size={20} />
        </button>
        <button className="hover:text-emerald-500 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default LoginScreen;
