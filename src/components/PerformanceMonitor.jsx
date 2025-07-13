import { useEffect, useState } from 'react';

// Composant pour monitorer les performances et aider au debug
const PerformanceMonitor = ({ enabled = false, pageFullyLoaded, animationsComplete, shouldLoad3D }) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    domReady: false,
    pageLoaded: false,
    threejsLoaded: false,
    startTime: performance.now()
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    
    // Surveiller le DOM ready
    const checkDOMReady = () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setMetrics(prev => ({ ...prev, domReady: true }));
      }
    };

    // Surveiller le chargement complet de la page
    const handlePageLoad = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({ 
        ...prev, 
        pageLoaded: true,
        loadTime: Math.round(loadTime)
      }));
    };

    // Surveiller l'usage mémoire
    const checkMemory = () => {
      if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        setMetrics(prev => ({ ...prev, memoryUsage: memoryMB }));
      }
    };

    // Listeners
    document.addEventListener('readystatechange', checkDOMReady);
    window.addEventListener('load', handlePageLoad);
    
    // Check initial state
    checkDOMReady();
    
    // Check memory periodically
    const memoryInterval = setInterval(checkMemory, 2000);
    
    return () => {
      document.removeEventListener('readystatechange', checkDOMReady);
      window.removeEventListener('load', handlePageLoad);
      clearInterval(memoryInterval);
    };
  }, [enabled]);

  // Calculer le temps écoulé depuis le début
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.round(performance.now() - metrics.startTime));
    }, 100);
    return () => clearInterval(interval);
  }, [enabled, metrics.startTime]);

  if (!enabled) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white text-xs p-3 rounded-lg font-mono z-50 max-w-xs">
      <div className="space-y-1">
        <div className="font-bold text-green-400">📊 Performance Monitor</div>
        <div className="text-cyan-400">⏱️ Temps: {elapsedTime}ms</div>
        <div>DOM Ready: {metrics.domReady ? '✅' : '⏳'}</div>
        <div>Page Loaded: {metrics.pageLoaded ? '✅' : '⏳'}</div>
        <div className="text-yellow-400">🎬 Page Fully Loaded: {pageFullyLoaded ? '✅' : '⏳'}</div>
        <div className="text-purple-400">🎭 Animations Complete: {animationsComplete ? '✅' : '⏳'}</div>
        <div className="text-orange-400">🦕 3D Should Load: {shouldLoad3D ? '✅' : '⏳'}</div>
        <div>Load Time: {metrics.loadTime}ms</div>
        {metrics.memoryUsage > 0 && (
          <div>Memory: {metrics.memoryUsage}MB</div>
        )}
        <div className="text-gray-400 mt-2 text-[10px]">
          readyState: {document.readyState}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
