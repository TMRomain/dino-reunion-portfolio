import { Suspense, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OptimizedDinoModel, OptimizedMaximusModel, OptimizedChevalModel, usePerformanceOptimization } from './OptimizedModels';

// Cache global pour les géométries réutilisables
const geometryCache = new Map();

// Fonction pour créer des géométries optimisées en cache
const getCachedGeometry = (type, args) => {
  const key = `${type}-${args.join('-')}`;
  if (!geometryCache.has(key)) {
    let geometry;
    switch (type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(...args);
        break;
      default:
        return null;
    }
    geometryCache.set(key, geometry);
  }
  return geometryCache.get(key);
};

// Fonction pour nettoyer le cache si nécessaire (libérer la mémoire)
const clearGeometryCache = () => {
  geometryCache.forEach(geometry => {
    if (geometry && geometry.dispose) {
      geometry.dispose();
    }
  });
  geometryCache.clear();
};

// Hook pour nettoyer automatiquement en cas de manque de mémoire
const useMemoryOptimization = () => {
  const cleanup = () => {
    if (performance.memory && performance.memory.usedJSHeapSize > performance.memory.jsHeapSizeLimit * 0.9) {
      clearGeometryCache();
      console.log('🧹 Cache de géométries nettoyé pour optimiser la mémoire');
    }
  };
  
  return { cleanup, clearGeometryCache };
};

// Composants wrapper avec gestion de performance
const DinoGLTFModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const { shouldUseLOD } = usePerformanceOptimization();
  const adjustedScale = shouldUseLOD ? scale * 0.8 : scale;
  
  return <OptimizedDinoModel position={position} scale={adjustedScale} {...props} />;
};

const MaximusModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const { shouldUseLOD } = usePerformanceOptimization();
  const adjustedScale = shouldUseLOD ? scale * 0.8 : scale;
  
  return <OptimizedMaximusModel position={position} scale={adjustedScale} {...props} />;
};

const ChevalModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const { shouldUseLOD } = usePerformanceOptimization();
  const adjustedScale = shouldUseLOD ? scale * 0.8 : scale;
  
  return <OptimizedChevalModel position={position} scale={adjustedScale} {...props} />;
};

// Composant d'effet de chargement ultra-minimaliste - Version anti-lag ZERO animation
const UniversalLoader = () => {
  return (
    <group>
      {/* Éclairage minimal */}
      <ambientLight intensity={0.9} />
      
      {/* Une seule sphère statique ultra-simple */}
      <mesh>
        <sphereGeometry args={[0.1, 6, 4]} />
        <meshBasicMaterial color="#ef8d38" />
      </mesh>
    </group>
  );
};

// Version ultra-minimaliste (pour appareils très limités)
const MicroLoader = () => {
  return (
    <group>
      <ambientLight intensity={1} />
      {/* Pas d'animation du tout pour performance maximale */}
      <mesh>
        <sphereGeometry args={[0.05, 4, 4]} />
        <meshBasicMaterial color="#ef8d38" />
      </mesh>
    </group>
  );
};

// Composant de fallback optimisé avec détection de performance intelligente
const ModelLoader = ({ children, name = "Modèle" }) => {
  const { performanceLevel, shouldUseLOD } = usePerformanceOptimization();
  
  // Sélection intelligente du loader selon les performances
  const optimizedFallback = useMemo(() => {
    // Détection de mémoire faible
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 2;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (hasLowMemory || (performanceLevel === 'low' && isMobile)) {
      console.log('🔧 Utilisation du MicroLoader pour performances optimales');
      return <MicroLoader />;
    } else if (performanceLevel === 'low') {
      return (
        <group>
          <ambientLight intensity={1} />
          <mesh>
            <sphereGeometry args={[0.15, 4, 4]} />
            <meshBasicMaterial color="#ef8d38" />
          </mesh>
        </group>
      );
    }
    return <UniversalLoader />;
  }, [performanceLevel]);
  
  return (
    <Suspense fallback={optimizedFallback}>
      {children}
    </Suspense>
  );
};

// Ne plus précharger ici, c'est fait dans OptimizedModels.jsx

export { DinoGLTFModel, MaximusModel, ChevalModel, ModelLoader, UniversalLoader, MicroLoader, useMemoryOptimization };
