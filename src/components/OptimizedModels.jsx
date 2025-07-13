import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Configuration d'optimisation pour les modèles
const MODEL_CONFIG = {
  DINO: {
    path: '/assets/new_assets/DINO.glb',
    scale: 0.5,
    maxFaces: 10000,
    compressionLevel: 0.8
  },
  MAXIMUS: {
    path: '/assets/new_assets/MAXIMUS_SCULPT.glb',
    scale: 1.5,
    maxFaces: 8000,
    compressionLevel: 0.7
  },
  CHEVAL: {
    path: '/assets/new_assets/chevala5.glb',
    scale: 1.2,
    maxFaces: 6000,
    compressionLevel: 0.6
  }
};

// Hook pour optimiser les modèles 3D
const useOptimizedModel = (modelPath, config) => {
  const { scene, materials, nodes } = useGLTF(modelPath);
  
  const optimizedScene = useMemo(() => {
    const clonedScene = scene.clone();
    
    // Optimisation des matériaux
    Object.values(materials || {}).forEach(material => {
      if (material.map) {
        // Réduire la taille des textures pour le web
        material.map.generateMipmaps = false;
        material.map.minFilter = THREE.LinearFilter;
        material.map.magFilter = THREE.LinearFilter;
      }
      
      // Optimiser les propriétés des matériaux
      material.needsUpdate = true;
      material.roughness = Math.min(material.roughness || 0.5, 0.8);
      material.metalness = Math.min(material.metalness || 0.1, 0.5);
    });
    
    // Optimisation de la géométrie
    clonedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Simplifier la géométrie si nécessaire
        const geometry = child.geometry;
        
        // Activer le frustum culling
        child.frustumCulled = true;
        
        // Optimiser les attributs
        geometry.computeBoundingSphere();
        geometry.computeBoundingBox();
        
        // Réduire la précision pour les modèles trop détaillés
        if (geometry.attributes.position.count > config.maxFaces) {
          console.warn(`Modèle ${modelPath} très détaillé (${geometry.attributes.position.count} faces), considérez une simplification`);
        }
      }
    });
    
    return clonedScene;
  }, [scene, materials, config, modelPath]);
  
  return optimizedScene;
};

// Composant optimisé pour DINO - STATIQUE
export const OptimizedDinoModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const config = MODEL_CONFIG.DINO;
  const optimizedScene = useOptimizedModel(config.path, config);

  return (
    <group position={position} scale={scale * config.scale} {...props}>
      <primitive object={optimizedScene} />
    </group>
  );
};

// Composant optimisé pour MAXIMUS - STATIQUE
export const OptimizedMaximusModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const config = MODEL_CONFIG.MAXIMUS;
  const optimizedScene = useOptimizedModel(config.path, config);

  return (
    <group position={position} scale={scale * config.scale} {...props}>
      <primitive object={optimizedScene} />
    </group>
  );
};

// Composant optimisé pour le CHEVAL - STATIQUE
export const OptimizedChevalModel = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const config = MODEL_CONFIG.CHEVAL;
  const optimizedScene = useOptimizedModel(config.path, config);

  return (
    <group position={position} scale={scale * config.scale} {...props}>
      <primitive object={optimizedScene} />
    </group>
  );
};

// Précharger tous les modèles optimisés
Object.values(MODEL_CONFIG).forEach(config => {
  useGLTF.preload(config.path);
});

// Hook pour détecter les performances et ajuster la qualité
export const usePerformanceOptimization = () => {
  const performanceLevel = useMemo(() => {
    // Détecter le niveau de performance du dispositif
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'low';
    
    const renderer = gl.getParameter(gl.RENDERER);
    const vendor = gl.getParameter(gl.VENDOR);
    
    // Détecter les GPU mobiles ou de faible puissance
    if (renderer.includes('Adreno') || 
        renderer.includes('Mali') || 
        renderer.includes('PowerVR') ||
        vendor.includes('ARM') ||
        /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      return 'low';
    }
    
    // Détecter les GPU de moyenne gamme
    if (renderer.includes('Intel') || renderer.includes('GeForce GTX 1050')) {
      return 'medium';
    }
    
    return 'high';
  }, []);
  
  return {
    performanceLevel,
    shouldUseLOD: performanceLevel !== 'high',
    maxTextures: performanceLevel === 'high' ? 16 : performanceLevel === 'medium' ? 8 : 4,
    shadowQuality: performanceLevel === 'high' ? 1024 : performanceLevel === 'medium' ? 512 : 256
  };
};

export default { OptimizedDinoModel, OptimizedMaximusModel, OptimizedChevalModel, usePerformanceOptimization };
