import React from 'react';
import { Text, Float } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';

interface ExperienceDistrictProps {
  onOpenDetails: () => void;
}

export const ExperienceDistrict: React.FC<ExperienceDistrictProps> = ({ onOpenDetails }) => {
  const z = -420;
  const expTechM = PORTFOLIO_DATA.experiences[0];
  const expNtt = PORTFOLIO_DATA.experiences[1];

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER HIGHWAY: 05 EXPERIENCE ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 10.5, 0]}>
          <Text
            position={[-4.5, 0.4, 0]}
            fontSize={2.8}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#065f46"
          >
            05
          </Text>
          <Text
            position={[1.8, 0.2, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#047857"
          >
            EXPERIENCE
          </Text>
        </group>
      </Float>

      {/* --- TECH MAHINDRA TOWER (LEFT) --- */}
      <group position={[-16, 0, 0]} onClick={onOpenDetails}>
        <mesh position={[0, 18, 0]} castShadow>
          <boxGeometry args={[11, 36, 11]} />
          <meshStandardMaterial color="#0b172a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[5.55, 18, 0]}>
          <planeGeometry args={[10, 34]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
        </mesh>
        <mesh position={[5.55, 18, 5.55]}>
          <boxGeometry args={[0.1, 36, 0.1]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3} />
        </mesh>

        <Text
          position={[5.6, 26, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={1.2}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
        >
          TECH MAHINDRA
        </Text>
        <Text
          position={[5.6, 23.5, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.65}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {expTechM.role.toUpperCase()}
        </Text>
        <Text
          position={[5.6, 21.5, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.48}
          color="#a7f3d0"
          anchorX="center"
          anchorY="middle"
        >
          {expTechM.period}
        </Text>
      </group>

      {/* --- NTT DATA / APISERO TOWER (RIGHT) --- */}
      <group position={[16, 0, 0]} onClick={onOpenDetails}>
        <mesh position={[0, 16, 0]} castShadow>
          <boxGeometry args={[11, 32, 11]} />
          <meshStandardMaterial color="#0b172a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[-5.55, 16, 0]}>
          <planeGeometry args={[10, 30]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-5.55, 16, 5.55]}>
          <boxGeometry args={[0.1, 32, 0.1]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={3} />
        </mesh>

        <Text
          position={[-5.6, 24, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={1.1}
          color="#34d399"
          anchorX="center"
          anchorY="middle"
        >
          NTT DATA / APISERO
        </Text>
        <Text
          position={[-5.6, 21.5, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.65}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {expNtt.role.toUpperCase()}
        </Text>
        <Text
          position={[-5.6, 19.5, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.48}
          color="#a7f3d0"
          anchorX="center"
          anchorY="middle"
        >
          {expNtt.period}
        </Text>
      </group>

      {/* Road Markings */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.0}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          [ DISTRICT 05: PROFESSIONAL EXPERIENCE & ENTERPRISE LEADERSHIP ]
        </Text>
      </group>
    </group>
  );
};
