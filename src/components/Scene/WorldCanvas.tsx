import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { HeroCar } from './HeroCar';
import { EnvironmentElements } from './EnvironmentElements';
import { DistrictMarker } from './Districts/DistrictMarker';
import { IntroDistrict } from './Districts/IntroDistrict';
import { EducationDistrict } from './Districts/EducationDistrict';
import { TechDistrict } from './Districts/TechDistrict';
import { ProjectsDistrict } from './Districts/ProjectsDistrict';
import { AchievementsDistrict } from './Districts/AchievementsDistrict';
import { ExperienceDistrict } from './Districts/ExperienceDistrict';
import { ContactDistrict } from './Districts/ContactDistrict';
import { PORTFOLIO_DATA, DistrictInfo, ProjectItem } from '../../data/portfolioData';
import { soundManager } from '../../audio/soundManager';

export type CameraViewMode = 'chase' | 'hood' | 'drone' | 'low';

interface WorldCanvasProps {
  carPos: { x: number; y: number; z: number };
  setCarPos: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>;
  carRotation: number;
  setCarRotation: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  headlightsOn: boolean;
  carStarted: boolean;
  isAutoTour: boolean;
  cameraMode: CameraViewMode;
  currentDistrictIndex: number;
  onDistrictReached: (district: DistrictInfo) => void;
  onOpenDetails: (type: string, data?: unknown) => void;
}

// Camera & Vehicle Physics Rig inside Canvas context
const SceneRig: React.FC<{
  carPos: { x: number; y: number; z: number };
  setCarPos: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>;
  carRotation: number;
  setCarRotation: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  carStarted: boolean;
  isAutoTour: boolean;
  cameraMode: CameraViewMode;
  onDistrictReached: (district: DistrictInfo) => void;
}> = ({
  carPos,
  setCarPos,
  carRotation,
  setCarRotation,
  speed,
  setSpeed,
  carStarted,
  isAutoTour,
  cameraMode,
  onDistrictReached
}) => {
  const { camera } = useThree();
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastDistrictRef = useRef<string>('intro');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    // 1. VEHICLE CONTROLS & PHYSICS
    if (carStarted) {
      if (isAutoTour) {
        const targetSpeed = -16.0;
        setSpeed((prev) => prev + (targetSpeed - prev) * delta * 2.5);

        setCarPos((prev) => {
          let nextZ = prev.z + speed * delta;
          if (nextZ < -520) nextZ = -520;
          const nextX = prev.x + (0 - prev.x) * delta * 2;
          return { x: nextX, y: 0, z: nextZ };
        });

        setCarRotation((prev) => prev + (0 - prev) * delta * 4);
      } else {
        let targetSpeed = 0;
        let steering = 0;

        const forward = keysPressed.current['w'] || keysPressed.current['arrowup'];
        const backward = keysPressed.current['s'] || keysPressed.current['arrowdown'];
        const left = keysPressed.current['a'] || keysPressed.current['arrowleft'];
        const right = keysPressed.current['d'] || keysPressed.current['arrowright'];

        if (forward) targetSpeed = -22;
        else if (backward) targetSpeed = 10;

        if (left) steering = 0.95;
        if (right) steering = -0.95;

        setSpeed((prev) => prev + (targetSpeed - prev) * delta * 4.8);

        if (Math.abs(speed) > 0.1) {
          setCarRotation((prev) => {
            const rotDelta = steering * delta * (speed < 0 ? 1 : -1);
            return THREE.MathUtils.clamp(prev + rotDelta, -0.45, 0.45);
          });
        } else {
          setCarRotation((prev) => prev * 0.86);
        }

        setCarPos((prev) => {
          let nextZ = prev.z + speed * delta;
          let nextX = prev.x + Math.sin(carRotation) * Math.abs(speed) * delta * (speed < 0 ? 1 : -1);

          nextX = THREE.MathUtils.clamp(nextX, -5.2, 5.2);
          nextZ = THREE.MathUtils.clamp(nextZ, -525, 20);

          return { x: nextX, y: 0, z: nextZ };
        });
      }

      // Update engine audio pitch
      soundManager.updateEngineSpeed(Math.abs(speed) / 22);

      // Check district triggers
      const districts = PORTFOLIO_DATA.districts;
      for (let i = 0; i < districts.length; i++) {
        const d = districts[i];
        if (Math.abs(carPos.z - d.zCoord) < 18) {
          if (lastDistrictRef.current !== d.id) {
            lastDistrictRef.current = d.id;
            onDistrictReached(d);
            soundManager.playDistrictChime();
          }
          break;
        }
      }
    }

    // 2. DYNAMIC CAMERA ANGLE SYSTEM
    let targetCamX = carPos.x * 0.35;
    let targetCamY = 3.6;
    let targetCamZ = carPos.z + 8.4;
    let lookTargetX = carPos.x * 0.25;
    let lookTargetY = carPos.y + 1.1;
    let lookTargetZ = carPos.z - 9;

    if (!carStarted) {
      targetCamX = 3.4;
      targetCamY = 3.2;
      targetCamZ = 8.5;
      lookTargetX = 0;
      lookTargetY = 0.8;
      lookTargetZ = -1.5;
    } else {
      switch (cameraMode) {
        case 'hood':
          targetCamX = carPos.x;
          targetCamY = carPos.y + 1.15;
          targetCamZ = carPos.z - 0.95;
          lookTargetX = carPos.x;
          lookTargetY = carPos.y + 1.15;
          lookTargetZ = carPos.z - 35;
          break;

        case 'drone':
          targetCamX = carPos.x * 0.5 + Math.sin(Date.now() * 0.0006) * 6;
          targetCamY = 16.0;
          targetCamZ = carPos.z + 18.0;
          lookTargetX = carPos.x;
          lookTargetY = 0.5;
          lookTargetZ = carPos.z - 18;
          break;

        case 'low':
          targetCamX = carPos.x + 3.4;
          targetCamY = 1.1;
          targetCamZ = carPos.z + 5.8;
          lookTargetX = carPos.x - 0.4;
          lookTargetY = 0.7;
          lookTargetZ = carPos.z - 14;
          break;

        case 'chase':
        default:
          const shake = (Math.abs(speed) > 18 ? (Math.random() - 0.5) * 0.02 : 0);
          targetCamX = carPos.x * 0.35 + shake;
          targetCamY = 3.4 + shake;
          targetCamZ = carPos.z + 8.2;
          lookTargetX = carPos.x * 0.2;
          lookTargetY = carPos.y + 1.0;
          lookTargetZ = carPos.z - 12;
          break;
      }
    }

    if ('fov' in camera) {
      const persCamera = camera as THREE.PerspectiveCamera;
      const targetFov = 50 + (Math.abs(speed) / 24) * 14;
      persCamera.fov += (targetFov - persCamera.fov) * delta * 3.5;
      persCamera.updateProjectionMatrix();
    }

    camera.position.x += (targetCamX - camera.position.x) * delta * 5.2;
    camera.position.y += (targetCamY - camera.position.y) * delta * 5.2;
    camera.position.z += (targetCamZ - camera.position.z) * delta * 5.2;

    camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);
  });

  return null;
};

// Road surface arrows guiding the route
const GpsRouteGuide: React.FC = () => {
  const arrows = Array.from({ length: 45 }).map((_, i) => 15 - i * 12);

  return (
    <group position={[0, 0.025, 0]}>
      {arrows.map((zPos, idx) => (
        <group key={idx} position={[0, 0, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry args={[0.7, 1.1]} />
            <meshBasicMaterial color="#ff007f" transparent opacity={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  carPos,
  setCarPos,
  carRotation,
  setCarRotation,
  speed,
  setSpeed,
  headlightsOn,
  carStarted,
  isAutoTour,
  cameraMode,
  currentDistrictIndex,
  onDistrictReached,
  onOpenDetails
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [3.4, 3.2, 8.5], fov: 50, near: 0.1, far: 850 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#1c0c2a']} />
        <fog attach="fog" args={['#240e32', 50, 480]} />

        {/* Studio Lighting - Optimized with NO shadow overhead */}
        <ambientLight intensity={0.7} color="#6d28d9" />
        <directionalLight position={[0, 30, -350]} intensity={2.6} color="#ff8833" />
        <directionalLight position={[-30, 45, 30]} intensity={0.8} color="#38bdf8" />

        {/* Scene Rig (Physics & Camera) */}
        <SceneRig
          carPos={carPos}
          setCarPos={setCarPos}
          carRotation={carRotation}
          setCarRotation={setCarRotation}
          speed={speed}
          setSpeed={setSpeed}
          carStarted={carStarted}
          isAutoTour={isAutoTour}
          cameraMode={cameraMode}
          onDistrictReached={onDistrictReached}
        />

        {/* The Black Hero Supercar */}
        <HeroCar
          position={[carPos.x, carPos.y, carPos.z]}
          rotation={[0, carRotation, 0]}
          headlightsOn={headlightsOn}
          isMoving={Math.abs(speed) > 0.1}
          speed={speed}
        />

        {/* Road Surface Route Decals */}
        <GpsRouteGuide />

        {/* GTA Sunset Ocean, Palm Boulevard & Skyline */}
        <EnvironmentElements />

        {/* District Overhead Gateway Portals */}
        {PORTFOLIO_DATA.districts.map((district, idx) => (
          <DistrictMarker
            key={district.id}
            district={district}
            isActive={currentDistrictIndex === idx}
            onSelect={() => onOpenDetails(district.id)}
          />
        ))}

        {/* 3D Architectural Districts */}
        <IntroDistrict
          onOpenDetails={() => onOpenDetails('intro')}
          carStarted={carStarted}
        />

        <EducationDistrict
          onOpenDetails={() => onOpenDetails('education')}
        />

        <TechDistrict
          onOpenDetails={() => onOpenDetails('skills')}
        />

        <ProjectsDistrict
          onSelectProject={(proj: ProjectItem) => onOpenDetails('project', proj)}
        />

        <AchievementsDistrict
          onOpenDetails={() => onOpenDetails('achievements')}
        />

        <ExperienceDistrict
          onOpenDetails={() => onOpenDetails('experience')}
        />

        <ContactDistrict
          onOpenDetails={() => onOpenDetails('contact')}
        />
      </Canvas>
    </div>
  );
};
