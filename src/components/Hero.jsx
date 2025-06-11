import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import DinoModel from './DinoModel';
import portfolioData from '../data/portfolio.json';

// Composant animé pour le fallback
const AnimatedFallback = () => {
  const groupRef = useRef();
  const cube1Ref = useRef();
  const cube2Ref = useRef();
  const cube3Ref = useRef();

  useFrame((state, delta) => {
    // Animation du groupe principal
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
    }
    
    // Animation du cube principal
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.4;
      cube1Ref.current.rotation.z += delta * 0.2;
    }
    
    // Animation des cubes satellites
    if (cube2Ref.current) {
      cube2Ref.current.rotation.x += delta * 0.6;
      cube2Ref.current.rotation.y += delta * 0.4;
      cube2Ref.current.position.x = 4 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      cube2Ref.current.position.y = 2 + Math.cos(state.clock.elapsedTime * 1.5) * 0.3;
    }
    
    if (cube3Ref.current) {
      cube3Ref.current.rotation.y += delta * 0.5;
      cube3Ref.current.rotation.z += delta * 0.3;
      cube3Ref.current.position.x = -4 + Math.cos(state.clock.elapsedTime * 1.8) * 0.4;
      cube3Ref.current.position.z = 2 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cube principal lumineux */}
      <mesh ref={cube1Ref} position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color="#ef8d38" 
          emissive="#ef8d38"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      
      {/* Petits cubes orbitants */}
      <mesh ref={cube2Ref} position={[4, 2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#4a7c59" 
          emissive="#4a7c59"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh ref={cube3Ref} position={[-4, -1, 2]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial 
          color="#2f9960" 
          emissive="#2f9960"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Éclairage de fallback */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[0, 3, 0]} intensity={1} color="#ef8d38" />
    </group>
  );
};

const Hero = () => {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 canvas-container">
        <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
          <Suspense fallback={<AnimatedFallback />}>
            {/* Lighting amélioré pour plus de visibilité */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.8} />
            <directionalLight position={[-10, 10, -5]} intensity={1.2} color="#4a7c59" />
            <pointLight position={[-10, -10, -10]} intensity={1.2} color="#4a7c59" />
            <pointLight position={[10, -5, 10]} intensity={1} color="#ef8d38" />
            <pointLight position={[0, 8, 0]} intensity={1.5} color="#ffffff" />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ef8d38" />
            
            {/* Environment */}
            <Environment preset="sunset" />
            
            {/* 3D Text */}
            <Text
              position={[0, 5.5, 0]}
              fontSize={1.8}
              color="#ef8d38"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.woff"
            >
              {portfolioData.personal.name.toUpperCase()}
            </Text>
            
            {/* Dino Model */}
            <DinoModel position={[0, -1, 0]} scale={[1.2, 1.2, 1.2]} />
            
            {/* Ground shadow amélioré */}
            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.6}
              scale={15}
              blur={2.5}
              far={6}
              color="#000000"
            />
            
            {/* Camera controls */}
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
              autoRotate
              autoRotateSpeed={0.3}
              minDistance={8}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {portfolioData.personal.title} <span className="text-volcanic-orange-400">3D</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Spécialisé en {portfolioData.personal.specialty}. 
            Passionné par la création de mondes virtuels et l'animation de personnages 3D 
            depuis l'île de La Réunion.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => document.getElementById('galerie').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-volcanic-orange-500 hover:bg-volcanic-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Voir la Galerie
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-forest-green-500 text-forest-green-400 hover:bg-forest-green-500 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              Me Contacter
            </button>
          </motion.div>
          
          {/* Note sur le modèle temporaire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-8"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-volcanic-orange-500/20">
              <div className="w-2 h-2 bg-volcanic-orange-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">
                Modèle 3D temporaire - Vraies créations Blender bientôt disponibles
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
