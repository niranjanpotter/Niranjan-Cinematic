import React from 'react';
import { Text, Float } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';

interface AchievementsDistrictProps {
  onOpenDetails: () => void;
}

export const AchievementsDistrict: React.FC<AchievementsDistrictProps> = ({ onOpenDetails }) => {
  const z = -330;
  const metrics = PORTFOLIO_DATA.metrics;

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER HIGHWAY: 04 ACHIEVE (EXACT VIDEO 00:22) ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 10.5, 0]}>
          <Text
            position={[-4.5, 0.4, 0]}
            fontSize={2.8}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#78350f"
          >
            04
          </Text>
          <Text
            position={[1.8, 0.2, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#b45309"
          >
            ACHIEVE
          </Text>
        </group>
      </Float>

      {/* Central Golden Holographic Plaza Monument */}
      <group position={[0, 0, 0]} onClick={onOpenDetails}>
        {/* Plaza Pedestal */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[5.2, 6.2, 0.5, 32]} />
          <meshStandardMaterial color="#1a1408" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <ringGeometry args={[4.4, 5.2, 32]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>

        {/* Floating Golden Trophy / Award Ring Structure */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[0, 3.6, 0]}>
            <octahedronGeometry args={[1.7]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#d97706"
              emissiveIntensity={2}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0, 3.6, 0]}>
            <torusGeometry args={[2.5, 0.08, 16, 32]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={2.5}
            />
          </mesh>
        </Float>
      </group>

      {/* Floating Holographic Metric Screens along both sides */}
      {metrics.map((metric, idx: number) => {
        const isLeft = idx % 2 === 0;
        const xPos = isLeft ? -9.8 : 9.8;
        const zPos = (idx - 2) * 9;

        return (
          <group key={metric.label} position={[xPos, 0, zPos]} onClick={onOpenDetails}>
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[1.6, 1.9, 0.4, 16]} />
              <meshStandardMaterial color="#0c1222" metalness={0.9} />
            </mesh>

            <Float speed={2.2} rotationIntensity={0.08} floatIntensity={0.2}>
              <group position={[0, 4.6, 0]}>
                {/* Metric Screen */}
                <mesh position={[0, 0, -0.05]}>
                  <planeGeometry args={[5.5, 2.5]} />
                  <meshBasicMaterial color="#050814" transparent opacity={0.94} />
                </mesh>
                <mesh position={[0, 1.25, 0]}>
                  <boxGeometry args={[5.5, 0.06, 0.1]} />
                  <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
                </mesh>

                {/* Big Metric Number */}
                <Text
                  position={[0, 0.48, 0]}
                  fontSize={0.95}
                  color="#fbbf24"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.03}
                  outlineColor="#78350f"
                >
                  {metric.value}
                </Text>

                {/* Label */}
                <Text
                  position={[0, -0.18, 0]}
                  fontSize={0.34}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                >
                  {metric.label}
                </Text>

                {/* Detail */}
                <Text
                  position={[0, -0.66, 0]}
                  fontSize={0.22}
                  color="#94a3b8"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={5.0}
                >
                  {metric.detail}
                </Text>
              </group>
            </Float>
          </group>
        );
      })}

      {/* Road Markings */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.0}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          [ DISTRICT 04: ACHIEVEMENTS & QUANTIFIED IMPACT ]
        </Text>
      </group>
    </group>
  );
};
