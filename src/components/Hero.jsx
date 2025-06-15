import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { useWebGL } from '../utils/webgl';
import portfolioData from '../data/portfolio.json';

// Composant simple avec des cubes flottants
const FloatingCubes = () => {
  const mainCubeRef = useRef();
  const cube1Ref = useRef();
  const cube2Ref = useRef();
  const cube3Ref = useRef();
  const cube4Ref = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    // Cube principal au centre - rotation simple
    if (mainCubeRef.current) {
      mainCubeRef.current.rotation.x += delta * 0.3;
      mainCubeRef.current.rotation.y += delta * 0.2;
      mainCubeRef.current.position.y = Math.sin(time * 0.8) * 0.3;
    }
    
    // Cubes satellites flottants
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.4;
      cube1Ref.current.rotation.z += delta * 0.3;
      cube1Ref.current.position.x = 3 + Math.sin(time * 1.2) * 0.5;
      cube1Ref.current.position.y = 1 + Math.cos(time * 1.5) * 0.4;
    }
    
    if (cube2Ref.current) {
      cube2Ref.current.rotation.y += delta * 0.5;
      cube2Ref.current.rotation.z += delta * 0.2;
      cube2Ref.current.position.x = -3 + Math.cos(time * 1.1) * 0.6;
      cube2Ref.current.position.y = -1 + Math.sin(time * 1.3) * 0.3;
    }
    
    if (cube3Ref.current) {
      cube3Ref.current.rotation.x += delta * 0.35;
      cube3Ref.current.rotation.y += delta * 0.4;
      cube3Ref.current.position.z = 2 + Math.sin(time * 1.4) * 0.4;
      cube3Ref.current.position.y = 2 + Math.cos(time * 1.6) * 0.3;
    }
    
    if (cube4Ref.current) {
      cube4Ref.current.rotation.y += delta * 0.6;
      cube4Ref.current.rotation.x += delta * 0.25;
      cube4Ref.current.position.z = -2 + Math.cos(time * 1.0) * 0.5;
      cube4Ref.current.position.y = -2 + Math.sin(time * 1.7) * 0.4;
    }
  });

  return (
    <group>
      {/* Cube principal */}
      <mesh ref={mainCubeRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ef8d38" />
      </mesh>
      
      {/* Cubes flottants */}
      <mesh ref={cube1Ref} position={[3, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      
      <mesh ref={cube2Ref} position={[-3, -1, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#2f9960" />
      </mesh>
      
      <mesh ref={cube3Ref} position={[0, 2, 2]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      
      <mesh ref={cube4Ref} position={[0, -2, -2]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* Éclairage plus lumineux */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2.0} 
        color="#ffffff"
      />
      <pointLight 
        position={[-8, 5, 8]} 
        intensity={1.5} 
        color="#ef8d38" 
        distance={25}
        decay={1.5}
      />
      <pointLight 
        position={[8, -5, -8]} 
        intensity={1.2} 
        color="#4a7c59" 
        distance={20}
        decay={1.5}
      />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={0.2}
        intensity={1.5}
        color="#ffffff"
        target-position={[0, 0, 0]}
      />
    </group>
  );
};

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { webglInfo, isLoading, isSupported } = useWebGL();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
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

        {/* Simple 3D Scene section */}
        <div className="flex-1 relative min-h-[50vh] lg:min-h-0 w-full max-w-full overflow-hidden">
          {isLoading ? (
            // Loading state - très court
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300">Chargement de la scène 3D...</p>
              </div>
            </div>
          ) : (
            // Toujours afficher la scène 3D - WebGLErrorBoundary s'occupera des erreurs
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
                camera={{ position: [0, 2, 8], fov: 60 }} 
                className="w-full h-full"
                gl={{
                  alpha: true,
                  premultipliedAlpha: false
                }}
              >
                <Suspense fallback={null}>
                  <FloatingCubes />
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
