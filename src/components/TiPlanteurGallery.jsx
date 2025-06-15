import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

// Import des images
import image1 from '/assets/images/1.png';
import image4 from '/assets/images/4.png';
import imageUntitled1 from '/assets/images/untitled1.png';
import imageUntitled2 from '/assets/images/untitled2.png';
import imageVf2 from '/assets/images/vf2.png';
import imageVf21 from '/assets/images/vf2.1.png';

const TiPlanteurGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images du projet Ti Planteur disponibles
  const images = [
    {
      src: image1,
      title: 'Mobilier 3D - Design 1',
      description: 'Conception de mobilier en 3D pour l\'Association Ti Planteur'
    },
    {
      src: image4,
      title: 'Mobilier 3D - Design 4',
      description: 'Modélisation détaillée d\'éléments de mobilier'
    },
    {
      src: imageUntitled1,
      title: 'Concept Design 1',
      description: 'Esquisse et développement conceptuel'
    },
    {
      src: imageUntitled2,
      title: 'Concept Design 2',
      description: 'Évolution du design et finalisation'
    },
    {
      src: imageVf2,
      title: 'Version Finale v2',
      description: 'Version finale du projet de mobilier'
    },
    {
      src: imageVf21,
      title: 'Version Finale v2.1',
      description: 'Amélioration et peaufinage de la version finale'
    }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % images.length
      : (currentImageIndex - 1 + images.length) % images.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <section id="ti-planteur" className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Projet <span className="text-forest-green-400">Ti Planteur</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez les créations de mobilier 3D réalisées pour l'Association Ti Planteur à La Réunion. 
            Des conceptions innovantes alliant fonctionnalité et esthétique pour promouvoir la biodiversité locale.
          </p>
          
          {/* Badge du projet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-forest-green-500/20 border border-forest-green-400/30 rounded-full px-6 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-forest-green-400 rounded-full animate-pulse"></div>
            <span className="text-forest-green-400 font-medium">Mobilier 3D • Association Ti Planteur</span>
          </motion.div>
        </motion.div>

        {/* Galerie d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <div className="relative bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-forest-green-500/20">
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Erreur de chargement pour:', image.src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback si l'image ne charge pas */}
                  <div className="hidden w-full h-full items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Maximize2 size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">{image.title}</p>
                      <p className="text-xs mt-1 text-gray-500">Image non disponible</p>
                    </div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Maximize2 size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informations sur le projet */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-forest-green-500/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                À propos du projet Ti Planteur
              </h3>
              <p className="text-gray-300 mb-6">
                En collaboration avec l'Association Ti Planteur, j'ai conçu une série de mobilier 3D 
                destiné à promouvoir la biodiversité réunionnaise. Ces créations allient design moderne 
                et fonctionnalité pratique pour les espaces éducatifs et les ateliers sur l'environnement.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-forest-green-400 rounded-full"></div>
                  <span className="text-gray-300">Conception de plans 3D de mobilier</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-forest-green-400 rounded-full"></div>
                  <span className="text-gray-300">Animation d'ateliers éducatifs sur la biodiversité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-forest-green-400 rounded-full"></div>
                  <span className="text-gray-300">Sensibilisation à l'environnement réunionnais</span>
                </div>
              </div>
            </div>
            
            {/* Statistiques du projet */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-slate-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-forest-green-400 mb-2">{images.length}</div>
                <div className="text-gray-400 text-sm">Designs créés</div>
              </div>
              <div className="text-center bg-slate-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-volcanic-orange-400 mb-2">2022-2023</div>
                <div className="text-gray-400 text-sm">Période</div>
              </div>
              <div className="text-center bg-slate-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-2">3D</div>
                <div className="text-gray-400 text-sm">Modélisation</div>
              </div>
              <div className="text-center bg-slate-700/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400 mb-2">Blender</div>
                <div className="text-gray-400 text-sm">Logiciel</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Controls */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-xl mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
                <div className="mt-2 text-gray-400 text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TiPlanteurGallery;
