import React from 'react';
import { Text, Float } from '@react-three/drei';

interface TechDistrictProps {
  onOpenDetails: () => void;
}

export const TechDistrict: React.FC<TechDistrictProps> = ({ onOpenDetails }) => {
  const z = -150;

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER HIGHWAY: 02 TECH TOWERS (VIDEO 00:17) ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 10.5, 0]}>
          <Text
            position={[-4.5, 0.4, 0]}
            fontSize={2.8}
            color="#00f0ff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#0369a1"
          >
            02
          </Text>
          <Text
            position={[1.8, 0.2, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#0284c7"
          >
            TECH TOWERS
          </Text>
        </group>
      </Float>

      {/* --- LEFT TECH TOWERS --- */}
      {/* Tower 1: MuleSoft Anypoint Spire */}
      <group position={[-14, 0, 8]} onClick={onOpenDetails}>
        <mesh position={[0, 15, 0]} castShadow>
          <boxGeometry args={[7.5, 30, 7.5]} />
          <meshStandardMaterial color="#081021" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Neon vertical corner light strips */}
        <mesh position={[3.8, 15, 3.8]}>
          <boxGeometry args={[0.12, 30, 0.12]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.5} />
        </mesh>
        {/* Vertical Signage */}
        <Text
          position={[3.85, 22, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={1.2}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          MULE 4
        </Text>
        <Text
          position={[3.85, 19, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.75}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          ANYPOINT PLATFORM
        </Text>
      </group>

      {/* Tower 2: DataWeave & Modernization Tower */}
      <group position={[-15, 0, -12]} onClick={onOpenDetails}>
        <mesh position={[0, 19, 0]} castShadow>
          <boxGeometry args={[8.5, 38, 8.5]} />
          <meshStandardMaterial color="#060c1a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[4.3, 19, 4.3]}>
          <boxGeometry args={[0.12, 38, 0.12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} />
        </mesh>
        <Text
          position={[4.35, 25, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={1.1}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          DATAWEAVE 2.0
        </Text>
        <Text
          position={[4.35, 22, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.7}
          color="#7dd3fc"
          anchorX="center"
          anchorY="middle"
        >
          CLOUDHUB 2.0
        </Text>
      </group>

      {/* --- RIGHT TECH TOWERS --- */}
      {/* Tower 3: Java 17 & AWS Monolith */}
      <group position={[14, 0, 8]} onClick={onOpenDetails}>
        <mesh position={[0, 17, 0]} castShadow>
          <boxGeometry args={[7.5, 34, 7.5]} />
          <meshStandardMaterial color="#081021" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[-3.8, 17, 3.8]}>
          <boxGeometry args={[0.12, 34, 0.12]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
        <Text
          position={[-3.85, 23, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={1.2}
          color="#ff007f"
          anchorX="center"
          anchorY="middle"
        >
          JAVA 17
        </Text>
        <Text
          position={[-3.85, 20, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.75}
          color="#f472b6"
          anchorX="center"
          anchorY="middle"
        >
          AWS S3 / DYNAMODB
        </Text>
      </group>

      {/* Tower 4: Enterprise Orchestration & AI MCP Tower */}
      <group position={[15, 0, -12]} onClick={onOpenDetails}>
        <mesh position={[0, 20, 0]} castShadow>
          <boxGeometry args={[8.5, 40, 8.5]} />
          <meshStandardMaterial color="#060c1a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[-4.3, 20, 4.3]}>
          <boxGeometry args={[0.12, 40, 0.12]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={3} />
        </mesh>
        <Text
          position={[-4.35, 26, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={1.0}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          MCP & AGENTS
        </Text>
        <Text
          position={[-4.35, 23, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          fontSize={0.7}
          color="#d8b4fe"
          anchorX="center"
          anchorY="middle"
        >
          MULE AGENT FABRIC
        </Text>
      </group>

      {/* Road Markings */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.0}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          [ DISTRICT 02: TECHNOLOGY & INTEGRATION RUNTIMES ]
        </Text>
      </group>
    </group>
  );
};
