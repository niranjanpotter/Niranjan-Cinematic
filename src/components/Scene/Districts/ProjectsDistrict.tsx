import React from 'react';
import { Text, Float } from '@react-three/drei';
import { PORTFOLIO_DATA, ProjectItem } from '../../../data/portfolioData';

interface ProjectsDistrictProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsDistrict: React.FC<ProjectsDistrictProps> = ({ onSelectProject }) => {
  const z = -240;
  const projects = PORTFOLIO_DATA.projects;

  // Stagger 5 project landmarks along the boulevard (left and right sides)
  const landmarkOffsets = [
    { x: -9.5, zOffset: 16, color: '#a855f7' },
    { x: 9.5, zOffset: 8, color: '#ec4899' },
    { x: -9.5, zOffset: 0, color: '#00f0ff' },
    { x: 9.5, zOffset: -8, color: '#f59e0b' },
    { x: -9.5, zOffset: -16, color: '#10b981' }
  ];

  return (
    <group position={[0, 0, z]}>
      {/* ================= GIANT 3D TEXT OVER HIGHWAY: 03 PROJECTS (EXACT VIDEO 00:20) ================= */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group position={[0, 10.5, 0]}>
          <Text
            position={[-4.5, 0.4, 0]}
            fontSize={2.8}
            color="#ec4899"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#be185d"
          >
            03
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
            PROJECTS
          </Text>
        </group>
      </Float>

      {projects.map((proj: ProjectItem, idx: number) => {
        const offset = landmarkOffsets[idx] || { x: 9.5, zOffset: 0, color: '#a855f7' };
        return (
          <group
            key={proj.id}
            position={[offset.x, 0, offset.zOffset]}
            onClick={() => onSelectProject(proj)}
          >
            {/* Monument Base */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[2.6, 3.2, 0.8, 24]} />
              <meshStandardMaterial color="#0c1222" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Glowing Ring */}
            <mesh position={[0, 0.82, 0]}>
              <ringGeometry args={[2.2, 2.7, 32]} />
              <meshBasicMaterial color={offset.color} />
            </mesh>

            {/* Architectural Column Pillar */}
            <mesh position={[0, 4.6, 0]} castShadow>
              <cylinderGeometry args={[0.42, 0.52, 7.8, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>

            {/* Floating Project Billboard Display */}
            <Float speed={2.5} rotationIntensity={0.12} floatIntensity={0.3}>
              <group position={[0, 8.8, 0]}>
                {/* Board Background */}
                <mesh position={[0, 0, -0.05]}>
                  <planeGeometry args={[7.2, 2.8]} />
                  <meshBasicMaterial color="#050814" transparent opacity={0.94} />
                </mesh>

                {/* Neon Frame */}
                <mesh position={[0, 1.4, 0]}>
                  <boxGeometry args={[7.2, 0.08, 0.1]} />
                  <meshStandardMaterial
                    color={offset.color}
                    emissive={offset.color}
                    emissiveIntensity={3}
                  />
                </mesh>
                <mesh position={[0, -1.4, 0]}>
                  <boxGeometry args={[7.2, 0.08, 0.1]} />
                  <meshStandardMaterial
                    color={offset.color}
                    emissive={offset.color}
                    emissiveIntensity={3}
                  />
                </mesh>

                {/* Badge Category */}
                <Text
                  position={[0, 0.95, 0]}
                  fontSize={0.25}
                  color={offset.color}
                  anchorX="center"
                  anchorY="middle"
                >
                  {`[ PROJECT 0${idx + 1} // ${proj.category.toUpperCase()} ]`}
                </Text>

                {/* Title */}
                <Text
                  position={[0, 0.38, 0]}
                  fontSize={0.4}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={6.6}
                  textAlign="center"
                >
                  {proj.title}
                </Text>

                {/* Tech Tags */}
                <Text
                  position={[0, -0.3, 0]}
                  fontSize={0.25}
                  color="#94a3b8"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={6.6}
                >
                  {proj.technologies.slice(0, 4).join(" • ")}
                </Text>

                {/* Click Cue */}
                <Text
                  position={[0, -0.9, 0]}
                  fontSize={0.23}
                  color={offset.color}
                  anchorX="center"
                  anchorY="middle"
                >
                  CLICK TO VIEW ARCHITECTURE & IMPACT
                </Text>
              </group>
            </Float>

            {/* Proximity Light */}
          </group>
        );
      })}

      {/* Road Markings */}
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.0}
          color="#ec4899"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.8}
        >
          [ DISTRICT 03: PROJECTS BOULEVARD ]
        </Text>
      </group>
    </group>
  );
};
