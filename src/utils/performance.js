// Utilitaires d'optimisation de performance pour les modèles 3D

// Détection avancée des capacités de l'appareil
export const detectDeviceCapabilities = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  const capabilities = {
    hasWebGL: !!gl,
    hasWebGL2: !!document.createElement('canvas').getContext('webgl2'),
    deviceMemory: navigator.deviceMemory || 4, // GB estimé
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    maxTextureSize: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 2048,
    maxRenderbufferSize: gl ? gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) : 2048,
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowEnd: false
  };
  
  // Détection GPU bas de gamme
  if (gl) {
    const renderer = gl.getParameter(gl.RENDERER);
    const vendor = gl.getParameter(gl.VENDOR);
    
    const lowEndGPUs = [
      'adreno 3', 'adreno 4', 'adreno 5', // GPU mobiles bas de gamme
      'mali-t', 'mali-g', // GPU ARM bas de gamme
      'powervr', // GPU PowerVR
      'intel hd graphics 3000', 'intel hd graphics 4000', // Intel intégrés anciens
      'intel(r) hd graphics'
    ];
    
    const rendererLower = renderer.toLowerCase();
    capabilities.isLowEnd = lowEndGPUs.some(gpu => rendererLower.includes(gpu));
  }
  
  // Classification finale
  if (capabilities.deviceMemory < 2 || capabilities.isLowEnd || capabilities.isMobile) {
    capabilities.performanceLevel = 'low';
  } else if (capabilities.deviceMemory < 4 || capabilities.maxTextureSize < 4096) {
    capabilities.performanceLevel = 'medium';
  } else {
    capabilities.performanceLevel = 'high';
  }
  
  return capabilities;
};

// Préchargement intelligent basé sur les capacités
export const intelligentPreload = async (modelPaths, capabilities) => {
  const { performanceLevel, deviceMemory } = capabilities;
  
  // Limiter le nombre de modèles préchargés selon les performances
  let maxPreload;
  switch (performanceLevel) {
    case 'low':
      maxPreload = 1;
      break;
    case 'medium':
      maxPreload = 2;
      break;
    case 'high':
      maxPreload = modelPaths.length;
      break;
    default:
      maxPreload = 2;
  }
  
  const toPreload = modelPaths.slice(0, maxPreload);
  
  console.log(`🚀 Préchargement de ${toPreload.length}/${modelPaths.length} modèles (mode: ${performanceLevel})`);
  
  // Préchargement progressif avec délai
  const promises = toPreload.map((path, index) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ici on peut utiliser useGLTF.preload de @react-three/drei
        console.log(`📦 Préchargement: ${path}`);
        resolve(path);
      }, index * 200); // Délai progressif pour éviter de surcharger
    });
  });
  
  return Promise.all(promises);
};

// Gestionnaire de mémoire automatique
export const createMemoryManager = () => {
  let lastCleanup = Date.now();
  const CLEANUP_INTERVAL = 30000; // 30 secondes
  
  return {
    checkAndCleanup: () => {
      const now = Date.now();
      
      if (now - lastCleanup > CLEANUP_INTERVAL) {
        // Vérifier l'utilisation mémoire si disponible
        if (performance.memory) {
          const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
          const memoryUsage = usedJSHeapSize / jsHeapSizeLimit;
          
          if (memoryUsage > 0.85) {
            console.log('⚠️ Mémoire saturée, nettoyage automatique...');
            
            // Forcer le garbage collection si possible
            if (window.gc) {
              window.gc();
            }
            
            lastCleanup = now;
            return true;
          }
        }
        
        lastCleanup = now;
      }
      
      return false;
    },
    
    getMemoryInfo: () => {
      if (performance.memory) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
        return {
          used: Math.round(usedJSHeapSize / 1048576), // MB
          total: Math.round(totalJSHeapSize / 1048576), // MB
          limit: Math.round(jsHeapSizeLimit / 1048576), // MB
          usage: usedJSHeapSize / jsHeapSizeLimit
        };
      }
      return null;
    }
  };
};

// Optimiseur de qualité adaptatif
export const createQualityOptimizer = (capabilities) => {
  const { performanceLevel, deviceMemory, maxTextureSize } = capabilities;
  
  return {
    getTextureSize: (baseSize = 1024) => {
      switch (performanceLevel) {
        case 'low':
          return Math.min(baseSize / 2, 512);
        case 'medium':
          return Math.min(baseSize, 1024);
        case 'high':
          return Math.min(baseSize * 2, maxTextureSize, 2048);
        default:
          return baseSize;
      }
    },
    
    getModelLOD: () => {
      switch (performanceLevel) {
        case 'low':
          return 0.3; // 30% de la qualité originale
        case 'medium':
          return 0.7; // 70% de la qualité originale
        case 'high':
          return 1.0; // Qualité complète
        default:
          return 0.7;
      }
    },
    
    getShadowQuality: () => {
      switch (performanceLevel) {
        case 'low':
          return { enabled: false, mapSize: 256 };
        case 'medium':
          return { enabled: true, mapSize: 512 };
        case 'high':
          return { enabled: true, mapSize: 1024 };
        default:
          return { enabled: true, mapSize: 512 };
      }
    },
    
    getAntialiasing: () => {
      return performanceLevel === 'high';
    }
  };
};

export default {
  detectDeviceCapabilities,
  intelligentPreload,
  createMemoryManager,
  createQualityOptimizer
};
