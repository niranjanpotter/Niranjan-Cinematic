import React from 'react';
import { Text, Float } from '@react-three/drei';
import { DistrictInfo } from '../../../data/portfolioData';

interface DistrictMarkerProps {
  district: DistrictInfo;
  isActive: boolean;
  onSelect: () => void;
}

export const DistrictMarker: React.FC<DistrictMarkerProps> = ({
  district,
  isActive,
  onSelect
}) => {
  const z = district.zCoord;
  const color = district.color || '#ff007f';

  return (
    <group position={[0, 0, z]}>
      {/* ================= MONUMENTAL OVERHEAD NEON GATEWAY (GTA STYLE) ================= */}
      <group position={[0, 6.8, 0]}>
        {/* Upper Heavy Crossbeam */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[16, 0.6, 0.9]} />
          <meshStandardMaterial color="#0c1222" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* High-intensity Emissive Laser Trim */}
        <mesh position={[0, 0.05, 0.46]}>
          <boxGeometry args={[15.8, 0.12, 0.06]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 5 : 3}
          />
        </mesh>

        {/* Left Heavy Structural Column */}
        <mesh position={[-7.5, -3.2, 0]}>
          <boxGeometry args={[0.9, 7.2, 0.9]} />
          <meshStandardMaterial color="#0c1222" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[-7.5, -3.2, 0.46]}>
          <boxGeometry args={[0.1, 7.0, 0.06]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} />
        </mesh>

        {/* Right Heavy Structural Column */}
        <mesh position={[7.5, -3.2, 0]}>
          <boxGeometry args={[0.9, 7.2, 0.9]} />
          <meshStandardMaterial color="#0c1222" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[7.5, -3.2, 0.46]}>
          <boxGeometry args={[0.1, 7.0, 0.06]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} />
        </mesh>

        {/* Floating Overhead Cyber Sign */}
        <Float speed={2.2} rotationIntensity={0.05} floatIntensity={0.2}>
          <group position={[0, 1.8, 0]} onClick={onSelect}>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[10.5, 1.8]} />
              <meshBasicMaterial color="#050814" transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[10.5, 0.05, 0.08]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.5} />
            </mesh>

            <Text
              position={[0, 0.28, 0]}
              fontSize={0.72}
              color={color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#000000"
            >
              {district.shortLabel}
            </Text>
            <Text
              position={[0, -0.36, 0]}
              fontSize={0.28}
              color="#f8fafc"
              anchorX="center"
              anchorY="middle"
            >
              {district.name}
            </Text>
          </group>
        </Float>
      </group>

      {/* ================= ROAD SURFACE TYPOGRAPHY ================= */}
      <group position={[0, 0.03, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.9}
        >
          {`>>> ${district.shortLabel} <<<`}
        </Text>
      </group>

      {/* Roadside Ground Beacons */}
      <mesh position={[-6.2, 0.14, 0]}>
        <boxGeometry args={[0.4, 0.28, 14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 4 : 2} />
      </mesh>
      <mesh position={[6.2, 0.14, 0]}>
        <boxGeometry args={[0.4, 0.28, 14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 4 : 2} />
      </mesh>

      {/* Area Light */}
      <pointLight position={[0, 5, 0]} color={color} intensity={isActive ? 4.5 : 1.8} distance={26} />
    </group>
  );
};
