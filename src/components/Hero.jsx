import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { useWebGL } from '../utils/webgl';
import { ModelLoader, UniversalLoader } from './RealModels';
import InteractiveDinoModel from './InteractiveDinoModel';
import portfolioData from '../data/portfolio.json';

// Maintenant utilise UniversalLoader qui est défini dans RealModels.jsx

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [pageFullyLoaded, setPageFullyLoaded] = useState(false);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const { webglInfo, isLoading, isSupported } = useWebGL();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Étape 1: Détecter quand la page est complètement chargée
  useEffect(() => {
    const handlePageLoad = () => {
      // Attendre que tous les assets (images, fonts, etc.) soient chargés
      if (document.readyState === 'complete') {
        setTimeout(() => {
          console.log('📄 Page complètement chargée, début du délai d\'attente');
          setPageFullyLoaded(true);
        }, 1500); // Augmenté à 1.5 secondes pour laisser le fade-in se terminer
      }
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    return () => window.removeEventListener('load', handlePageLoad);
  }, []);

  // Étape 2: Détecter quand les animations principales sont terminées
  useEffect(() => {
    if (pageFullyLoaded) {
      const timer = setTimeout(() => {
        setAnimationsComplete(true);
      }, 4000); // Augmenté à 4 secondes pour laisser toutes les animations finir

      return () => clearTimeout(timer);
    }
  }, [pageFullyLoaded]);

  // Étape 3: Chargement intelligent de la 3D avec délai supplémentaire
  useEffect(() => {
    if (!animationsComplete) return;

    let scrollTimeout;
    let loadTimeout;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Si l'utilisateur fait défiler au-delà de 30% de la page, annuler la 3D
      if (scrollY > viewportHeight * 0.3) {
        clearTimeout(loadTimeout);
        return;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Si on est toujours sur la section Hero, charger la 3D
        if (window.scrollY < viewportHeight * 0.3) {
          setShouldLoad3D(true);
        }
      }, 1500); // Augmenté le délai de scroll
    };
    
    // Chargement par défaut après 3 secondes supplémentaires si pas de scroll
    loadTimeout = setTimeout(() => {
      console.log('🦕 Début du chargement 3D après attente complète');
      setShouldLoad3D(true);
    }, 3000); // Délai de 3 secondes après la fin des animations
    
    // Écouter le scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationsComplete]);

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden w-full max-w-full mb-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800" />
      
      {/* Layout container - Stack on mobile, side by side on desktop */}
      <div className="relative z-10 h-screen flex flex-col lg:flex-row w-full max-w-full overflow-hidden">
        
        {/* Content section */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-16 w-full max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-2xl w-full"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6"
            >
              {portfolioData.personal.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed"
            >
              Spécialisé en <span className="text-volcanic-orange-400 font-semibold">animation 3D & synthèse d'image</span>
              <br />
              Créateur d'univers virtuels depuis La Réunion
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => {
                  const element = document.getElementById('galerie');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-volcanic-orange-500 hover:bg-volcanic-orange-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
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
                className="border border-volcanic-orange-500 text-volcanic-orange-500 hover:bg-volcanic-orange-500 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <span>💬</span>
                <span>Discutons de votre projet</span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
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
          {!pageFullyLoaded ? (
            // Étape 1: Placeholder pendant le chargement initial de la page
            <div className="w-full h-full flex items-center justify-center bg-transparent">
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="w-16 h-16 border-4 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.p 
                  className="text-gray-400 text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Chargement de la page...
                </motion.p>
              </motion.div>
            </div>
          ) : !animationsComplete ? (
            // Étape 2: Placeholder pendant les animations principales
            <div className="w-full h-full flex items-center justify-center bg-transparent">
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.div 
                  className="w-12 h-12 border-3 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin mx-auto"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Préparation de l'expérience 3D...
                </motion.p>
              </motion.div>
            </div>
          ) : shouldLoad3D ? (
            // Étape 3: Canvas 3D seulement quand tout est prêt
            <WebGLErrorBoundary
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-transparent">
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
          ) : (
            // Placeholder final en attente du trigger 3D
            <div className="w-full h-full flex items-center justify-center bg-transparent relative overflow-hidden">
              <motion.div 
                className="text-center space-y-6 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-volcanic-orange-500 to-volcanic-orange-600 rounded-full mx-auto flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 360 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.3,
                    rotate: {
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear"
                    }
                  }}
                >
                  <span className="text-2xl">🦕</span>
                </motion.div>
                <motion.p 
                  className="text-gray-300 text-lg font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Portfolio 3D
                </motion.p>
                <motion.p 
                  className="text-gray-500 text-sm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Chargement de l'expérience 3D dans quelques instants...
                </motion.p>
              </motion.div>
              
              {/* Effet de particules d'arrière-plan */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-volcanic-orange-500 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.3, 0.8, 0.3],
                      scale: [0, 1, 1, 0],
                      y: [-20, -40, -20],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2 + 1, // Délai pour éviter l'animation immédiate
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator - Only show on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
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
