import React, { useState } from 'react';
import { Play, FastForward, ShieldCheck, Compass, FileText, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface CinematicIntroProps {
  onStartJourney: () => void;
  onSkipIntro: () => void;
  onOpenDetails: (type: string) => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onStartJourney,
  onSkipIntro,
  onOpenDetails
}) => {
  // Step 0: "HOLD / CLICK TO DRIVE" establishing view (just like 00:00 in the video)
  // Step 1: GTA Character splash card (just like 00:05 in the video)
  const [introStep, setIntroStep] = useState<0 | 1>(0);

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-between pointer-events-none select-none">
      {/* ================= TOP HUD: TIME & LOCATION (GTA STYLE) ================= */}
      <div className="w-full px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-pink-500/50 text-[11px] font-mono text-pink-400 font-bold tracking-widest flex items-center space-x-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span>POTTER CITY</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">LEVEL 99</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
            11:42 PM • OCEAN BLVD
          </div>
          <button
            onClick={onSkipIntro}
            className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <span>Skip Cutscene</span>
            <FastForward className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* ================= STEP 0: "HOLD TO DRIVE" ESTABLISHING VIEW (VIDEO 00:00) ================= */}
      {introStep === 0 && (
        <div className="my-auto mx-auto text-center pointer-events-auto flex flex-col items-center px-4">
          <div className="text-xs font-mono text-cyan-300 tracking-[0.35em] uppercase mb-2 drop-shadow-[0_0_12px_rgba(0,240,255,0.9)]">
            SRI TECH CINEMATICS PRESENTS
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-500 to-cyan-400 tracking-wider mb-2 drop-shadow-[0_0_40px_rgba(255,0,128,0.6)]">
            POTTER CITY
          </h1>

          <div className="text-sm md:text-base font-mono text-slate-200 mb-8 max-w-lg">
            GTA-Style 3D Portfolio • Drive through Niranjan's career, architecture, and projects
          </div>

          {/* Central "HOLD TO DRIVE" Button */}
          <button
            onClick={() => setIntroStep(1)}
            className="group relative px-9 py-4 sm:px-11 sm:py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 text-white font-heading font-black text-base sm:text-lg tracking-widest hover:brightness-110 active:scale-95 shadow-[0_0_50px_rgba(236,72,153,0.7)] flex items-center space-x-3 transition-all cursor-pointer border border-white/20"
          >
            <Play className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span>CLICK TO ENTER WORLD</span>
            <ChevronRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-4 text-[11px] font-mono text-slate-400">
            Press [ENTER] or Click to meet Niranjan
          </div>
        </div>
      )}

      {/* ================= STEP 1: GTA CHARACTER SPLASH CARD (EXACT VIDEO 00:05) ================= */}
      {introStep === 1 && (
        <div className="max-w-4xl mx-auto px-4 pointer-events-auto my-auto w-full animate-fadeIn">
          <div className="relative rounded-3xl overflow-hidden border border-pink-500/50 bg-gradient-to-b from-black/90 via-slate-950/95 to-purple-950/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(236,72,153,0.35)] p-5 sm:p-7 md:p-8">
            {/* Ambient Corner Glows */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Niranjan's Real Photograph in GTA Poster Style */}
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden border-2 border-cyan-400/60 bg-gradient-to-t from-black via-slate-900 to-purple-900/60 shadow-2xl flex flex-col justify-between p-4 group">
                {/* GTA Style Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded bg-black/80 border border-pink-500/60 text-[10px] font-mono text-pink-300 font-bold tracking-wider">
                    PROTAGONIST // LEAD
                  </span>
                  <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-mono text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Niranjan's Real Photograph */}
                <div className="relative my-3 flex items-center justify-center">
                  <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-pink-500/60 shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                    <img
                      src="/avatar.png"
                      alt="Niranjan Kumar Potter"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle GTA Sunset Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Supercar Spec Card */}
                <div className="bg-black/85 backdrop-blur rounded-xl p-3 border border-slate-800 z-10">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>SUPERCAR SPEC</span>
                    <span className="text-amber-400 font-bold">V10 CARBON</span>
                  </div>
                  <div className="text-xs font-bold text-white flex items-center justify-between mt-0.5">
                    <span className="flex items-center space-x-1.5">
                      <Zap className="w-3 h-3 text-cyan-400 fill-current" />
                      <span>BLACK HURACÁN GT</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">READY</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mission Briefing & Title */}
              <div className="md:col-span-7 space-y-4">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[11px] font-mono font-bold">
                    MULE 4
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-[11px] font-mono font-bold">
                    CLOUDHUB 2.0
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-[11px] font-mono font-bold">
                    AGENTIC AI
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] font-mono font-bold">
                    JAVA 17
                  </span>
                </div>

                <div>
                  <div className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>TAKING THE WHEEL</span>
                  </div>
                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wider">
                    {PORTFOLIO_DATA.personal.name}
                  </h1>
                  <h2 className="text-sm md:text-base text-cyan-300 font-semibold mt-1">
                    {PORTFOLIO_DATA.personal.heroTitle}
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.personal.bio}
                </p>

                {/* Key Career Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-black/60 border border-slate-800">
                    <div className="font-heading font-bold text-amber-400 text-sm">-35% Latency</div>
                    <div className="text-[10px] text-slate-400">DataWeave Optimization</div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/60 border border-slate-800">
                    <div className="font-heading font-bold text-cyan-400 text-sm">CloudHub 2.0</div>
                    <div className="text-[10px] text-slate-400">Full-Lifecycle Migration</div>
                  </div>
                </div>

                {/* Route Briefing */}
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-xs space-y-1">
                  <div className="font-mono text-cyan-300 font-bold uppercase flex items-center space-x-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>MISSION ROUTE // 6 DISTRICTS:</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    01 Education • 02 Tech Towers • 03 Projects Boulevard • 04 Achievements • 05 Corporate Hub • 06 The Garage
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onStartJourney}
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-heading font-black text-sm tracking-wider hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>START IGNITION // DRIVE</span>
                  </button>

                  <button
                    onClick={onSkipIntro}
                    className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>FREE DRIVE</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails('intro')}
                    className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOTTOM BAR: CONTROLS & GTA CREDITS ================= */}
      <div className="w-full px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 font-bold">[W/▲] DRIVE</span>
          <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 font-bold">[S/▼] REVERSE</span>
          <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 font-bold">[SHIFT] NITRO</span>
          <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-800 text-slate-300 font-bold">[C] CAM</span>
        </div>

        <div className="text-[11px] font-mono text-pink-400 font-bold">
          SRI TECH // POTTER CITY
        </div>
      </div>
    </div>
  );
};
