import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

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
        {/* Modèle principal */}
        <Box
          args={[2, 3, 1]}
          onClick={() => setSelectedModel(modelIndex)}
          scale={isSelected ? 1.2 : 1}
        >
          <meshStandardMaterial color={model.color} roughness={0.3} metalness={0.1} />
        </Box>
        
        {/* Détails supplémentaires */}
        <Sphere args={[0.3]} position={[0, 2, 0.6]}>
          <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
        </Sphere>
        
        {/* Nom du modèle */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {model.name}
        </Text>
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
            <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
              <Suspense fallback={null}>
                {/* Éclairage */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                {/* Environnement */}
                <Environment preset="forest" />
                
                {/* Modèles 3D */}
                <ModelPlaceholder modelIndex={0} position={[-4, 0, 0]} />
                <ModelPlaceholder modelIndex={1} position={[0, 0, 0]} />
                <ModelPlaceholder modelIndex={2} position={[4, 0, 0]} />
                
                {/* Ombres */}
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.4}
                  scale={20}
                  blur={2}
                  far={4}
                  color="#000000"
                />
                
                {/* Contrôles */}
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
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
