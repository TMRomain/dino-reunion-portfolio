import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

// Import de l'image
import photoEmanuel from '../assets/images/PhotoEmanuel.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 w-full ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-volcanic-orange-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={photoEmanuel} 
                alt="Emmanuel"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">{portfolioData.personal.name}</span>
            <span className="text-white font-bold text-lg sm:hidden">Emmanuel</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 flex-shrink-0">
            {['Accueil', 'À propos', 'Galerie', 'Vidéo', 'Contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const sectionId = item === 'À propos' ? 'apropos' : item.toLowerCase();
                  scrollToSection(sectionId);
                }}
                className="text-white hover:text-volcanic-orange-400 transition-colors duration-150 font-medium whitespace-nowrap"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white flex-shrink-0 p-2 -mr-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {['Accueil', 'À propos', 'Galerie', 'Vidéo', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const sectionId = item === 'À propos' ? 'apropos' : item.toLowerCase();
                  scrollToSection(sectionId);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:text-volcanic-orange-400 transition-colors duration-150 font-medium py-2"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
