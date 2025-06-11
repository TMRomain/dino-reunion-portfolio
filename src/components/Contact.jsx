import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Instagram, Linkedin } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      alert('Message envoyé avec succès !');
    }, 2000);
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-slate-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Travaillons <span className="text-volcanic-orange-400">Ensemble</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Vous avez un projet en tête ? Discutons de vos idées et donnons-leur vie 
            dans l'univers fascinant de la 3D.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-volcanic-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-volcanic-orange-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-volcanic-orange-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-volcanic-orange-500 transition-colors"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-volcanic-orange-500 transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-volcanic-orange-500 hover:bg-volcanic-orange-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Informations */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-forest-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-volcanic-orange-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-volcanic-orange-400" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-gray-400 hover:text-volcanic-orange-400 transition-colors">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-forest-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="text-forest-green-400" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Téléphone</div>
                    <a href={`tel:${portfolioData.personal.phone}`} className="text-gray-400 hover:text-forest-green-400 transition-colors">
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium">Localisation</div>
                    <div className="text-gray-400 text-sm">{portfolioData.personal.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-volcanic-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Suivez-moi</h3>
              
              <div className="flex space-x-4">
                {[
                  { icon: Github, label: 'GitHub', color: 'hover:text-gray-400' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
                ].map(({ icon: Icon, label, color }) => (
                  <motion.a
                    key={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className={`w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${color}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="bg-gradient-to-r from-forest-green-500/20 to-volcanic-orange-500/20 rounded-xl p-6 border border-forest-green-500/30">
              <h4 className="text-lg font-bold text-white mb-2">🟢 Disponible pour de nouveaux projets</h4>
              <p className="text-gray-300 text-sm">
                Actuellement disponible pour des missions freelance 
                en modélisation 3D, animation et rendu depuis La Réunion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
