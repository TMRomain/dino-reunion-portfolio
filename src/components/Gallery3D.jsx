import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const Gallery3D = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Collection de toutes les images du portfolio organisées par catégories
  const portfolioImages = {
    robot: [
      {
        src: '/assets/portfolio/render1_robot.png',
        title: 'Rendu Robot 3D',
        description: 'Modélisation et rendu 3D d\'un robot',
        category: 'robot'
      },
      {
        src: '/assets/portfolio/untitled.png',
        title: 'Projet Robot',
        description: 'Étude conceptuelle de robot',
        category: 'robot'
      }
    ],
    annexe: [
      {
        src: '/assets/portfolio/Annexe/CarAnimPreview.png',
        title: 'Animation Véhicule',
        description: 'Preview de l\'animation de voiture 3D',
        category: 'annexe'
      },
      {
        src: '/assets/portfolio/Annexe/box_preview.png',
        title: 'Boîte Interactive',
        description: 'Modélisation 3D d\'une boîte interactive',
        category: 'annexe'
      },
      {
        src: '/assets/portfolio/Annexe/campfire_preview.png',
        title: 'Feu de Camp',
        description: 'Environnement 3D avec feu de camp',
        category: 'annexe'
      },
      {
        src: '/assets/portfolio/Annexe/cyclingPreview.png',
        title: 'Animation Cyclisme',
        description: 'Animation de personnage en cyclisme',
        category: 'annexe'
      },
      {
        src: '/assets/portfolio/Annexe/envi.png',
        title: 'Environnement',
        description: 'Création d\'environnement 3D',
        category: 'annexe'
      }
    ],
    creature: [
      {
        src: '/assets/portfolio/Creature/final.png',
        title: 'Créature Finale',
        description: 'Rendu final d\'une créature 3D',
        category: 'creature'
      },
      {
        src: '/assets/portfolio/Creature/untitled3.png',
        title: 'Concept Créature 1',
        description: 'Étude conceptuelle de créature',
        category: 'creature'
      },
      {
        src: '/assets/portfolio/Creature/untitled6.png',
        title: 'Concept Créature 2',
        description: 'Variation de design de créature',
        category: 'creature'
      }
    ],
    tiplanteur: [
      {
        src: '/assets/images/vf2.png',
        title: 'Mobilier Ti Planteur V2',
        description: 'Plans 3D de mobilier pour l\'Association Ti Planteur',
        category: 'tiplanteur'
      },
      {
        src: '/assets/images/vf2.1.png',
        title: 'Mobilier Ti Planteur V2.1',
        description: 'Version améliorée des plans de mobilier',
        category: 'tiplanteur'
      },
      {
        src: '/assets/images/untitled1.png',
        title: 'Concept Initial',
        description: 'Première ébauche des concepts de mobilier',
        category: 'tiplanteur'
      },
      {
        src: '/assets/images/untitled2.png',
        title: 'Étude Conceptuelle',
        description: 'Développement des idées de design',
        category: 'tiplanteur'
      },
      {
        src: '/assets/images/1.png',
        title: 'Design Final 1',
        description: 'Finalisation du premier design de mobilier',
        category: 'tiplanteur'
      },
      {
        src: '/assets/images/4.png',
        title: 'Design Final 4',
        description: 'Quatrième variation du design de mobilier',
        category: 'tiplanteur'
      }
    ]
  };

  // Aplatir toutes les images pour la vue "all"
  const allImages = Object.values(portfolioImages).flat();

  // Filtrer les images selon la catégorie sélectionnée
  const getFilteredImages = () => {
    if (selectedCategory === 'all') return allImages;
    return portfolioImages[selectedCategory] || [];
  };

  const categories = [
    { id: 'all', name: 'Tout', count: allImages.length },
    { id: 'robot', name: 'Robots', count: portfolioImages.robot.length },
    { id: 'annexe', name: 'Animations', count: portfolioImages.annexe.length },
    { id: 'creature', name: 'Créatures', count: portfolioImages.creature.length },
    { id: 'tiplanteur', name: 'Ti Planteur', count: portfolioImages.tiplanteur.length }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="galerie" className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio <span className="text-volcanic-orange-400">Créatif</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes créations 3D : robots, animations, créatures et environnements. 
            Chaque projet reflète ma passion pour la modélisation et l'animation 3D.
          </p>
        </motion.div>

        {/* Filtres par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-volcanic-orange-500 text-white shadow-lg shadow-volcanic-orange-500/25'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Grille d'images */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {getFilteredImages().map((image, index) => (
              <motion.div
                key={`${selectedCategory}-${image.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-volcanic-orange-500/10 transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-slate-700 items-center justify-center">
                    <span className="text-gray-400">Image non disponible</span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                        {image.title}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                    
                    {/* Bouton zoom */}
                    <button
                      onClick={() => openLightbox(image)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ZoomIn size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Informations en bas */}
                <div className="p-4">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {image.description}
                  </p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    image.category === 'robot' ? 'bg-blue-500/20 text-blue-400' :
                    image.category === 'annexe' ? 'bg-green-500/20 text-green-400' :
                    image.category === 'creature' ? 'bg-purple-500/20 text-purple-400' :
                    image.category === 'tiplanteur' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {categories.find(c => c.id === image.category)?.name || image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Message si aucune image */}
        {getFilteredImages().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">Aucune image trouvée pour cette catégorie.</p>
          </motion.div>
        )}

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Projets créés', value: allImages.length.toString() },
            { label: 'Catégories', value: (categories.length - 1).toString() },
            { label: 'Années d\'expérience', value: '4+' },
            { label: 'Logiciels maîtrisés', value: '3' },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-volcanic-orange-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh] bg-slate-800 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedImage.category === 'robot' ? 'bg-blue-500/20 text-blue-400' :
                    selectedImage.category === 'annexe' ? 'bg-green-500/20 text-green-400' :
                    selectedImage.category === 'creature' ? 'bg-purple-500/20 text-purple-400' :
                    selectedImage.category === 'tiplanteur' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {categories.find(c => c.id === selectedImage.category)?.name || selectedImage.category}
                  </span>
                </div>
              </div>
              
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery3D;
