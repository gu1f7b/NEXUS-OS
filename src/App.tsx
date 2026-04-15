import React from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { useState, useEffect } from 'react';
import { AppId, WindowState } from './types';
import BootScreen from './components/OS/BootScreen';
import LoginScreen from './components/OS/LoginScreen';
import { cn } from './lib/utils';
import { 
  Terminal, 
  Folder, 
  MessageSquare, 
  Settings as SettingsIcon,
  X,
  Minus,
  Square,
  Clock,
  Shield,
  Radar,
  Activity,
  Globe,
  Users,
  Radio,
  Target,
  Cpu,
  Search,
  Menu
} from 'lucide-react';

// App Components
import CommandCenter from './components/Apps/CommandCenter';
import FileManager from './components/Apps/FileManager';
import AIAssistant from './components/Apps/AIAssistant';
import Settings from './components/Apps/Settings';
import AegisDefense from './components/Apps/AegisDefense';
import TacticalMap from './components/Apps/TacticalMap';
import SecureComms from './components/Apps/SecureComms';
import DroneControl from './components/Apps/DroneControl';
import Personnel from './components/Apps/Personnel';
import Browser from './components/Apps/Browser';

export type Theme = 'professional' | 'tactical';

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  command: {
    id: 'command',
    title: 'Tactical Command',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 500, height: 350 }
  },
  files: {
    id: 'files',
    title: 'Intel Explorer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 600, height: 400 }
  },
  ai: {
    id: 'ai',
    title: 'Strategic AI',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 320, height: 450 }
  },
  settings: {
    id: 'settings',
    title: 'System Config',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 500, height: 350 }
  },
  aegis: {
    id: 'aegis',
    title: 'AEGIS DEFENSE',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 650, height: 450 }
  },
  map: {
    id: 'map',
    title: 'Tactical Map',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 600, height: 400 }
  },
  comms: {
    id: 'comms',
    title: 'Secure Comms',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 350, height: 500 }
  },
  drones: {
    id: 'drones',
    title: 'Drone Control',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 550, height: 380 }
  },
  personnel: {
    id: 'personnel',
    title: 'Personnel',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 500, height: 350 }
  },
  browser: {
    id: 'browser',
    title: 'Nexus Browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 0, y: 0 },
    size: { width: 700, height: 500 }
  }
};

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<Theme>('tactical');
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindow, setActiveWindow] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);

  const handleBootComplete = React.useCallback(() => {
    setIsBooting(false);
  }, []);

  const handleLogin = React.useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (id: AppId) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ }
    }));
    setActiveWindow(id);
  };

  const closeWindow = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    setActiveWindow(null);
  };

  const toggleMaximize = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const focusWindow = (id: AppId) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ, isMinimized: false }
    }));
    setActiveWindow(id);
  };

  const accentColor = theme === 'tactical' ? 'text-cyan-500/90' : 'text-blue-400';
  const accentBg = theme === 'tactical' ? 'bg-emerald-600/80' : 'bg-blue-500';

  return (
    <div className={cn(
      "relative w-full h-screen overflow-hidden bg-neutral-950 transition-colors duration-1000",
      theme === 'tactical' ? "selection:bg-emerald-900/40" : "selection:bg-blue-500/30"
    )}>
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[50]" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        ) : !isLoggedIn ? (
          <LoginScreen key="login" onLogin={handleLogin} />
        ) : null}
      </AnimatePresence>

      {/* Desktop Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: theme === 'tactical' 
            ? `url('https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=2670&auto=format&fit=crop')`
            : `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')`,
          filter: (isBooting || !isLoggedIn) ? 'none' : 'none'
        }}
      />

      {/* OS Logo Overlay */}
      <div className="absolute top-8 right-8 flex flex-col items-end opacity-20 pointer-events-none select-none z-10">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center border backdrop-blur-sm transition-all duration-1000", theme === 'tactical' ? "bg-emerald-950/20 border-emerald-900/30" : "bg-white/5 border-white/10")}>
            <Shield size={24} className={cn("transition-colors duration-1000", accentColor)} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-light tracking-[0.4em] text-white uppercase">Nexus</span>
            <span className={cn("text-[8px] font-bold tracking-[0.6em] uppercase transition-colors duration-1000", accentColor)}>Tactical OS V3.0.4</span>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      {isLoggedIn && (
        <div className="absolute inset-0 p-6 pt-20 grid grid-flow-col grid-rows-[repeat(auto-fill,70px)] gap-2 w-fit h-full pointer-events-none">
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Shield size={32} />} 
              label="AEGIS DEFENSE" 
              onClick={() => openWindow('aegis')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Radar size={32} />} 
              label="Tactical Command" 
              onClick={() => openWindow('command')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Target size={32} />} 
              label="Tactical Map" 
              onClick={() => openWindow('map')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Radio size={32} />} 
              label="Secure Comms" 
              onClick={() => openWindow('comms')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Activity size={32} />} 
              label="Strategic AI" 
              onClick={() => openWindow('ai')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Cpu size={32} />} 
              label="Drone Control" 
              onClick={() => openWindow('drones')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Users size={32} />} 
              label="Personnel" 
              onClick={() => openWindow('personnel')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Folder size={32} />} 
              label="Intel Explorer" 
              onClick={() => openWindow('files')} 
              accentColor={accentColor}
            />
          </div>
          <div className="pointer-events-auto">
            <DesktopIcon 
              icon={<Globe size={32} />} 
              label="Nexus Browser" 
              onClick={() => openWindow('browser')} 
              accentColor={accentColor}
            />
          </div>
        </div>
      )}

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {(Object.values(windows) as WindowState[]).map(win => (
          win.isOpen && (
            <Window 
              key={win.id}
              state={win}
              isActive={activeWindow === win.id}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => toggleMaximize(win.id)}
              onFocus={() => focusWindow(win.id)}
              accentColor={accentColor}
            >
              {win.id === 'command' && <CommandCenter />}
              {win.id === 'files' && <FileManager />}
              {win.id === 'ai' && <AIAssistant />}
              {win.id === 'settings' && <Settings theme={theme} setTheme={setTheme} />}
              {win.id === 'aegis' && <AegisDefense />}
              {win.id === 'map' && <TacticalMap />}
              {win.id === 'comms' && <SecureComms />}
              {win.id === 'drones' && <DroneControl />}
              {win.id === 'personnel' && <Personnel />}
              {win.id === 'browser' && <Browser />}
            </Window>
          )
        ))}
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 glass flex items-center px-4 justify-between z-[1000]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-2 group",
              isStartOpen ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <Shield size={20} className={accentColor} />
            <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase hidden md:block">Nexus</span>
          </button>
          
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          
          {(Object.values(windows) as WindowState[]).map(win => win.isOpen && (
            <button
              key={win.id}
              onClick={() => win.isMinimized ? focusWindow(win.id) : activeWindow === win.id ? minimizeWindow(win.id) : focusWindow(win.id)}
              className={cn(
                "p-2 rounded-lg transition-all flex items-center gap-2 relative",
                activeWindow === win.id ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              {win.id === 'command' && <Radar size={18} className={accentColor} />}
              {win.id === 'files' && <Folder size={18} className={accentColor} />}
              {win.id === 'ai' && <Activity size={18} className={accentColor} />}
              {win.id === 'settings' && <SettingsIcon size={18} className={accentColor} />}
              {win.id === 'aegis' && <Shield size={18} className={accentColor} />}
              {win.id === 'map' && <Target size={18} className={accentColor} />}
              {win.id === 'comms' && <Radio size={18} className={accentColor} />}
              {win.id === 'drones' && <Cpu size={18} className={accentColor} />}
              {win.id === 'personnel' && <Users size={18} className={accentColor} />}
              {win.id === 'browser' && <Globe size={18} className={accentColor} />}
              <div className={cn("w-1 h-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2", win.isOpen ? "opacity-100" : "opacity-0", accentBg)} />
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-xs font-medium text-white/80">
          <div className="flex flex-col items-end">
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
          </div>
          <Clock size={16} />
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <StartMenu 
            onClose={() => setIsStartOpen(false)} 
            onOpenApp={(id) => { openWindow(id); setIsStartOpen(false); }}
            accentColor={accentColor}
            accentBg={accentBg}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StartMenu({ onClose, onOpenApp, accentColor, accentBg }: { onClose: () => void, onOpenApp: (id: AppId) => void, accentColor: string, accentBg: string }) {
  const apps: { id: AppId, icon: React.ReactNode, label: string }[] = [
    { id: 'aegis', icon: <Shield size={20} />, label: 'AEGIS Defense' },
    { id: 'command', icon: <Radar size={20} />, label: 'Tactical Command' },
    { id: 'map', icon: <Target size={20} />, label: 'Tactical Map' },
    { id: 'comms', icon: <Radio size={20} />, label: 'Secure Comms' },
    { id: 'ai', icon: <Activity size={20} />, label: 'Strategic AI' },
    { id: 'drones', icon: <Cpu size={20} />, label: 'Drone Control' },
    { id: 'personnel', icon: <Users size={20} />, label: 'Personnel' },
    { id: 'files', icon: <Folder size={20} />, label: 'Intel Explorer' },
    { id: 'browser', icon: <Globe size={20} />, label: 'Nexus Browser' },
    { id: 'settings', icon: <SettingsIcon size={20} />, label: 'System Config' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[998]" onClick={onClose} />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-14 left-4 w-80 glass-dark rounded-2xl border border-white/10 p-4 z-[999] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6 p-2 border-b border-white/5">
           <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", accentBg)}>
              <Shield size={24} className="text-white" />
           </div>
           <div>
              <div className="text-sm font-bold text-white">NEXUS OPERATOR</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest">System Administrator</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group text-left"
            >
              <div className={cn("p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors", accentColor)}>
                {app.icon}
              </div>
              <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors">{app.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2 text-[10px] text-white/40">
              <Search size={12} />
              <span>SEARCH SYSTEM...</span>
           </div>
           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu size={16} className="text-white/60" />
           </button>
        </div>
      </motion.div>
    </>
  );
}

function DesktopIcon({ icon, label, onClick, accentColor }: { icon: React.ReactNode, label: string, onClick: () => void, accentColor: string }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/10 transition-all group w-16"
    >
      <div className={cn("transition-transform duration-300 group-hover:scale-110", accentColor)}>
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <span className="text-[8px] font-medium text-white/80 text-center leading-tight uppercase tracking-tighter">{label}</span>
    </button>
  );
}

interface WindowProps {
  key?: React.Key;
  state: WindowState;
  isActive: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  accentColor: string;
}

function Window({ state, isActive, children, onClose, onMinimize, onMaximize, onFocus, accentColor }: WindowProps) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag={!state.isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: state.isMinimized ? 0.5 : 1, 
        opacity: state.isMinimized ? 0 : 1,
        y: state.isMinimized ? 500 : 0,
        width: state.isMaximized ? '100%' : state.size.width,
        height: state.isMaximized ? 'calc(100% - 48px)' : state.size.height,
        top: state.isMaximized ? 0 : `calc(50% - ${state.size.height / 2}px + ${state.position.y}px)`,
        left: state.isMaximized ? 0 : `calc(50% - ${state.size.width / 2}px + ${state.position.x}px)`,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{ zIndex: state.zIndex }}
      className={cn(
        "absolute pointer-events-auto flex flex-col overflow-hidden rounded-xl",
        state.isMaximized ? "rounded-none" : "glass-dark",
        isActive ? "ring-1 ring-white/20 shadow-2xl" : "shadow-xl"
      )}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="h-10 flex items-center justify-between px-4 bg-white/5 cursor-default select-none"
      >
        <div className="flex items-center gap-2">
          {state.id === 'command' && <Radar size={14} className={accentColor} />}
          {state.id === 'files' && <Folder size={14} className={accentColor} />}
          {state.id === 'ai' && <Activity size={14} className={accentColor} />}
          {state.id === 'settings' && <SettingsIcon size={14} className={accentColor} />}
          <span className="text-xs font-medium text-white/70">{state.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <WindowButton onClick={onMinimize}><Minus size={14} /></WindowButton>
          <WindowButton onClick={onMaximize}><Square size={12} /></WindowButton>
          <WindowButton onClick={onClose} variant="danger"><X size={14} /></WindowButton>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}

function WindowButton({ children, onClick, variant = 'default' }: { children: React.ReactNode, onClick: () => void, variant?: 'default' | 'danger' }) {
  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
        variant === 'danger' ? "hover:bg-red-500/80" : "hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}
