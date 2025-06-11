import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import DinoModel from './DinoModel';
import portfolioData from '../data/portfolio.json';

const Hero = () => {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 canvas-container">
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {/* Environment */}
            <Environment preset="sunset" />
            
            {/* 3D Text */}
            <Text
              position={[0, 4, 0]}
              fontSize={2}
              color="#ef8d38"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.woff"
            >
              {portfolioData.personal.name.toUpperCase()}
            </Text>
            
            {/* Dino Model */}
            <DinoModel position={[0, -1, 0]} />
            
            {/* Ground shadow */}
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
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
              autoRotateSpeed={0.5}
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
