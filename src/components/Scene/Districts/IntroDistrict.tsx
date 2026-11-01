import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Float, Image as DreiImage } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';

interface IntroDistrictProps {
  onOpenDetails: () => void;
  carStarted: boolean;
}

export const IntroDistrict: React.FC<IntroDistrictProps> = ({ onOpenDetails, carStarted }) => {
  const holoCubeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (holoCubeRef.current) {
      holoCubeRef.current.rotation.y = t * 0.7;
      holoCubeRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Starting Launchpad Grid & Decals */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 5.5, 32]} />
        <meshBasicMaterial color="#ff007f" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.1, 32]} />
        <meshBasicMaterial color="#030712" transparent opacity={0.88} />
      </mesh>

      {/* --- TWIN ENTRANCE MONOLITH PYLONS --- */}
      {/* Left Monolith */}
      <group position={[-9.5, 0, -4]}>
        <mesh position={[0, 9.5, 0]} castShadow>
          <boxGeometry args={[2.6, 19, 2.6]} />
          <meshStandardMaterial color="#0c1222" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[1.35, 9.5, 0]}>
          <boxGeometry args={[0.08, 18.8, 2.5]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
      </group>

      {/* Right Monolith */}
      <group position={[9.5, 0, -4]}>
        <mesh position={[0, 9.5, 0]} castShadow>
          <boxGeometry args={[2.6, 19, 2.6]} />
          <meshStandardMaterial color="#0c1222" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[-1.35, 9.5, 0]}>
          <boxGeometry args={[0.08, 18.8, 2.5]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.5} />
        </mesh>
      </group>

      {/* Floating Holographic Integration Core Logo */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.35}>
        <group ref={holoCubeRef} position={[0, 19, -12]}>
          <mesh>
            <octahedronGeometry args={[2.4]} />
            <meshStandardMaterial
              color="#ff007f"
              emissive="#ff007f"
              emissiveIntensity={2.8}
              wireframe
            />
          </mesh>
          <mesh>
            <boxGeometry args={[1.3, 1.3, 1.3]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={3.2}
              metalness={0.9}
            />
          </mesh>
          <pointLight color="#ff007f" intensity={4.5} distance={28} />
        </group>
      </Float>

      {/* ================= GIANT GTA 3D WELCOME BANNER (VIDEO 00:03) ================= */}
      <group position={[0, 12, -18]}>
        {/* Frame */}
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[22, 6.8, 0.4]} />
          <meshStandardMaterial color="#080d1a" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[21.5, 6.4]} />
          <meshBasicMaterial color="#030611" />
        </mesh>

        {/* Top & Bottom Emissive Lasers */}
        <mesh position={[0, 3.3, 0.05]}>
          <boxGeometry args={[22, 0.14, 0.4]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={4} />
        </mesh>
        <mesh position={[0, -3.3, 0.05]}>
          <boxGeometry args={[22, 0.14, 0.4]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={4} />
        </mesh>

        {/* Level Tag (Exact GTA video 00:03 style) */}
        <Text
          position={[0, 2.2, 0.1]}
          fontSize={0.44}
          color="#ff007f"
          anchorX="center"
          anchorY="middle"
        >
          EXPERIENCE // LEVEL 99
        </Text>

        <Text
          position={[0, 0.85, 0.1]}
          fontSize={1.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor="#ff007f"
        >
          WELCOME TO POTTER CITY
        </Text>

        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.58}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          {PORTFOLIO_DATA.personal.heroTitle}
        </Text>

        <Text
          position={[0, -1.6, 0.1]}
          fontSize={0.34}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          {PORTFOLIO_DATA.personal.subheading}
        </Text>
      </group>

      {/* Holographic Character Stand Beside Car (Click to inspect Bio) */}
      {!carStarted && (
        <group position={[3.8, 0, 0]} onClick={onOpenDetails}>
          {/* Base Pedestal */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[1.6, 1.9, 0.3, 32]} />
            <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={1.2} />
          </mesh>

          {/* Hologram Scanner Ring */}
          <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.5, 32]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>

          {/* Niranjan's Real Photograph Hologram */}
          <Float speed={2.5} rotationIntensity={0.06} floatIntensity={0.25}>
            <group position={[0, 2.2, 0]}>
              {/* Backing Frame */}
              <mesh position={[0, 0, -0.04]}>
                <planeGeometry args={[2.0, 2.4]} />
                <meshBasicMaterial color="#050814" transparent opacity={0.9} />
              </mesh>
              <mesh position={[0, 1.22, 0]}>
                <boxGeometry args={[2.0, 0.05, 0.06]} />
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3} />
              </mesh>
              <mesh position={[0, -1.22, 0]}>
                <boxGeometry args={[2.0, 0.05, 0.06]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
              </mesh>

              {/* Real Photo Texture (Wrapped in Suspense so Canvas loads instantly) */}
              <Suspense fallback={null}>
                <DreiImage
                  url="/avatar.png"
                  scale={[1.85, 2.25]}
                  position={[0, 0, 0]}
                  transparent
                />
              </Suspense>
            </group>
          </Float>

          {/* Floating Tag */}
          <Float speed={3} rotationIntensity={0.08} floatIntensity={0.25}>
            <group position={[0, 3.8, 0]}>
              <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[3.4, 0.85]} />
                <meshBasicMaterial color="#050814" transparent opacity={0.92} />
              </mesh>
              <Text
                position={[0, 0.15, 0]}
                fontSize={0.28}
                color="#ff007f"
                anchorX="center"
                anchorY="middle"
              >
                NIRANJAN KUMAR POTTER
              </Text>
              <Text
                position={[0, -0.18, 0]}
                fontSize={0.19}
                color="#fdf4ff"
                anchorX="center"
                anchorY="middle"
              >
                [ CLICK TO INSPECT BIO ]
              </Text>
            </group>
          </Float>
        </group>
      )}

      {/* ================= ROAD PAINT: THE JOURNEY BEGINS >>> (EXACT VIDEO 00:11) ================= */}
      <group position={[0, 0.03, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          color="#ff007f"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.9}
        >
          {"THE JOURNEY BEGINS >>>"}
        </Text>
      </group>
    </group>
  );
};
