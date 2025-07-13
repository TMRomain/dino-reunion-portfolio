import { createContext, useContext, useEffect, useState } from 'react';

// Contexte pour la gestion de la performance
const PerformanceContext = createContext();

// Provider pour la gestion de la performance
export const PerformanceProvider = ({ children }) => {
  const [performanceSettings, setPerformanceSettings] = useState({
    quality: 'high', // 'low', 'medium', 'high'
    enableShadows: true,
    enableAntialiasing: true,
    enableEnvironment: true,
    modelDetailLevel: 1, // 0.5, 1, 1.5
    autoDetected: false
  });

  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    hasTouch: false,
    gpu: 'unknown',
    memoryGb: 0
  });

  // Détection automatique des performances
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /tablet|ipad/i.test(userAgent);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setDeviceInfo({
        isMobile,
        isTablet,
        hasTouch,
        gpu: getGPUInfo(),
        memoryGb: getMemoryInfo()
      });

      // Auto-configuration basée sur l'appareil
      if (isMobile) {
        setPerformanceSettings(prev => ({
          ...prev,
          quality: 'low',
          enableShadows: false,
          enableAntialiasing: false,
          enableEnvironment: false,
          modelDetailLevel: 0.5,
          autoDetected: true
        }));
      } else if (isTablet) {
        setPerformanceSettings(prev => ({
          ...prev,
          quality: 'medium',
          enableShadows: true,
          enableAntialiasing: false,
          enableEnvironment: true,
          modelDetailLevel: 0.8,
          autoDetected: true
        }));
      }
    };

    detectDevice();
  }, []);

  // Obtenir les informations GPU
  const getGPUInfo = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return 'unknown';

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer.toLowerCase();
      }
      return 'webgl-supported';
    } catch (error) {
      return 'unknown';
    }
  };

  // Obtenir les informations mémoire (approximatives)
  const getMemoryInfo = () => {
    try {
      // API disponible sur certains navigateurs
      if ('memory' in performance) {
        return Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024 * 1024));
      }
      // Estimation basée sur le type d'appareil
      if (deviceInfo.isMobile) return 2;
      if (deviceInfo.isTablet) return 4;
      return 8;
    } catch (error) {
      return 4; // Valeur par défaut
    }
  };

  // Fonction pour ajuster automatiquement les performances
  const optimizeForDevice = () => {
    if (deviceInfo.isMobile) {
      return {
        quality: 'low',
        enableShadows: false,
        enableAntialiasing: false,
        enableEnvironment: false,
        modelDetailLevel: 0.5
      };
    } else if (deviceInfo.isTablet) {
      return {
        quality: 'medium',
        enableShadows: true,
        enableAntialiasing: false,
        enableEnvironment: true,
        modelDetailLevel: 0.8
      };
    } else {
      // Desktop
      const isLowEndGPU = deviceInfo.gpu.includes('intel') || 
                         deviceInfo.gpu.includes('adreno') || 
                         deviceInfo.gpu.includes('mali');
      
      if (isLowEndGPU) {
        return {
          quality: 'medium',
          enableShadows: true,
          enableAntialiasing: false,
          enableEnvironment: true,
          modelDetailLevel: 0.8
        };
      } else {
        return {
          quality: 'high',
          enableShadows: true,
          enableAntialiasing: true,
          enableEnvironment: true,
          modelDetailLevel: 1
        };
      }
    }
  };

  // Mettre à jour les paramètres
  const updateSettings = (newSettings) => {
    setPerformanceSettings(prev => ({
      ...prev,
      ...newSettings,
      autoDetected: false
    }));
  };

  // Réinitialiser aux paramètres automatiques
  const resetToAuto = () => {
    const autoSettings = optimizeForDevice();
    setPerformanceSettings({
      ...autoSettings,
      autoDetected: true
    });
  };

  const value = {
    performanceSettings,
    deviceInfo,
    updateSettings,
    resetToAuto,
    optimizeForDevice
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Hook pour utiliser le contexte de performance
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// Composant de contrôle de performance pour l'utilisateur
export const PerformanceControl = () => {
  const { performanceSettings, deviceInfo, updateSettings, resetToAuto } = usePerformance();

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-4">
      <h3 className="text-white font-semibold mb-3">Paramètres de Performance</h3>
      
      {/* Informations sur l'appareil */}
      <div className="mb-4 text-sm text-gray-400">
        <p>Appareil: {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablette' : 'Bureau'}</p>
        <p>GPU: {deviceInfo.gpu}</p>
        {performanceSettings.autoDetected && (
          <p className="text-green-400">✓ Paramètres optimisés automatiquement</p>
        )}
      </div>

      {/* Contrôles de qualité */}
      <div className="space-y-3">
        <div>
          <label className="block text-white text-sm mb-1">Qualité générale</label>
          <select
            value={performanceSettings.quality}
            onChange={(e) => updateSettings({ quality: e.target.value })}
            className="w-full bg-slate-700 text-white rounded px-3 py-1 text-sm"
          >
            <option value="low">Faible (performance max)</option>
            <option value="medium">Moyenne (équilibré)</option>
            <option value="high">Élevée (qualité max)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="shadows"
            checked={performanceSettings.enableShadows}
            onChange={(e) => updateSettings({ enableShadows: e.target.checked })}
            className="text-volcanic-orange-500"
          />
          <label htmlFor="shadows" className="text-white text-sm">Ombres</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="antialiasing"
            checked={performanceSettings.enableAntialiasing}
            onChange={(e) => updateSettings({ enableAntialiasing: e.target.checked })}
            className="text-volcanic-orange-500"
          />
          <label htmlFor="antialiasing" className="text-white text-sm">Anti-aliasing</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="environment"
            checked={performanceSettings.enableEnvironment}
            onChange={(e) => updateSettings({ enableEnvironment: e.target.checked })}
            className="text-volcanic-orange-500"
          />
          <label htmlFor="environment" className="text-white text-sm">Environnement HDR</label>
        </div>

        <div>
          <label className="block text-white text-sm mb-1">
            Niveau de détail: {Math.round(performanceSettings.modelDetailLevel * 100)}%
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={performanceSettings.modelDetailLevel}
            onChange={(e) => updateSettings({ modelDetailLevel: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <button
          onClick={resetToAuto}
          className="w-full bg-volcanic-orange-500 text-white py-2 px-4 rounded text-sm hover:bg-volcanic-orange-600 transition-colors"
        >
          Réinitialiser (Auto)
        </button>
      </div>
    </div>
  );
};

export default PerformanceProvider;
