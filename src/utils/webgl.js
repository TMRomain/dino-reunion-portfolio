// Utilitaire pour détecter le support WebGL
export const detectWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    
    // Essayons WebGL2 d'abord, puis WebGL1
    const gl = canvas.getContext('webgl2') || 
               canvas.getContext('webgl') || 
               canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL detection: No WebGL context available');
      return { supported: false, reason: 'WebGL context not available' };
    }

    // Test basique : essayer de créer un shader simple
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.warn('WebGL detection: Cannot create vertex shader');
      return { supported: false, reason: 'Cannot create shaders' };
    }

    // Nettoyage
    gl.deleteShader(vertexShader);
    
    // Informations optionnelles (peuvent échouer mais n'invalident pas WebGL)
    let vendor = 'Unknown';
    let renderer = 'Unknown';
    let maxTextureSize = 'Unknown';
    
    try {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Unknown';
        renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Unknown';
      }
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 'Unknown';
    } catch (e) {
      console.log('WebGL detection: Could not get extended info, but WebGL works');
    }
    
    console.log('WebGL detection: Success!', {
      version: gl.getParameter(gl.VERSION),
      vendor,
      renderer,
      maxTextureSize
    });
    
    return {
      supported: true,
      version: gl.getParameter(gl.VERSION),
      vendor,
      renderer,
      maxTextureSize
    };
  } catch (error) {
    console.error('WebGL detection error:', error);
    return { supported: false, reason: error.message };
  }
};

// Hook pour utiliser la détection WebGL
import { useState, useEffect } from 'react';

export const useWebGL = () => {
  const [webglInfo, setWebglInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWebGL = () => {
      const info = detectWebGL();
      setWebglInfo(info);
      setIsLoading(false);
      
      if (info.supported) {
        console.log('WebGL is supported and working!');
      } else {
        console.warn('WebGL is not supported:', info.reason);
      }
    };

    // Délai court pour permettre au DOM de se charger
    const timer = setTimeout(checkWebGL, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Par défaut, on autorise le rendu 3D (approche optimiste)
  // On ne bloque que si on détecte vraiment un problème
  return { 
    webglInfo, 
    isLoading, 
    isSupported: isLoading ? true : (webglInfo?.supported !== false) 
  };
};
