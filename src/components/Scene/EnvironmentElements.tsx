import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Lightweight, high-performance Stylized 3D Palm Tree (minimal draw calls)
export const PalmTree: React.FC<{ position: [number, number, number]; scale?: number; rotationY?: number }> = ({
  position,
  scale = 1,
  rotationY = 0
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Tapered Trunk */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.2, 0.42, 9, 6]} />
        <meshStandardMaterial color="#3b2514" roughness={0.9} />
      </mesh>

      {/* 5 Clean Drooping Fan Fronds */}
      <group position={[0, 9, 0]}>
        {[0, 1.25, 2.5, 3.75, 5.0].map((angle, i) => (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0, 0.2, 1.8]} rotation={[-0.35, 0, 0]}>
              <planeGeometry args={[1.4, 3.6]} />
              <meshBasicMaterial color="#166534" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export const EnvironmentElements: React.FC = () => {
  const roadLength = 650;
  const roadCenterZ = -260;

  // Flying sky-traffic / police chopper searchlight
  const trafficRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (trafficRef.current) {
      trafficRef.current.position.z = ((t * 24) % 580) - 500;
      trafficRef.current.position.x = 22 + Math.sin(t * 0.35) * 5;
    }
  });

  // Generate optimized Miami / Vice City skyscrapers & Art Deco hotels (reduced count for smooth 60fps)
  const buildings = useMemo(() => {
    const list: Array<{
      x: number;
      z: number;
      width: number;
      depth: number;
      height: number;
      color: string;
      neonColor: string;
      hasSpire: boolean;
    }> = [];

    const facadeColors = ['#0c1222', '#111827', '#1e1b4b', '#180d2b'];
    const neonPalette = ['#ff007f', '#00f0ff', '#f59e0b', '#a855f7'];

    for (let z = 30; z >= -530; z -= 45) {
      // Left side high-rises
      list.push({
        x: -36,
        z: z,
        width: 16,
        depth: 16,
        height: 40 + (Math.abs(z) % 40),
        color: facadeColors[Math.abs(z / 10 | 0) % facadeColors.length],
        neonColor: neonPalette[Math.abs(z / 15 | 0) % neonPalette.length],
        hasSpire: z % 90 === 0
      });

      // Right side high-rises
      list.push({
        x: 28,
        z: z + 15,
        width: 16,
        depth: 16,
        height: 35 + (Math.abs(z + 10) % 35),
        color: facadeColors[Math.abs((z + 5) / 10 | 0) % facadeColors.length],
        neonColor: neonPalette[Math.abs((z + 5) / 15 | 0) % neonPalette.length],
        hasSpire: z % 90 === 0
      });
    }

    return list;
  }, []);

  // Optimized Palm Trees spaced every 30 units (smooth, beautiful, low draw calls)
  const palmTrees = useMemo(() => {
    const list: Array<{ x: number; z: number; scale: number; rotY: number }> = [];
    for (let z = 20; z >= -520; z -= 32) {
      list.push({
        x: -7.5,
        z: z,
        scale: 1.0,
        rotY: (z * 0.1) % Math.PI
      });
      list.push({
        x: 7.5,
        z: z,
        scale: 1.0,
        rotY: ((z + 5) * 0.1) % Math.PI
      });
    }
    return list;
  }, []);

  // Streetlights (visual glow using emissive heads, NO expensive per-pole dynamic pointLights)
  const streetlights = useMemo(() => {
    const posts: Array<{ x: number; z: number; isLeft: boolean }> = [];
    for (let z = 20; z >= -520; z -= 40) {
      posts.push({ x: -6.4, z, isLeft: true });
      posts.push({ x: 6.4, z, isLeft: false });
    }
    return posts;
  }, []);

  return (
    <group>
      {/* ================= GTA VICE CITY SUNSET SKY & HORIZON ================= */}
      {/* Glowing Golden Sunset Sun on Horizon */}
      <group position={[0, 22, -580]}>
        <mesh>
          <circleGeometry args={[32, 32]} />
          <meshBasicMaterial color="#ff7a18" />
        </mesh>
        <mesh position={[0, 0, -1]}>
          <circleGeometry args={[58, 32]} />
          <meshBasicMaterial color="#ff3d00" transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0, -2]}>
          <circleGeometry args={[95, 32]} />
          <meshBasicMaterial color="#b100e8" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Atmospheric Skyline Backdrop Plane (Sunset Gradient Sky) */}
      <mesh position={[0, 75, -595]}>
        <planeGeometry args={[1200, 300]} />
        <meshBasicMaterial color="#2d0a2e" />
      </mesh>

      {/* Distant Coastal Bridge Silhouette */}
      <group position={[-110, 3, -400]}>
        <mesh>
          <boxGeometry args={[160, 2, 4]} />
          <meshBasicMaterial color="#0a0f1d" />
        </mesh>
        {[-50, -10, 30].map((x, i) => (
          <group key={i} position={[x, 14, 0]}>
            <mesh>
              <cylinderGeometry args={[0.5, 1.0, 26, 6]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
            <mesh position={[0, 13, 0]}>
              <sphereGeometry args={[0.4, 6, 6]} />
              <meshBasicMaterial color="#ff0055" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= COASTAL OCEAN WATER ON THE LEFT ================= */}
      <mesh position={[-75, -0.4, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, roadLength]} />
        <meshStandardMaterial
          color="#07111e"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Coastal Retaining Sea Wall */}
      <mesh position={[-7.5, 0.4, roadCenterZ]}>
        <boxGeometry args={[0.8, 1.0, roadLength]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[-7.05, 0.85, roadCenterZ]}>
        <boxGeometry args={[0.08, 0.08, roadLength]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>

      {/* ================= HIGHWAY ROAD WITH WET ASPHALT REFLECTIONS ================= */}
      <mesh position={[0, 0, roadCenterZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13.2, roadLength]} />
        <meshStandardMaterial
          color="#0a0d16"
          roughness={0.16}
          metalness={0.88}
        />
      </mesh>

      {/* Sidewalks */}
      <mesh position={[-6.2, 0.12, roadCenterZ]}>
        <boxGeometry args={[1.2, 0.24, roadLength]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      <mesh position={[-5.6, 0.25, roadCenterZ]}>
        <boxGeometry args={[0.1, 0.05, roadLength]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      <mesh position={[6.2, 0.12, roadCenterZ]}>
        <boxGeometry args={[1.2, 0.24, roadLength]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      <mesh position={[5.6, 0.25, roadCenterZ]}>
        <boxGeometry args={[0.1, 0.05, roadLength]} />
        <meshBasicMaterial color="#ff007f" />
      </mesh>

      {/* Center Dashed Highway Dividing Stripes */}
      {Array.from({ length: Math.floor(roadLength / 10) }).map((_, i) => {
        const lineZ = 25 - i * 10;
        return (
          <mesh key={i} position={[0, 0.02, lineZ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.24, 4.8]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.85} />
          </mesh>
        );
      })}

      {/* ================= PALM TREES (OCEAN DRIVE VIBE) ================= */}
      {palmTrees.map((tree, idx) => (
        <PalmTree
          key={idx}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
          rotationY={tree.rotY}
        />
      ))}

      {/* ================= STREETLIGHTS (HIGH-PERFORMANCE VISUAL GLOW) ================= */}
      {streetlights.map((post, idx) => (
        <group key={idx} position={[post.x, 0, post.z]}>
          <mesh position={[0, 4.2, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 8.4, 6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          <mesh position={[post.isLeft ? 0.9 : -0.9, 8.2, 0]} rotation={[0, 0, post.isLeft ? 0.2 : -0.2]}>
            <boxGeometry args={[1.8, 0.08, 0.08]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {/* Glowing Projector Head */}
          <mesh position={[post.isLeft ? 1.6 : -1.6, 8.0, 0]}>
            <boxGeometry args={[0.45, 0.15, 0.35]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      ))}

      {/* ================= SKYSCRAPERS & NEON ART DECO BUILDINGS ================= */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.height / 2, b.z]}>
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial color={b.color} roughness={0.3} metalness={0.85} />
          </mesh>

          {/* Vertical Neon Edge Light Strip */}
          <mesh position={[b.x < 0 ? b.width / 2 + 0.05 : -b.width / 2 - 0.05, 0, b.depth / 2]}>
            <boxGeometry args={[0.12, b.height, 0.12]} />
            <meshBasicMaterial color={b.neonColor} />
          </mesh>

          {/* Roof Terrace Neon Trim */}
          <mesh position={[0, b.height / 2 + 0.05, 0]}>
            <boxGeometry args={[b.width + 0.2, 0.25, b.depth + 0.2]} />
            <meshBasicMaterial color={b.neonColor} />
          </mesh>

          {/* Spire */}
          {b.hasSpire && (
            <group position={[0, b.height / 2, 0]}>
              <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[0.08, 0.2, 8, 6]} />
                <meshStandardMaterial color="#334155" metalness={0.9} />
              </mesh>
              <mesh position={[0, 8.2, 0]}>
                <sphereGeometry args={[0.35, 6, 6]} />
                <meshBasicMaterial color="#ff0055" />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Police / Sky Helicopter with Spotlight */}
      <group ref={trafficRef} position={[24, 48, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.8, 4.2]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0, 2.1]}>
          <boxGeometry args={[0.4, 0.4, 0.2]} />
          <meshBasicMaterial color="#ff0055" />
        </mesh>
      </group>
    </group>
  );
};
