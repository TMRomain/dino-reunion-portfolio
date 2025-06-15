import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Text, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { useWebGL } from '../utils/webgl';

// Composant de démonstration pour montrer un exemple de modèle 3D plus élaboré
const EnhancedDinoModel = ({ position = [0, 0, 0], modelType = 'trex' }) => {
  const [hovered, setHovered] = useState(false);
  
  // Couleurs selon le type de dinosaure
  const colors = {
    trex: '#8b5a3c',
    tricera: '#4a7c59',
    brachio: '#6b7280',
  };

  return (
    <group position={position}>
      {/* Corps principal avec effet hover */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
        castShadow
      >
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial 
          color={colors[modelType]} 
          roughness={0.3} 
          metalness={0.1}
          emissive={hovered ? '#333' : '#000'}
        />
      </mesh>
      
      {/* Yeux lumineux */}
      <mesh position={[-0.3, 1.2, 0.6]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff0000" 
          emissiveIntensity={hovered ? 0.8 : 0.3} 
        />
      </mesh>
      <mesh position={[0.3, 1.2, 0.6]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#ff4444" 
          emissive="#ff0000" 
          emissiveIntensity={hovered ? 0.8 : 0.3} 
        />
      </mesh>
      
      {/* Nom flottant */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {modelType.toUpperCase()}
      </Text>
    </group>
  );
};

// Page de démonstration des modèles
const ModelShowcase = () => {
  const { isSupported, isLoading } = useWebGL();

  // Approche optimiste : n'afficher le fallback que si WebGL est vraiment indisponible
  const shouldShowFallback = !isLoading && isSupported === false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement des modèles 3D...</p>
        </div>
      </div>
    );
  }

  if (shouldShowFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-volcanic-orange-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-volcanic-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Démo des Modèles <span className="text-volcanic-orange-400">3D</span>
          </h1>
          <p className="text-gray-300 mb-6">
            Cette section nécessite WebGL pour afficher les modèles 3D interactifs.
          </p>
          <div className="bg-slate-800 rounded-xl p-6 text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Solutions :</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Mettez à jour votre navigateur vers la dernière version</li>
              <li>• Activez l'accélération matérielle dans les paramètres</li>
              <li>• Redémarrez votre navigateur</li>
              <li>• Vérifiez que votre carte graphique supporte WebGL</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Démo des Modèles <span className="text-volcanic-orange-400">3D</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* T-Rex */}
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="h-64 canvas-container">
              <WebGLErrorBoundary>
                <Canvas 
                  camera={{ position: [3, 3, 3], fov: 50 }}
                  gl={{ alpha: true, premultipliedAlpha: false }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Environment preset="sunset" />
                    
                    <EnhancedDinoModel position={[0, -1, 0]} modelType="trex" />
                    
                    <ContactShadows
                      position={[0, -2, 0]}
                      opacity={0.4}
                      scale={5}
                      blur={2}
                      far={4}
                    />
                  
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Suspense>
              </Canvas>
            </WebGLErrorBoundary>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">T-Rex</h3>
              <p className="text-gray-400 text-sm">Le roi des prédateurs au Piton de la Fournaise</p>
            </div>
          </div>

          {/* Tricératops */}
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="h-64 canvas-container">
              <WebGLErrorBoundary>
                <Canvas 
                  camera={{ position: [3, 3, 3], fov: 50 }}
                  gl={{ alpha: true, premultipliedAlpha: false }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Environment preset="forest" />
                    
                    <EnhancedDinoModel position={[0, -1, 0]} modelType="tricera" />
                    
                    <ContactShadows
                      position={[0, -2, 0]}
                      opacity={0.4}
                      scale={5}
                      blur={2}
                      far={4}
                    />
                    
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      enableRotate={true}
                      autoRotate
                      autoRotateSpeed={-0.5}
                    />
                  </Suspense>
                </Canvas>
              </WebGLErrorBoundary>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">Tricératops</h3>
              <p className="text-gray-400 text-sm">Herbivore paisible dans les Hauts de l'île</p>
            </div>
          </div>

          {/* Brachiosaure */}
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="h-64 canvas-container">
              <WebGLErrorBoundary>
                <Canvas 
                  camera={{ position: [3, 3, 3], fov: 50 }}
                  gl={{ alpha: true, premultipliedAlpha: false }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Environment preset="dawn" />
                    
                    <EnhancedDinoModel position={[0, -1, 0]} modelType="brachio" />
                    
                    <ContactShadows
                      position={[0, -2, 0]}
                      opacity={0.4}
                      scale={5}
                      blur={2}
                      far={4}
                    />
                    
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      enableRotate={true}
                      autoRotate
                      autoRotateSpeed={0.8}
                    />
                  </Suspense>
                </Canvas>
              </WebGLErrorBoundary>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">Brachiosaure</h3>
              <p className="text-gray-400 text-sm">Géant aux cou long parcourant les cirques</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            💡 Survole les modèles pour les voir s'animer !
          </p>
          <p className="text-gray-500 text-sm">
            Ces modèles sont des placeholders. Remplacez-les par vos créations Blender !
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModelShowcase;
