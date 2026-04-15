import React from 'react';
import { Map as MapIcon, Target, Navigation, Wind } from 'lucide-react';
import { Map, Marker } from 'pigeon-maps';

export default function TacticalMap() {
  const [center, setCenter] = React.useState<[number, number]>([24.7136, 46.6753]);
  const [zoom, setZoom] = React.useState(5);

  return (
    <div className="flex flex-col h-full bg-[#0a0c0a] text-emerald-500 font-mono overflow-hidden">
      <div className="h-12 border-b border-emerald-900/30 flex items-center justify-between px-6 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <MapIcon size={16} className="text-emerald-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Tactical_Map_v5.0_Live</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-emerald-700">
          <span className="flex items-center gap-1"><Navigation size={12} /> {center[0].toFixed(4)}° N, {center[1].toFixed(4)}° E</span>
          <span className="flex items-center gap-1"><Wind size={12} /> 8 KTS NE</span>
        </div>
      </div>

      <div className="flex-1 relative bg-black">
        <Map 
          height={undefined} 
          center={center} 
          zoom={zoom} 
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
          mouseEvents={true}
          touchEvents={true}
        >
          {/* Saudi Arabia Base */}
          <Marker 
            width={50}
            anchor={[24.7136, 46.6753]} 
            color="#10b981"
          />
          
          {/* Iran Target */}
          <Marker 
            width={50}
            anchor={[35.6892, 51.3890]} 
            color="#ef4444"
          />
        </Map>

        {/* Tactical Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
          
          {/* HUD Elements */}
          <div className="absolute top-4 right-4 w-48 space-y-2 pointer-events-auto">
             <div className="bg-black/80 border border-emerald-900/30 p-3 rounded backdrop-blur-sm">
                <div className="text-[9px] font-bold text-emerald-700 uppercase mb-2">Terrain Analysis</div>
                <div className="h-1 bg-emerald-950 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-2/3" />
                </div>
                <div className="mt-2 text-[8px] flex justify-between">
                   <span>ELEVATION</span>
                   <span>1,240M</span>
                </div>
             </div>
             
             <div className="bg-black/80 border border-emerald-900/30 p-3 rounded backdrop-blur-sm">
                <div className="text-[9px] font-bold text-emerald-700 uppercase mb-1">Target Status</div>
                <div className="text-[10px] text-red-500 font-bold animate-pulse">LOCKED ON IRAN_HQ</div>
             </div>
          </div>

          <div className="absolute bottom-4 left-4 pointer-events-auto flex gap-2">
            <div className="bg-black/80 border border-emerald-900/30 p-2 rounded text-[8px] flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>BASE_SAUDI_ARABIA</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>TARGET_IRAN_HQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 border-t border-emerald-900/30 flex items-center px-6 gap-6 bg-emerald-950/10">
         <button onClick={() => setZoom(z => Math.min(z + 1, 18))} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">Zoom In</button>
         <button onClick={() => setZoom(z => Math.max(z - 1, 1))} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">Zoom Out</button>
         <button onClick={() => setCenter([24.7136, 46.6753])} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">Reset Base</button>
      </div>
    </div>
  );
}
