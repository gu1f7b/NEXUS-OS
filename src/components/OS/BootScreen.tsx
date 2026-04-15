import React from 'react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#0a0c0a] flex flex-col items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 border border-emerald-900/30 rounded-full flex items-center justify-center mb-8 relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t border-emerald-500/40 rounded-full"
          />
          <Shield size={24} className="text-emerald-600/80" />
        </div>

        <h1 className="text-xl font-light tracking-[0.6em] text-emerald-50/90 uppercase font-mono text-center">
          WELCOME TO NEXUS OS
        </h1>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="h-[1px] bg-emerald-500/20 mt-6"
        />
      </motion.div>
    </motion.div>
  );
};

export default BootScreen;
