import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const DinoModel = ({ position = [0, 0, 0], ...props }) => {
  const groupRef = useRef();
  const cube1Ref = useRef();
  const cube2Ref = useRef();
  const cube3Ref = useRef();
  
  // Animation de rotation et mouvement
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
    
    // Rotation des cubes individuels
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.5;
      cube1Ref.current.rotation.y += delta * 0.3;
    }
    if (cube2Ref.current) {
      cube2Ref.current.rotation.x += delta * 0.7;
      cube2Ref.current.rotation.z += delta * 0.4;
    }
    if (cube3Ref.current) {
      cube3Ref.current.rotation.y += delta * 0.6;
      cube3Ref.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} {...props}>
      {/* Texte informatif au-dessus */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.4}
        color="#ef8d38"
        anchorX="center"
        anchorY="middle"
        maxWidth={200}
      >
        MODÈLE 3D TEMPORAIRE
      </Text>
      
      <Text
        position={[0, 5.3, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={200}
      >
        (Vraies créations Blender bientôt disponibles)
      </Text>

      {/* Cube principal central */}
      <mesh ref={cube1Ref} position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial 
          color="#ef8d38" 
          roughness={0.2} 
          metalness={0.4}
          emissive="#ef8d38"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Cubes satellites orbitants */}
      <mesh ref={cube2Ref} position={[4, 3, 2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color="#4a7c59" 
          roughness={0.3}
          metalness={0.3}
          emissive="#2f9960"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      <mesh ref={cube3Ref} position={[-3, 1, -2]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#2f9960" 
          roughness={0.3}
          metalness={0.2}
          emissive="#4a7c59"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Cube au sol */}
      <mesh position={[2, 0.3, -3]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial 
          color="#1d4220" 
          roughness={0.5}
          emissive="#0f2a12"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Points lumineux décoratifs */}
      <mesh position={[0, 4, 1]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff0000" 
          emissiveIntensity={0.8}
        />
      </mesh>
      
      <mesh position={[-1, 3, -1]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial 
          color="#44ff44" 
          emissive="#00ff00" 
          emissiveIntensity={0.6}
        />
      </mesh>
      
      <mesh position={[1.5, 2.5, 0.5]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#4444ff" 
          emissive="#0000ff" 
          emissiveIntensity={0.7}
        />
      </mesh>
      
      {/* Aura lumineuse autour de l'ensemble */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial 
          color="#ef8d38"
          transparent
          opacity={0.08}
          emissive="#ef8d38"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
};

export default DinoModel;
