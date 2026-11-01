import React from 'react';
import { Text, Float } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';

interface EducationDistrictProps {
  onOpenDetails: () => void;
}

export const EducationDistrict: React.FC<EducationDistrictProps> = ({ onOpenDetails }) => {
  const z = -70;

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER HIGHWAY: 01 EDUCATION (EXACT VIDEO 00:14) ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 9.5, 0]}>
          <Text
            position={[-4.5, 0.4, 0]}
            fontSize={2.8}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#78350f"
          >
            01
          </Text>
          <Text
            position={[1.8, 0.2, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#d97706"
          >
            EDUCATION
          </Text>
        </group>
      </Float>

      {/* University Campus Main Gate Architecture */}
      <group position={[0, 0, 0]}>
        {/* Left Academic Wing */}
        <mesh position={[-16, 7, 0]} castShadow>
          <boxGeometry args={[12, 14, 18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-16, 7, 9.05]}>
          <planeGeometry args={[10, 11]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
        </mesh>

        {/* Right Academic Wing */}
        <mesh position={[16, 7, 0]} castShadow>
          <boxGeometry args={[12, 14, 18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[16, 7, 9.05]}>
          <planeGeometry args={[10, 11]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
        </mesh>

        {/* Central Entrance Gateway Arch */}
        <mesh position={[-6.2, 6, 0]}>
          <boxGeometry args={[1.5, 12, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[6.2, 6, 0]}>
          <boxGeometry args={[1.5, 12, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 11, 0]}>
          <boxGeometry args={[13.9, 2, 2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>

        {/* Arch Neon Crest */}
        <mesh position={[0, 11.2, 1.05]}>
          <boxGeometry args={[12.5, 0.15, 0.1]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* Floating Interactive Degree Showcase Pedestal on Right Sidewalk */}
      <group position={[7.8, 0, 6]} onClick={onOpenDetails}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.4, 24]} />
          <meshStandardMaterial color="#b45309" emissive="#d97706" emissiveIntensity={0.8} />
        </mesh>

        {/* Holographic Graduation Ring */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[0, 2.4, 0]}>
            <torusGeometry args={[1.3, 0.08, 16, 32]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
          </mesh>

          <group position={[0, 4.0, 0]}>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[5.8, 2.0]} />
              <meshBasicMaterial color="#050814" transparent opacity={0.92} />
            </mesh>
            <mesh position={[0, 1.0, 0]}>
              <boxGeometry args={[5.8, 0.06, 0.08]} />
              <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
            </mesh>
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.36}
              color="#fbbf24"
              anchorX="center"
              anchorY="middle"
            >
              ACADEMIC DEGREE
            </Text>
            <Text
              position={[0, 0.02, 0]}
              fontSize={0.34}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {PORTFOLIO_DATA.personal.education.degree}
            </Text>
            <Text
              position={[0, -0.48, 0]}
              fontSize={0.28}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              {PORTFOLIO_DATA.personal.education.period}
            </Text>
          </group>
        </Float>
      </group>

      {/* Left Sidewalk Languages Landmark */}
      <group position={[-7.8, 0, 6]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.4, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <group position={[0, 3.2, 0]}>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[5.0, 1.5]} />
              <meshBasicMaterial color="#050814" transparent opacity={0.88} />
            </mesh>
            <Text
              position={[0, 0.28, 0]}
              fontSize={0.3}
              color="#38bdf8"
              anchorX="center"
              anchorY="middle"
            >
              PROFICIENCY
            </Text>
            <Text
              position={[0, -0.22, 0]}
              fontSize={0.24}
              color="#cbd5e1"
              anchorX="center"
              anchorY="middle"
            >
              {PORTFOLIO_DATA.personal.education.languages.join(" • ")}
            </Text>
          </group>
        </Float>
      </group>

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
          [ DISTRICT 01: EDUCATION & ACADEMIC FOUNDATIONS ]
        </Text>
      </group>
    </group>
  );
};
