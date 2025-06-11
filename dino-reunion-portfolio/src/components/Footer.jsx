import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-volcanic-orange-500 to-forest-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-white font-bold text-xl">{portfolioData.personal.name}</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              {portfolioData.personal.title} spécialisé en {portfolioData.personal.specialty}. 
              Créations depuis l'île de La Réunion.
            </p>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Navigation</h3>
            <ul className="space-y-2">
              {['Accueil', 'À propos', 'Galerie', 'Vidéo', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const sectionId = item === 'À propos' ? 'apropos' : item.toLowerCase();
                      const element = document.getElementById(sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-volcanic-orange-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Informations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin size={16} />
                <span>Saint-Louis, La Réunion</span>
              </div>
              <p className="text-gray-400 text-sm">
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-volcanic-orange-400 transition-colors">
                  {portfolioData.personal.email}
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center space-x-1">
              <span>© {currentYear} {portfolioData.personal.name}. Fait avec</span>
              <Heart size={16} className="text-red-500 mx-1" />
              <span>à La Réunion</span>
            </p>
            
            <div className="flex space-x-6 text-gray-400 text-sm">
              <button className="hover:text-volcanic-orange-400 transition-colors duration-200">
                Mentions légales
              </button>
              <button className="hover:text-volcanic-orange-400 transition-colors duration-200">
                Politique de confidentialité
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
