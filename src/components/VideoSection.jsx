import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

// Import des previews d'images pour les thumbnails
import campfirePreview from '/assets/portfolio/Annexe/campfire_preview.png';
import boxPreview from '/assets/portfolio/Annexe/box_preview.png';
import cyclingPreview from '/assets/portfolio/Annexe/cyclingPreview.png';
import carPreview from '/assets/portfolio/Annexe/CarAnimPreview.png';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Vidéos représentant le travail d'Emmanuel
  const videos = [
    {
      id: 1,
      title: 'Animation Feu de Camp - Environnement 3D',
      description: 'Animation d\'un feu de camp réalisée dans le cadre de projets éducatifs sur l\'environnement',
      thumbnail: campfirePreview,
      videoSrc: '/assets/portfolio/Annexe/CampfireVideo.mp4',
      duration: '0:45',
    },
    {
      id: 2,
      title: 'Modélisation 3D - Boîte Interactive',
      description: 'Conception et animation d\'une boîte 3D avec interactions dynamiques',
      thumbnail: boxPreview,
      videoSrc: '/assets/portfolio/Annexe/boxe.mp4',
      duration: '1:20',
    },
    {
      id: 3,
      title: 'Animation Cyclisme - Mouvement Réaliste',
      description: 'Animation de personnage en cyclisme avec attention aux détails de mouvement',
      thumbnail: cyclingPreview,
      videoSrc: '/assets/portfolio/Annexe/cycling.mp4',
      duration: '2:10',
    },
    {
      id: 4,
      title: 'Animation Véhicule - Séquence Dynamique',
      description: 'Animation de véhicule avec effets visuels et mouvements fluides',
      thumbnail: carPreview,
      videoSrc: '/assets/portfolio/Annexe/car_animation_0000.mp4',
      duration: '1:30',
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Erreur lors de la lecture de la vidéo:', error);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoChange = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="vidéo" className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mes <span className="text-forest-green-400">Réalisations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes projets d'animation 3D et de modélisation, 
            des plans de mobilier aux animations éducatives sur l'environnement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lecteur vidéo principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative bg-slate-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Lecteur vidéo avec vraie vidéo */}
              <div className="aspect-video bg-gradient-to-br from-volcanic-orange-900 to-forest-green-900 flex items-center justify-center relative overflow-hidden">
                {/* Image de preview affichée quand la vidéo n'est pas en cours de lecture */}
                {!isPlaying && (
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                <video
                  ref={videoRef}
                  src={selectedVideo.videoSrc}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                  muted={isMuted}
                  controls={false}
                  preload="metadata"
                  playsInline
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className={`relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </motion.button>
                
                {/* Overlay avec titre */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>

              {/* Contrôles vidéo */}
              <div className="bg-slate-800 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-volcanic-orange-400 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-volcanic-orange-400 transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <span className="text-gray-400 text-sm">{selectedVideo.duration}</span>
                </div>
                <button className="text-white hover:text-volcanic-orange-400 transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Liste des vidéos */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Autres Vidéos</h3>
            {videos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleVideoChange(video)}
                className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedVideo.id === video.id
                    ? 'ring-2 ring-volcanic-orange-500 bg-slate-700'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <Play size={24} className="text-white/70" />
                  </div>
                  <div className="absolute inset-0 bg-black/20" />
                  <Play size={24} className="text-white/90 relative z-10" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Heures de modélisation', value: '500+' },
            { label: 'Projets terminés', value: '15+' },
            { label: 'Logiciels maîtrisés', value: '3' },
            { label: 'Années d\'expérience', value: '4' },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-slate-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-forest-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
