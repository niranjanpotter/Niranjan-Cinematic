import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
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
import { vehicleState, DRIVE } from '../../scene/vehicleState';

export type CameraViewMode = 'chase' | 'hood' | 'drone' | 'low';

interface WorldCanvasProps {
  headlightsOn: boolean;
  carStarted: boolean;
  isAutoTour: boolean;
  cameraMode: CameraViewMode;
  currentDistrictIndex: number;
  onDistrictReached: (district: DistrictInfo) => void;
  onOpenDetails: (type: string, data?: unknown) => void;
}

const { damp } = THREE.MathUtils;

// Vehicle physics + camera rig. Everything here mutates Three objects directly
// inside useFrame, so React never re-renders during driving.
const SceneRig: React.FC<{
  carRef: React.RefObject<THREE.Group>;
  carStarted: boolean;
  isAutoTour: boolean;
  cameraMode: CameraViewMode;
  onDistrictReached: (district: DistrictInfo) => void;
}> = ({ carRef, carStarted, isAutoTour, cameraMode, onDistrictReached }) => {
  const { camera } = useThree();
  const keys = useRef<Record<string, boolean>>({});
  const lastDistrictRef = useRef<string>('intro');
  const steerRef = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0.8, -1.5));

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame(({ clock }, rawDelta) => {
    // Clamp delta so a tab-switch hitch cannot fling the car down the road.
    const delta = Math.min(rawDelta, 1 / 30);
    const v = vehicleState;

    const teleport = v.consumeTeleport();
    if (teleport) {
      v.z = teleport.z;
      v.x = 0;
      v.rotation = 0;
      v.speed = teleport.speed;
      steerRef.current = 0;
    }

    // ---------- 1. VEHICLE PHYSICS ----------
    if (carStarted) {
      let targetSpeed = 0;
      let steerInput = 0;

      if (isAutoTour) {
        targetSpeed = DRIVE.autoTourSpeed;
      } else {
        const k = keys.current;
        const forward = k['w'] || k['arrowup'];
        const backward = k['s'] || k['arrowdown'];
        if (forward) targetSpeed = DRIVE.cruiseSpeed;
        else if (backward) targetSpeed = DRIVE.reverseSpeed;
        if (k['a'] || k['arrowleft']) steerInput = 1;
        if (k['d'] || k['arrowright']) steerInput = -1;
      }

      if (v.isNitroActive && targetSpeed < 0) targetSpeed += DRIVE.nitroBoost;

      // Slow throttle response: accelerate gently, brake a little faster.
      const accelLambda = Math.abs(targetSpeed) > Math.abs(v.speed) ? 0.9 : 1.6;
      v.speed = damp(v.speed, targetSpeed, accelLambda, delta);

      // Steering wheel eases in/out instead of snapping.
      steerRef.current = damp(steerRef.current, steerInput, 6, delta);

      const moving = Math.abs(v.speed) > 0.05;
      if (moving) {
        // Yaw rate scales with speed, like a real car; reverse flips the direction.
        const dir = v.speed < 0 ? 1 : -1;
        const yawRate = steerRef.current * dir * Math.min(1, Math.abs(v.speed) / 6) * 1.1;
        v.rotation = THREE.MathUtils.clamp(v.rotation + yawRate * delta, -0.6, 0.6);
      }
      if (isAutoTour || (!moving && steerInput === 0)) {
        v.rotation = damp(v.rotation, 0, 2.5, delta);
      }

      // Move along the heading. Forward is -Z; rotation turns the nose toward ±X.
      const distance = v.speed * delta;
      v.z += Math.cos(v.rotation) * distance;
      v.x += -Math.sin(v.rotation) * distance;

      if (isAutoTour) v.x = damp(v.x, 0, 1.5, delta);

      // Soft walls: hitting the kerb scrubs speed and straightens the car.
      if (Math.abs(v.x) > DRIVE.roadHalfWidth) {
        v.x = Math.sign(v.x) * DRIVE.roadHalfWidth;
        v.speed *= 0.97;
        v.rotation = damp(v.rotation, 0, 8, delta);
      }
      if (v.z < DRIVE.endZ) { v.z = DRIVE.endZ; v.speed = 0; }
      if (v.z > DRIVE.startZ) { v.z = DRIVE.startZ; v.speed = 0; }

      soundManager.updateEngineSpeed(Math.abs(v.speed) / 18);

      for (const d of PORTFOLIO_DATA.districts) {
        if (Math.abs(v.z - d.zCoord) < 14) {
          if (lastDistrictRef.current !== d.id) {
            lastDistrictRef.current = d.id;
            onDistrictReached(d);
            soundManager.playDistrictChime();
          }
          break;
        }
      }
    }

    // ---------- 2. APPLY TO CAR MESH ----------
    const car = carRef.current;
    if (car) {
      car.position.set(v.x, 0, v.z);
      car.rotation.y = v.rotation;
      // Body roll into corners and a faint suspension bob at speed.
      car.rotation.z = damp(car.rotation.z, -steerRef.current * 0.035 * Math.min(1, Math.abs(v.speed) / 8), 4, delta);
      car.position.y = Math.abs(v.speed) > 0.5 ? Math.sin(clock.elapsedTime * 11) * 0.006 : 0;
    }

    // ---------- 3. CAMERA ----------
    const t = clock.elapsedTime;
    const speedT = Math.min(1, Math.abs(v.speed) / 18);
    let cx: number, cy: number, cz: number, lx: number, ly: number, lz: number;
    let lambda = 3;

    if (!carStarted) {
      // Showroom orbit before the journey starts.
      cx = Math.sin(t * 0.15) * 5.5;
      cy = 2.2 + Math.sin(t * 0.3) * 0.3;
      cz = v.z + Math.cos(t * 0.15) * 7;
      lx = v.x; ly = 0.7; lz = v.z - 0.4;
      lambda = 1.5;
    } else {
      // Where the nose points, used to swing the chase cam behind the car.
      const headX = -Math.sin(v.rotation);
      const headZ = -Math.cos(v.rotation);

      switch (cameraMode) {
        case 'hood':
          cx = v.x + headX * 0.4; cy = 1.05; cz = v.z + headZ * 0.4;
          lx = v.x + headX * 30; ly = 0.9; lz = v.z + headZ * 30;
          lambda = 12;
          break;
        case 'drone':
          cx = v.x * 0.4 + Math.sin(t * 0.25) * 9;
          cy = 14 + Math.sin(t * 0.18) * 1.5;
          cz = v.z + 16;
          lx = v.x; ly = 0.5; lz = v.z - 14;
          lambda = 2;
          break;
        case 'low':
          cx = v.x + 3.2; cy = 0.9; cz = v.z + 5.2;
          lx = v.x - 0.3; ly = 0.7; lz = v.z - 10;
          lambda = 4;
          break;
        case 'chase':
        default: {
          const back = 7.2 + speedT * 1.6;
          cx = v.x - headX * back;
          cy = 2.9 + speedT * 0.4;
          cz = v.z - headZ * back;
          lx = v.x + headX * 6; ly = 1.0; lz = v.z + headZ * 6;
          lambda = 2.6;
          break;
        }
      }
    }

    camera.position.x = damp(camera.position.x, cx, lambda, delta);
    camera.position.y = damp(camera.position.y, cy, lambda, delta);
    camera.position.z = damp(camera.position.z, cz, lambda, delta);

    const look = lookTarget.current;
    look.x = damp(look.x, lx, lambda * 1.4, delta);
    look.y = damp(look.y, ly, lambda * 1.4, delta);
    look.z = damp(look.z, lz, lambda * 1.4, delta);
    camera.lookAt(look);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = cameraMode === 'hood' ? 62 + speedT * 10 : 46 + speedT * 10;
      camera.fov = damp(camera.fov, targetFov, 2, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

// Bloom + tone-mapped output. Takes over rendering from R3F (priority 1).
const PostFX: React.FC = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useMemo(() => {
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    // Half-resolution bloom: visually identical for a soft glow, a quarter of the fill cost.
    c.addPass(new UnrealBloomPass(new THREE.Vector2(size.width / 2, size.height / 2), 0.4, 0.5, 0.85));
    c.addPass(new OutputPass());
    return c;
    // size is applied in the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera]);

  useEffect(() => {
    composer.setPixelRatio(gl.getPixelRatio());
    composer.setSize(size.width, size.height);
  }, [composer, gl, size]);

  useEffect(() => () => composer.dispose(), [composer]);

  useFrame(() => composer.render(), 1);
  return null;
};

// Road surface arrows guiding the route
const GpsRouteGuide: React.FC = () => {
  const arrows = useMemo(() => Array.from({ length: 45 }, (_, i) => 15 - i * 12), []);
  return (
    <group position={[0, 0.025, 0]}>
      {arrows.map((zPos) => (
        <mesh key={zPos} position={[0, 0, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 1.1]} />
          <meshBasicMaterial color="#ff007f" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
};

export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  headlightsOn,
  carStarted,
  isAutoTour,
  cameraMode,
  currentDistrictIndex,
  onDistrictReached,
  onOpenDetails
}) => {
  const carRef = useRef<THREE.Group>(null);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [4, 2.2, 8], fov: 46, near: 0.1, far: 850 }}
        gl={{
          antialias: false, // bloom pass handles AA cost better; MSAA + composer double-counts
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        dpr={[0.75, 1.25]}
      >
        <color attach="background" args={['#160a22']} />
        <fog attach="fog" args={['#1d0c2c', 40, 420]} />

        <AdaptiveDpr pixelated />

        {/* Key light: low sunset sun. Fill: cool sky bounce. */}
        <ambientLight intensity={0.25} color="#7c3aed" />
        <directionalLight position={[0, 18, -300]} intensity={1.8} color="#ff9a3c" />
        <directionalLight position={[-30, 40, 30]} intensity={0.45} color="#38bdf8" />

        {/* Image-based lighting built from a few emitters — gives the car body
            and wet road real reflections without loading an HDRI. */}
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={5} color="#ff7a18" position={[0, 6, -40]} scale={[60, 14, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#ff007f" position={[-14, 5, 0]} rotation-y={Math.PI / 2} scale={[80, 4, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#00f0ff" position={[14, 5, 0]} rotation-y={-Math.PI / 2} scale={[80, 4, 1]} />
          <Lightformer form="ring" intensity={0.8} color="#c084fc" position={[0, 30, 0]} rotation-x={Math.PI / 2} scale={[40, 40, 1]} />
        </Environment>

        <SceneRig
          carRef={carRef}
          carStarted={carStarted}
          isAutoTour={isAutoTour}
          cameraMode={cameraMode}
          onDistrictReached={onDistrictReached}
        />

        <HeroCar ref={carRef} headlightsOn={headlightsOn} isMoving={carStarted} />

        <GpsRouteGuide />
        <EnvironmentElements />

        {PORTFOLIO_DATA.districts.map((district, idx) => (
          <DistrictMarker
            key={district.id}
            district={district}
            isActive={currentDistrictIndex === idx}
            onSelect={() => onOpenDetails(district.id)}
          />
        ))}

        <IntroDistrict onOpenDetails={() => onOpenDetails('intro')} carStarted={carStarted} />
        <EducationDistrict onOpenDetails={() => onOpenDetails('education')} />
        <TechDistrict onOpenDetails={() => onOpenDetails('skills')} />
        <ProjectsDistrict onSelectProject={(proj: ProjectItem) => onOpenDetails('project', proj)} />
        <AchievementsDistrict onOpenDetails={() => onOpenDetails('achievements')} />
        <ExperienceDistrict onOpenDetails={() => onOpenDetails('experience')} />
        <ContactDistrict onOpenDetails={() => onOpenDetails('contact')} />

        <PostFX />
      </Canvas>
    </div>
  );
};
