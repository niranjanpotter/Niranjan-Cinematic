import { useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { vehicleState } from '../../scene/vehicleState';

interface HeroCarProps {
  headlightsOn: boolean;
  isMoving: boolean;
}

// Position/rotation are driven directly by SceneRig through the forwarded group ref.
export const HeroCar = forwardRef<THREE.Group, HeroCarProps>(({ headlightsOn, isMoving }, ref) => {
  const wheelsRef = useRef<THREE.Group[]>([]);
  const underglowRef = useRef<THREE.PointLight>(null);
  const nitroFlameRef1 = useRef<THREE.Mesh>(null);
  const nitroFlameRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const speed = vehicleState.speed;
    // Wheel radius ~0.35 -> angular velocity = v / r
    const spin = (speed / 0.35) * delta;
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += spin;
    });

    const time = clock.elapsedTime * 6;
    if (underglowRef.current) {
      underglowRef.current.intensity = 2.4 + Math.sin(time) * 0.8;
    }

    const throttle = Math.min(1, Math.abs(speed) / 12);
    const nitro = vehicleState.isNitroActive ? 1.8 : 1;
    const flameScale = isMoving ? (0.25 + throttle * 0.75 + Math.sin(time * 4) * 0.25) * nitro : 0.15;
    nitroFlameRef1.current?.scale.set(flameScale, flameScale, flameScale * 1.6);
    nitroFlameRef2.current?.scale.set(flameScale, flameScale, flameScale * 1.6);
  });

  return (
    <group ref={ref}>
      {/* ================= HIGH-END MID-ENGINE SUPERCAR BODY ================= */}
      {/* Lower Main Hull / Carbon Tub */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.14, 0.32, 4.6]} />
        <meshPhysicalMaterial
          color="#05070f"
          roughness={0.18}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Aerodynamic Front Nose Cone (Sharp angular wedge) */}
      <mesh position={[0, 0.32, -2.15]} rotation={[0.26, 0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.22, 1.0]} />
        <meshStandardMaterial color="#05070e" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Front Carbon-Fiber Lower Splitter */}
      <mesh position={[0, 0.16, -2.52]}>
        <boxGeometry args={[2.08, 0.04, 0.48]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.8} />
      </mesh>

      {/* Front Hood Scoop & Twin Heat Extractors */}
      <mesh position={[0, 0.47, -1.15]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[1.45, 0.12, 1.65]} />
        <meshStandardMaterial color="#090d18" roughness={0.15} metalness={0.92} />
      </mesh>

      {/* Muscular Rear Quarter Panels / Flared Fenders */}
      <mesh position={[-1.05, 0.44, 1.1]} rotation={[0, 0.07, 0]} castShadow>
        <boxGeometry args={[0.36, 0.42, 2.2]} />
        <meshStandardMaterial color="#060912" roughness={0.08} metalness={0.95} />
      </mesh>
      <mesh position={[1.05, 0.44, 1.1]} rotation={[0, -0.07, 0]} castShadow>
        <boxGeometry args={[0.36, 0.42, 2.2]} />
        <meshStandardMaterial color="#060912" roughness={0.08} metalness={0.95} />
      </mesh>

      {/* Side Air Intake Scoops behind doors (Mid-engine intake vents) */}
      <group position={[-1.06, 0.45, 0.2]}>
        <mesh rotation={[0, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.32, 0.7]} />
          <meshStandardMaterial color="#020408" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
      <group position={[1.06, 0.45, 0.2]}>
        <mesh rotation={[0, -0.25, 0]}>
          <boxGeometry args={[0.15, 0.32, 0.7]} />
          <meshStandardMaterial color="#020408" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* Side Skirt Aero Blades with Neon Pinstripe */}
      <mesh position={[-1.09, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.08, 3.3]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.8} />
      </mesh>
      <mesh position={[1.09, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.08, 3.3]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.8} />
      </mesh>

      {/* Slanted Side Mirrors */}
      <mesh position={[-1.15, 0.65, -0.6]} rotation={[0, 0.2, -0.1]}>
        <boxGeometry args={[0.22, 0.08, 0.32]} />
        <meshStandardMaterial color="#0a0f1d" roughness={0.1} metalness={0.95} />
      </mesh>
      <mesh position={[1.15, 0.65, -0.6]} rotation={[0, -0.2, 0.1]}>
        <boxGeometry args={[0.22, 0.08, 0.32]} />
        <meshStandardMaterial color="#0a0f1d" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Tinted Cockpit Canopy / Sloped Roof */}
      <mesh position={[0, 0.76, 0.16]} castShadow>
        <boxGeometry args={[1.36, 0.48, 2.25]} />
        <meshStandardMaterial
          color="#020408"
          roughness={0.04}
          metalness={0.98}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Raked Windshield */}
      <mesh position={[0, 0.68, -0.96]} rotation={[0.56, 0, 0]}>
        <planeGeometry args={[1.32, 0.92]} />
        <meshStandardMaterial
          color="#0a1220"
          roughness={0.04}
          metalness={0.98}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Interior Cockpit Lighting & Dashboard Glow */}
      <pointLight position={[0, 0.72, 0.1]} color="#00f0ff" intensity={0.9} distance={2.2} />

      {/* Rear Slotted Engine Louvers (Glass Slats over V10 Engine) */}
      <group position={[0, 0.62, 1.36]}>
        {[-0.38, -0.18, 0.02, 0.22].map((zOffset, idx) => (
          <mesh key={idx} position={[0, 0, zOffset]} rotation={[0.25, 0, 0]}>
            <boxGeometry args={[1.1, 0.02, 0.12]} />
            <meshStandardMaterial color="#111827" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Integrated Rear Ducktail Wing with Neon Edge */}
      <mesh position={[0, 0.79, 2.22]} rotation={[-0.14, 0, 0]}>
        <boxGeometry args={[2.02, 0.06, 0.4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
      </mesh>

      {/* ================= REALISTIC TAILLIGHTS (EXACT VIDEO LOOK) ================= */}
      {/* Full-width continuous neon red lightbar */}
      <mesh position={[0, 0.54, 2.32]}>
        <boxGeometry args={[1.96, 0.07, 0.04]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={isMoving ? 4 : 2.5}
        />
      </mesh>

      {/* Angular Y-shaped inner taillight accents (Lamborghini style) */}
      <mesh position={[-0.6, 0.54, 2.33]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.3, 0.04, 0.02]} />
        <meshStandardMaterial color="#ff1e42" emissive="#ff1e42" emissiveIntensity={7} />
      </mesh>
      <mesh position={[0.6, 0.54, 2.33]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.3, 0.04, 0.02]} />
        <meshStandardMaterial color="#ff1e42" emissive="#ff1e42" emissiveIntensity={7} />
      </mesh>

      {/* Rear License Plate Recess (Exact GTA Vice City detail) */}
      <group position={[0, 0.38, 2.32]}>
        {/* Recessed Plate Box */}
        <mesh>
          <boxGeometry args={[0.75, 0.22, 0.04]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* License Plate Text */}
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.095}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          POTTER 01
        </Text>
        {/* White License Plate Overhead LED Light */}
        <pointLight position={[0, 0.12, 0.08]} color="#ffffff" intensity={0.6} distance={0.8} />
      </group>

      {/* Rear Taillight Glow Light Casting onto Wet Road */}
      <pointLight
        position={[0, 0.54, 2.6]}
        color="#ff0033"
        intensity={isMoving ? 4.8 : 2.8}
        distance={10}
      />

      {/* Rear Diffuser with 4 Vertical Aero Fins */}
      <group position={[0, 0.22, 2.3]}>
        <mesh>
          <boxGeometry args={[1.75, 0.16, 0.22]} />
          <meshStandardMaterial color="#05070e" roughness={0.4} metalness={0.9} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((finX, idx) => (
          <mesh key={idx} position={[finX, -0.06, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.24]} />
            <meshStandardMaterial color="#1e293b" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Quad Tuned Chrome Exhaust Pipes */}
      <group position={[0, 0.32, 2.34]}>
        {/* Left Exhausts */}
        <mesh position={[-0.52, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.24, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.95} />
        </mesh>
        <mesh position={[-0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.24, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.95} />
        </mesh>
        {/* Left Nitro Flame */}
        <mesh
          ref={nitroFlameRef1}
          position={[-0.42, 0, 0.26]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.08, 0.55, 8]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={isMoving ? 0.9 : 0.1} />
        </mesh>

        {/* Right Exhausts */}
        <mesh position={[0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.24, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.95} />
        </mesh>
        <mesh position={[0.52, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.24, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.95} />
        </mesh>
        {/* Right Nitro Flame */}
        <mesh
          ref={nitroFlameRef2}
          position={[0.42, 0, 0.26]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.08, 0.55, 8]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={isMoving ? 0.9 : 0.1} />
        </mesh>
      </group>

      {/* ================= FRONT LASER HEADLIGHTS & VOLUMETRIC CONES ================= */}
      <mesh position={[-0.74, 0.38, -2.48]}>
        <boxGeometry args={[0.44, 0.07, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={headlightsOn ? 6 : 0.5}
        />
      </mesh>
      <mesh position={[0.74, 0.38, -2.48]}>
        <boxGeometry args={[0.44, 0.07, 0.04]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={headlightsOn ? 6 : 0.5}
        />
      </mesh>

      {headlightsOn && (
        <>
          <spotLight
            position={[-0.74, 0.5, -2.4]}
            angle={0.52}
            penumbra={0.6}
            intensity={25}
            distance={35}
            color="#e0f2fe"
          />
          <spotLight
            position={[0.74, 0.5, -2.4]}
            angle={0.52}
            penumbra={0.6}
            intensity={25}
            distance={35}
            color="#e0f2fe"
          />

          {/* Volumetric Glowing Light Cones on asphalt */}
          <mesh position={[-0.74, 0.3, -12]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[2.8, 20, 16, 1, true]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.07}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0.74, 0.3, -12]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[2.8, 20, 16, 1, true]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.07}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </>
      )}

      {/* ================= NEON UNDERGLOW ================= */}
      <pointLight
        ref={underglowRef}
        position={[0, 0.1, 0]}
        color="#ff007f"
        intensity={2.8}
        distance={7}
      />
      <pointLight
        position={[0, 0.1, -1]}
        color="#00f0ff"
        intensity={2.2}
        distance={6}
      />

      {/* ================= 4 WHEELS (ALLOY RIMS + GOLD BRAKE CALIPERS) ================= */}
      {/* Front-Left */}
      <group
        position={[-1.02, 0.34, -1.35]}
        ref={(el) => { if (el) wheelsRef.current[0] = el; }}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 24]} />
          <meshStandardMaterial color="#020617" roughness={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.22, 0.025, 8, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.2} />
        </mesh>
        <mesh position={[0.02, 0.15, 0]}>
          <boxGeometry args={[0.06, 0.12, 0.16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Front-Right */}
      <group
        position={[1.02, 0.34, -1.35]}
        ref={(el) => { if (el) wheelsRef.current[1] = el; }}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 24]} />
          <meshStandardMaterial color="#020617" roughness={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.22, 0.025, 8, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.2} />
        </mesh>
        <mesh position={[-0.02, 0.15, 0]}>
          <boxGeometry args={[0.06, 0.12, 0.16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Rear-Left (Wider Tires) */}
      <group
        position={[-1.06, 0.36, 1.45]}
        ref={(el) => { if (el) wheelsRef.current[2] = el; }}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.36, 0.36, 0.34, 24]} />
          <meshStandardMaterial color="#020617" roughness={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.23, 0.025, 8, 16]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.2} />
        </mesh>
        <mesh position={[0.02, 0.16, 0]}>
          <boxGeometry args={[0.06, 0.13, 0.18]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Rear-Right (Wider Tires) */}
      <group
        position={[1.06, 0.36, 1.45]}
        ref={(el) => { if (el) wheelsRef.current[3] = el; }}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.36, 0.36, 0.34, 24]} />
          <meshStandardMaterial color="#020617" roughness={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.23, 0.025, 8, 16]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.2} />
        </mesh>
        <mesh position={[-0.02, 0.16, 0]}>
          <boxGeometry args={[0.06, 0.13, 0.18]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
});
HeroCar.displayName = 'HeroCar';
