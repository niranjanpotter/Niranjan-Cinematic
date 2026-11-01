import React from 'react';
import { Gauge, Info, Zap, MapPin } from 'lucide-react';
import { DistrictInfo, PORTFOLIO_DATA } from '../../data/portfolioData';

interface DistrictHUDProps {
  currentDistrict: DistrictInfo;
  speed: number;
  carPos: { x: number; y: number; z: number };
  onOpenDetails: () => void;
  isAutoTour: boolean;
  onTurboBoost: () => void;
}

export const DistrictHUD: React.FC<DistrictHUDProps> = ({
  currentDistrict,
  speed,
  carPos,
  onOpenDetails,
  isAutoTour,
  onTurboBoost
}) => {
  const displaySpeed = Math.round(Math.abs(speed) * 6.5);
  const maxSpeed = 160;
  const speedPercent = Math.min(100, Math.round((displaySpeed / maxSpeed) * 100));

  // 6 districts total: intro/01, education/02, skills/03, projects/04, achievements/05, experience/06, contact/07
  const districts = PORTFOLIO_DATA.districts;

  return (
    <div className="fixed bottom-3 left-4 right-4 z-20 pointer-events-none flex flex-col md:flex-row items-end md:items-center justify-between gap-3">
      {/* ================= BOTTOM LEFT: DRIVING CONTROLS BADGES (GTA STYLE) ================= */}
      <div className="flex items-center space-x-2 pointer-events-auto">
        <div className="px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-pink-500/30 shadow-lg flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40">
              W
            </span>
            <span className="text-slate-300 text-[11px]">{isAutoTour ? 'AUTO' : 'DRIVE'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
              S
            </span>
            <span className="text-slate-400 text-[11px]">REVERSE</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
              C
            </span>
            <span className="text-slate-400 text-[11px]">CAM</span>
          </div>
        </div>

        {/* Current District Tag Pill */}
        <button
          onClick={onOpenDetails}
          className="px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-300 text-xs font-mono text-cyan-300 flex items-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <MapPin className="w-3.5 h-3.5 text-pink-400" />
          <span className="font-bold">{currentDistrict.shortLabel}</span>
          <Info className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* ================= BOTTOM CENTER: TIMELINE PROGRESS BAR WITH DOTS (EXACT VIDEO 00:00) ================= */}
      <div className="pointer-events-auto px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-slate-800 shadow-2xl flex items-center space-x-3">
        {districts.map((d, idx) => {
          const isCurrent = currentDistrict.id === d.id;
          const isPassed = carPos.z <= d.zCoord;

          return (
            <div key={d.id} className="flex items-center space-x-2">
              <button
                onClick={onOpenDetails}
                className={`group flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white border border-pink-400/60 shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                    : isPassed
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
                title={d.name}
              >
                {/* Glowing Dot */}
                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    isCurrent
                      ? 'bg-pink-400 animate-ping'
                      : isPassed
                      ? 'bg-cyan-400'
                      : 'bg-slate-700'
                  }`}
                />
                <span className="font-bold tracking-wider">{`0${idx + 1} ${d.shortLabel}`}</span>
              </button>

              {/* Connecting Line between dots */}
              {idx < districts.length - 1 && (
                <div
                  className={`w-3 h-0.5 rounded ${
                    isPassed ? 'bg-cyan-500/60' : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ================= BOTTOM RIGHT: SPEEDOMETER & NITRO (EXACT VIDEO 00:00) ================= */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        {/* Nitro Turbo Button */}
        <button
          onClick={onTurboBoost}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/40 border border-cyan-400/60 hover:border-cyan-300 text-cyan-300 hover:text-white active:scale-95 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
          title="Press Shift or Click for Turbo Nitro acceleration!"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-current animate-pulse" />
          <span>NITRO</span>
        </button>

        {/* Digital Speedometer Gauge */}
        <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 shadow-xl flex items-center space-x-3">
          <Gauge className="w-4 h-4 text-cyan-400" />
          <div className="flex items-baseline space-x-1">
            <span className="font-heading text-2xl font-black text-white leading-none">
              {String(displaySpeed).padStart(3, '0')}
            </span>
            <span className="text-[10px] font-mono text-pink-400 font-bold">KM/H</span>
          </div>
          {/* LED RPM bar */}
          <div className="w-12 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 transition-all duration-150"
              style={{ width: `${speedPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
