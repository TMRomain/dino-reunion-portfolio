import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DinoModel = ({ position = [0, 0, 0], ...props }) => {
  const groupRef = useRef();
  
  // Animation de rotation simple
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Créons un modèle de dinosaure simple en primitive pour le placeholder
  return (
    <group ref={groupRef} position={position} {...props}>
      {/* Corps principal */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1.2, 2, 8]} />
        <meshStandardMaterial color="#2f5233" roughness={0.8} />
      </mesh>
      
      {/* Tête */}
      <mesh position={[0, 2.5, 1]} castShadow>
        <coneGeometry args={[0.6, 1.5, 8]} />
        <meshStandardMaterial color="#1d4220" roughness={0.8} />
      </mesh>
      
      {/* Yeux */}
      <mesh position={[-0.2, 2.8, 1.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 2.8, 1.4]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Queue */}
      <mesh position={[0, 1, -1.5]} rotation={[0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.4, 2, 8]} />
        <meshStandardMaterial color="#2f5233" roughness={0.8} />
      </mesh>
      
      {/* Pattes */}
      <mesh position={[-0.6, 0.3, 0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#1d4220" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.3, 0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#1d4220" roughness={0.8} />
      </mesh>
      <mesh position={[-0.6, 0.3, -0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#1d4220" roughness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.3, -0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#1d4220" roughness={0.8} />
      </mesh>
      
      {/* Épines dorsales */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 1.8 + i * 0.2, -0.5 + i * 0.3]}
          rotation={[0, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.1, 0.4, 4]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

export default DinoModel;
