import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { useWebGL } from '../utils/webgl';
import { ModelLoader, UniversalLoader } from './RealModels';
import InteractiveDinoModel from './InteractiveDinoModel';
import portfolioData from '../data/portfolio.json';

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const { webglInfo, isLoading, isSupported } = useWebGL();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Chargement 3D optimisé - plus rapide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad3D(true);
    }, 800); // Réduit de 1500ms à 800ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden w-full max-w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Layout container - Stack on mobile, side by side on desktop */}
      <div className="relative z-10 h-screen flex flex-col lg:flex-row w-full max-w-full overflow-hidden">
        
        {/* Content section */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-16 w-full max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6"
            >
              {portfolioData.personal.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed"
            >
              Spécialisé en <span className="text-volcanic-orange-400 font-semibold">animation 3D & synthèse d'image</span>
              <br />
              Créateur d'univers virtuels depuis La Réunion
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => {
                  const element = document.getElementById('galerie');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-volcanic-orange-500 hover:bg-volcanic-orange-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>🎨</span>
                <span>Explorer mes créations 3D</span>
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border border-volcanic-orange-500 text-volcanic-orange-500 hover:bg-volcanic-orange-500 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <span>💬</span>
                <span>Discutons de votre projet</span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 lg:mt-8"
            >
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-3 py-1 lg:px-4 lg:py-2 border border-volcanic-orange-500/20">
                <div className="w-2 h-2 bg-volcanic-orange-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-xs lg:text-sm">
                  Portfolio interactif • Modélisation 3D • Animation • Rendu
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive 3D Dino section */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-0 w-full max-w-full overflow-hidden">
          {!shouldLoad3D ? (
            // Placeholder simple pendant le chargement
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 border-3 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin mx-auto"/>
                <p className="text-gray-400 text-sm">Chargement de l'expérience 3D...</p>
              </motion.div>
            </div>
          ) : (
            // Canvas 3D
            <WebGLErrorBoundary
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-volcanic-orange-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-volcanic-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Scène 3D temporairement indisponible
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Un problème est survenu avec le rendu 3D.
                    </p>
                    <div className="text-xs text-gray-400">
                      <p>Rechargez la page ou essayez :</p>
                      <p>• Mettre à jour votre navigateur</p>
                      <p>• Activer l'accélération matérielle</p>
                    </div>
                  </div>
                </div>
              }
            >
              <Canvas 
                camera={{ position: [0, 2, 6], fov: 45 }} 
                className="w-full h-full"
                gl={{
                  alpha: true,
                  premultipliedAlpha: false,
                  antialias: false,
                  powerPreference: "default"
                }}
              >
                <Suspense fallback={<UniversalLoader />}>
                  <ModelLoader name="Dinosaure">
                    <InteractiveDinoModel 
                      position={[0, -1, 0]} 
                      scale={2}
                    />
                  </ModelLoader>
                </Suspense>
              </Canvas>
            </WebGLErrorBoundary>
          )}
        </div>
      </div>

      {/* Scroll indicator - Only show on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-sm font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
