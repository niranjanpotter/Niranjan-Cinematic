import React from 'react';
import { Volume2, VolumeX, Compass, Navigation, ExternalLink, Calendar, Camera } from 'lucide-react';
import { PORTFOLIO_DATA, DistrictInfo } from '../../data/portfolioData';
import { soundManager } from '../../audio/soundManager';
import { CameraViewMode } from '../Scene/WorldCanvas';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoTour: boolean;
  onToggleAutoTour: () => void;
  cameraMode: CameraViewMode;
  onCycleCamera: () => void;
  onTeleportDistrict: (district: DistrictInfo) => void;
  currentDistrictIndex: number;
  onOpenDetails: (type: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  isAutoTour,
  onToggleAutoTour,
  cameraMode,
  onCycleCamera,
  onTeleportDistrict,
  currentDistrictIndex,
  onOpenDetails
}) => {
  const cameraLabels: Record<CameraViewMode, string> = {
    chase: 'Chase Cam',
    hood: 'Hood Cam',
    drone: 'Drone Cam',
    low: 'Low Angle'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between pointer-events-auto">
      {/* Brand & Creator Photo Avatar */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onOpenDetails('intro')}
          className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-pink-500/50 hover:border-cyan-400 flex items-center space-x-2.5 transition-all group text-left cursor-pointer shadow-lg active:scale-95"
        >
          {/* Niranjan's Real Photo Avatar Thumbnail */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-pink-500 shadow-[0_0_10px_#ec4899] group-hover:border-cyan-400 transition-colors">
            <img
              src="/avatar.png"
              alt="Niranjan Kumar Potter"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="font-heading font-black text-xs tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300">
              POTTER CITY
            </div>
            <div className="text-[10px] text-slate-300 font-mono">
              NIRANJAN KUMAR POTTER
            </div>
          </div>
        </button>

        {/* Quick External Links */}
        <div className="hidden md:flex items-center space-x-1.5">
          <a
            href={PORTFOLIO_DATA.personal.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-slate-800 hover:border-blue-400 text-xs text-blue-300 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Book Call</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-slate-800 hover:border-cyan-400 text-xs text-cyan-300 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-slate-800 hover:border-purple-400 text-xs text-purple-300 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* District Fast Navigator */}
      <div className="hidden xl:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 shadow-xl">
        {PORTFOLIO_DATA.districts.map((d, idx) => {
          const isActive = currentDistrictIndex === idx;
          return (
            <button
              key={d.id}
              onClick={() => {
                soundManager.playWarp();
                onTeleportDistrict(d);
              }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white border border-pink-400/60 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {d.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Controls & Sound Toggles */}
      <div className="flex items-center space-x-2">
        {/* Camera View Switcher */}
        <button
          onClick={() => {
            soundManager.playClick();
            onCycleCamera();
          }}
          className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Switch Camera View Angle (or press 'C' key)"
        >
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{cameraLabels[cameraMode]}</span>
        </button>

        {/* Drive Mode Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleAutoTour();
          }}
          className={`px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
            isAutoTour
              ? 'border border-pink-500/60 text-pink-300 bg-pink-950/30'
              : 'border border-slate-800 text-slate-300 hover:border-slate-600'
          }`}
          title="Toggle between Auto Cruise and Manual WASD Driving"
        >
          {isAutoTour ? (
            <>
              <Compass className="w-3.5 h-3.5 text-pink-400 animate-spin" />
              <span>Autopilot</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Free Drive</span>
            </>
          )}
        </button>

        {/* Audio Mute Button */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Synth Music & Engine' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          )}
        </button>
      </div>
    </header>
  );
};
