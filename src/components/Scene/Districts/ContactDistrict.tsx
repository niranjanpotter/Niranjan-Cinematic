import React from 'react';
import { Text, Float } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../../data/portfolioData';

interface ContactDistrictProps {
  onOpenDetails: () => void;
}

export const ContactDistrict: React.FC<ContactDistrictProps> = ({ onOpenDetails }) => {
  const z = -510;
  const links = PORTFOLIO_DATA.personal.links;

  const contactNodes = [
    { label: 'LINKEDIN', url: links.linkedin, color: '#0077b5', x: -6 },
    { label: 'CALENDLY (BOOK CALL)', url: links.calendly, color: '#006bff', x: -2 },
    { label: 'TRAILBLAZER', url: links.trailblazer, color: '#00a1e0', x: 2 },
    { label: 'GITHUB REPOSITORIES', url: links.repositories, color: '#ec4899', x: 6 }
  ];

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER ROAD: 06 THE GARAGE (EXACT VIDEO 00:24) ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 11, 4]}>
          <Text
            position={[-4.8, 0.4, 0]}
            fontSize={2.8}
            color="#ff007f"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#be185d"
          >
            06
          </Text>
          <Text
            position={[1.8, 0.2, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#db2777"
          >
            THE GARAGE
          </Text>
        </group>
      </Float>

      {/* --- GARAGE LUXURY LANDING PAD & SHOWROOM --- */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.0, 10.5, 32]} />
        <meshBasicMaterial color="#ff007f" transparent opacity={0.65} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.9, 32]} />
        <meshBasicMaterial color="#0c1222" transparent opacity={0.88} />
      </mesh>

      {/* Showroom Glass Arches Frame */}
      <group position={[0, 5, -8]}>
        {/* Left Pillar */}
        <mesh position={[-7.5, 0, 0]}>
          <boxGeometry args={[0.8, 10, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Right Pillar */}
        <mesh position={[7.5, 0, 0]}>
          <boxGeometry args={[0.8, 10, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Roof Crossbeam */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[16, 0.8, 1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        <mesh position={[0, 5, 0.52]}>
          <boxGeometry args={[15.8, 0.1, 0.05]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
      </group>

      {/* Monumental Finish Billboard (Exact Video 00:25 "LET'S BUILD WHAT'S NEXT") */}
      <group position={[0, 10.5, -14]} onClick={onOpenDetails}>
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[20, 5.8, 0.4]} />
          <meshStandardMaterial color="#180c24" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[20, 0.12, 0.5]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[0, -2.8, 0]}>
          <boxGeometry args={[20, 0.12, 0.5]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>

        <Text
          position={[0, 1.6, 0.1]}
          fontSize={0.44}
          color="#ff007f"
          anchorX="center"
          anchorY="middle"
        >
          MISSION COMPLETE // FINAL DESTINATION
        </Text>
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={1.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#ff007f"
        >
          LET'S BUILD WHAT'S NEXT
        </Text>
        <Text
          position={[0, -0.65, 0.1]}
          fontSize={0.42}
          color="#f472b6"
          anchorX="center"
          anchorY="middle"
        >
          AVAILABLE FOR MULESOFT & TECHNICAL LEAD ROLES
        </Text>
        <Text
          position={[0, -1.5, 0.1]}
          fontSize={0.28}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          [ CLICK TO OPEN CONTACT TERMINAL & RESUME ]
        </Text>
      </group>

      {/* Interactive Contact Pillars along the platform */}
      {contactNodes.map((node) => (
        <group
          key={node.label}
          position={[node.x, 0, 4]}
          onClick={(e) => {
            e.stopPropagation();
            window.open(node.url, '_blank', 'noopener,noreferrer');
          }}
        >
          {/* Base */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.85, 1.1, 0.6, 16]} />
            <meshStandardMaterial color="#1a0f26" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <ringGeometry args={[0.65, 0.85, 16]} />
            <meshBasicMaterial color={node.color} />
          </mesh>

          {/* Floating Neon Terminal */}
          <Float speed={2.5} rotationIntensity={0.12} floatIntensity={0.3}>
            <group position={[0, 2.6, 0]}>
              <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[3.0, 1.3]} />
                <meshBasicMaterial color="#050814" transparent opacity={0.92} />
              </mesh>
              <mesh position={[0, 0.65, 0]}>
                <boxGeometry args={[3.0, 0.04, 0.05]} />
                <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={3} />
              </mesh>
              <Text
                position={[0, 0.16, 0]}
                fontSize={0.26}
                color={node.color}
                anchorX="center"
                anchorY="middle"
              >
                {node.label}
              </Text>
              <Text
                position={[0, -0.26, 0]}
                fontSize={0.19}
                color="#f8fafc"
                anchorX="center"
                anchorY="middle"
              >
                ↗ OPEN LINK
              </Text>
            </group>
          </Float>

          <pointLight position={[0, 2, 0]} color={node.color} intensity={1.8} distance={9} />
        </group>
      ))}

      {/* Road Markings */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.0}
          color="#ff007f"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          [ DISTRICT 06: CONTACT GARAGE & CONNECT ]
        </Text>
      </group>
    </group>
  );
};
