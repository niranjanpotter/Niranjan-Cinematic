import React, { useState, useEffect } from 'react';
import { WorldCanvas, CameraViewMode } from './components/Scene/WorldCanvas';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/UI/Navbar';
import { CinematicIntro } from './components/UI/CinematicIntro';
import { DistrictHUD } from './components/UI/DistrictHUD';
import { DetailModal } from './components/UI/DetailModal';
import { MobileFallback } from './components/UI/MobileFallback';
import { PORTFOLIO_DATA, DistrictInfo } from './data/portfolioData';
import { soundManager } from './audio/soundManager';

export const App: React.FC = () => {
  // Vehicle state
  const [carPos, setCarPos] = useState({ x: 0, y: 0, z: 0 });
  const [carRotation, setCarRotation] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [carStarted, setCarStarted] = useState(false);
  const [isNitroActive, setIsNitroActive] = useState(false);

  // Camera & Mode state
  const [cameraMode, setCameraMode] = useState<CameraViewMode>('chase');
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isAutoTour, setIsAutoTour] = useState(true);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [currentDistrictIndex, setCurrentDistrictIndex] = useState(0);
  const [currentDistrict, setCurrentDistrict] = useState<DistrictInfo>(PORTFOLIO_DATA.districts[0]);

  // Modal inspection state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: string;
    data?: unknown;
  }>({
    isOpen: false,
    type: 'intro'
  });

  const [forceMobile2D, setForceMobile2D] = useState(false);

  // Cycle camera views: chase -> hood -> drone -> low
  const handleCycleCamera = () => {
    soundManager.playClick();
    setCameraMode((prev) => {
      if (prev === 'chase') return 'hood';
      if (prev === 'hood') return 'drone';
      if (prev === 'drone') return 'low';
      return 'chase';
    });
  };

  // Turbo Nitro Boost
  const handleTurboBoost = () => {
    soundManager.playNitroBoost();
    setIsNitroActive(true);
    setSpeed((prev) => (prev < 0 ? prev - 12 : -22));
    setTimeout(() => {
      setIsNitroActive(false);
    }, 1200);
  };

  // Keyboard listeners: 'C' key switches camera, 'Shift' fires Nitro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c') {
        handleCycleCamera();
      } else if (e.key === 'Shift' && carStarted && !isNitroActive) {
        handleTurboBoost();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carStarted, isNitroActive]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Start Journey Sequence (Choreographed Ignition + Music)
  const handleStartJourney = () => {
    soundManager.playIgnition();
    setHeadlightsOn(true);
    setIsIntroActive(false);

    setTimeout(() => {
      setCarStarted(true);
      setSpeed(-12);
    }, 700);
  };

  // Skip Intro directly into free driving
  const handleSkipIntro = () => {
    soundManager.playClick();
    soundManager.startEngineHum();
    soundManager.startCyberMusic();
    setHeadlightsOn(true);
    setCarStarted(true);
    setIsIntroActive(false);
    setIsAutoTour(false);
  };

  // Teleport to a specific district
  const handleTeleportDistrict = (district: DistrictInfo) => {
    const idx = PORTFOLIO_DATA.districts.findIndex((d) => d.id === district.id);
    if (idx !== -1) {
      setCurrentDistrictIndex(idx);
      setCurrentDistrict(district);
      setCarPos({ x: 0, y: 0, z: district.zCoord + 8 });
      setCarRotation(0);
      setSpeed(isAutoTour ? -8 : 0);
      if (!carStarted) {
        setCarStarted(true);
        setHeadlightsOn(true);
        setIsIntroActive(false);
        soundManager.startEngineHum();
        soundManager.startCyberMusic();
      }
    }
  };

  // District reached trigger
  const handleDistrictReached = (district: DistrictInfo) => {
    const idx = PORTFOLIO_DATA.districts.findIndex((d) => d.id === district.id);
    if (idx !== -1) {
      setCurrentDistrictIndex(idx);
      setCurrentDistrict(district);
    }
  };

  // Open inspection drawer
  const handleOpenDetails = (type: string, data?: unknown) => {
    soundManager.playClick();
    setModalState({
      isOpen: true,
      type,
      data
    });
  };

  // Close modal
  const handleCloseModal = () => {
    soundManager.playClick();
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  if (forceMobile2D) {
    return (
      <div className="relative min-h-screen">
        <button
          onClick={() => setForceMobile2D(false)}
          className="fixed top-4 right-4 z-50 cyber-panel px-3 py-1.5 text-xs text-cyan-400 font-mono rounded-lg"
        >
          Switch to 3D World
        </button>
        <MobileFallback
          onSelectDistrict={handleTeleportDistrict}
          onOpenDetails={handleOpenDetails}
        />
        <DetailModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          data={modalState.data}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020409]">
      {/* 3D World WebGL Canvas */}
      <ErrorBoundary
        fallback={
          <div className="absolute inset-0 bg-[#020409]">
            <MobileFallback
              onSelectDistrict={handleTeleportDistrict}
              onOpenDetails={handleOpenDetails}
            />
          </div>
        }
      >
        <WorldCanvas
          carPos={carPos}
          setCarPos={setCarPos}
          carRotation={carRotation}
          setCarRotation={setCarRotation}
          speed={speed}
          setSpeed={setSpeed}
          headlightsOn={headlightsOn}
          carStarted={carStarted}
          isAutoTour={isAutoTour}
          cameraMode={cameraMode}
          currentDistrictIndex={currentDistrictIndex}
          onDistrictReached={handleDistrictReached}
          onOpenDetails={handleOpenDetails}
        />
      </ErrorBoundary>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Speed Streaks Overlay during Nitro Boost */}
      {isNitroActive && (
        <div className="absolute inset-0 pointer-events-none border-4 border-cyan-400/50 shadow-[inset_0_0_90px_rgba(0,240,255,0.45)] animate-pulse" />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isAutoTour={isAutoTour}
        onToggleAutoTour={() => setIsAutoTour(!isAutoTour)}
        cameraMode={cameraMode}
        onCycleCamera={handleCycleCamera}
        onTeleportDistrict={handleTeleportDistrict}
        currentDistrictIndex={currentDistrictIndex}
        onOpenDetails={handleOpenDetails}
      />

      {/* Cinematic Opening Sequence */}
      {isIntroActive && (
        <CinematicIntro
          onStartJourney={handleStartJourney}
          onSkipIntro={handleSkipIntro}
          onOpenDetails={handleOpenDetails}
        />
      )}

      {/* In-Game Cockpit HUD */}
      {!isIntroActive && (
        <DistrictHUD
          currentDistrict={currentDistrict}
          speed={speed}
          carPos={carPos}
          onOpenDetails={() => handleOpenDetails(currentDistrict.id)}
          isAutoTour={isAutoTour}
          onTurboBoost={handleTurboBoost}
        />
      )}

      {/* Interactive Detail Modal / Cyberpunk Drawer */}
      <DetailModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        data={modalState.data}
        onClose={handleCloseModal}
      />

      {/* 2D Fallback Quick Switcher Button on small screens */}
      <button
        onClick={() => setForceMobile2D(true)}
        className="fixed top-16 right-4 z-20 cyber-panel px-2.5 py-1 rounded text-[10px] font-mono text-slate-400 hover:text-cyan-300 md:hidden"
      >
        2D Map View
      </button>
    </div>
  );
};
