import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OptimizedDinoModel } from './OptimizedModels';

const InteractiveDinoModel = ({ position = [0, 0, 0], scale = 1 }) => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Mouvement de flottaison très subtil et optimisé
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.position.y = position[1] + floatY;
      
      // Rotation très légère uniquement sur Y
      const rotationAngle = Math.sin(state.clock.elapsedTime * 0.3) * (10 * Math.PI / 180); // 10 degrés seulement
      groupRef.current.rotation.y = rotationAngle;
    }
  });
  
  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
    >
      {/* Modèle de dinosaure optimisé - animations de base seulement */}
      <OptimizedDinoModel 
        position={[0, 0, 0]} 
        scale={1}
        rotation={[0, Math.PI * 0.1, 0]} // Angle de base fixe
      />
      
      {/* Éclairage simplifié pour performance maximale */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.0} 
        color="#ffffff"
      />
    </group>
  );
};

export default InteractiveDinoModel;
