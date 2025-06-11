import { Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';

// Composant animé pour le fallback de Gallery3D
const AnimatedGalleryFallback = () => {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.5;
      cubeRef.current.rotation.y += delta * 0.3;
      cubeRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      cubeRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group>
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#ef8d38" 
          emissive="#ef8d38"
          emissiveIntensity={0.4}
        />
      </mesh>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
    </group>
  );
};

const Gallery3D = () => {
  const [selectedModel, setSelectedModel] = useState(0);

  // Modèles 3D représentant le travail d'Emmanuel
  const models = [
    { name: 'Mobilier 3D', color: '#8b5a3c', description: 'Conception de plans 3D de mobilier pour l\'Association Ti Planteur' },
    { name: 'Environnements', color: '#4a7c59', description: 'Création d\'environnements 3D inspirés des paysages réunionnais' },
    { name: 'Animations', color: '#6b7280', description: 'Animations éducatives sur la biodiversité et l\'environnement' },
  ];

  const ModelPlaceholder = ({ modelIndex, position }) => {
    const model = models[modelIndex];
    const isSelected = selectedModel === modelIndex;
    
    return (
      <group position={position}>
        {/* Cube principal plus visible et lumineux */}
        <Box
          args={[2.5, 4, 1.5]}
          onClick={() => setSelectedModel(modelIndex)}
          scale={isSelected ? 1.3 : 1}
        >
          <meshStandardMaterial 
            color={model.color} 
            roughness={0.2} 
            metalness={0.4}
            emissive={model.color}
            emissiveIntensity={isSelected ? 0.5 : 0.3}
          />
        </Box>
        
        {/* Cubes décoratifs lumineux */}
        <Box args={[0.5, 0.5, 0.5]} position={[1.5, 2.5, 1]}>
          <meshStandardMaterial 
            color="#ff4444" 
            emissive="#ff0000" 
            emissiveIntensity={0.6}
          />
        </Box>
        
        <Box args={[0.3, 0.3, 0.3]} position={[-1.2, 3, 0.8]}>
          <meshStandardMaterial 
            color="#44ff44" 
            emissive="#00ff00" 
            emissiveIntensity={0.7}
          />
        </Box>
        
        {/* Indication "placeholder" */}
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.25}
          color="#ef8d38"
          anchorX="center"
          anchorY="middle"
        >
          PLACEHOLDER
        </Text>
        
        {/* Nom du modèle */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.35}
          color={isSelected ? "#ef8d38" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
        >
          {model.name}
        </Text>
        
        {/* Aura lumineuse autour du modèle sélectionné */}
        {isSelected && (
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[3, 16, 16]} />
            <meshStandardMaterial 
              color="#ef8d38"
              transparent
              opacity={0.15}
              emissive="#ef8d38"
              emissiveIntensity={0.2}
            />
          </mesh>
        )}
      </group>
    );
  };

  return (
    <section id="galerie" className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Galerie <span className="text-volcanic-orange-400">3D</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes créations 3D : du mobilier aux environnements, 
            en passant par les animations éducatives sur la biodiversité réunionnaise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Scène 3D */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-96 bg-slate-800 rounded-xl overflow-hidden canvas-container"
          >
            <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
              <Suspense fallback={<AnimatedGalleryFallback />}>
                {/* Éclairage amélioré */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4a7c59" />
                <pointLight position={[10, 5, 10]} intensity={0.6} color="#ef8d38" />
                
                {/* Environnement */}
                <Environment preset="forest" />
                
                {/* Modèles 3D avec meilleur espacement */}
                <ModelPlaceholder modelIndex={0} position={[-5, 0, 0]} />
                <ModelPlaceholder modelIndex={1} position={[0, 0, 0]} />
                <ModelPlaceholder modelIndex={2} position={[5, 0, 0]} />
                
                {/* Ombres améliorées */}
                <ContactShadows
                  position={[0, -2.5, 0]}
                  opacity={0.6}
                  scale={25}
                  blur={2.5}
                  far={6}
                  color="#000000"
                />
                
                {/* Contrôles */}
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
                  autoRotate
                  autoRotateSpeed={0.2}
                  minDistance={6}
                  maxDistance={15}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Informations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-volcanic-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                {models[selectedModel].name}
              </h3>
              <p className="text-gray-300 mb-6">
                {models[selectedModel].description}
              </p>
              
              {/* Sélecteur de modèles */}
              <div className="grid grid-cols-3 gap-3">
                {models.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedModel(index)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      selectedModel === index
                        ? 'bg-volcanic-orange-500 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Message informatif sur les modèles temporaires */}
            <div className="bg-gradient-to-r from-volcanic-orange-500/10 to-forest-green-500/10 rounded-xl p-6 border border-volcanic-orange-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-volcanic-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <h4 className="text-lg font-semibold text-volcanic-orange-400">
                  Modèles 3D en cours de préparation
                </h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Les modèles affichés sont des <strong>placeholders temporaires</strong>. 
                Les véritables créations 3D d'Emmanuel (mobilier, environnements réunionnais, animations éducatives) 
                seront intégrées prochainement depuis ses fichiers Blender.
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-volcanic-orange-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-xs">Modèles 3D professionnels bientôt disponibles</span>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-volcanic-orange-400">4+</div>
                <div className="text-gray-400">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-green-400">15+</div>
                <div className="text-gray-400">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3</div>
                <div className="text-gray-400">Logiciels maîtrisés</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery3D;
