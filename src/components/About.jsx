import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Code, User } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

// Variantes d'animation optimisées - durées courtes et fluides
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const About = () => {
  return (
    <section id="apropos" className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            À <span className="text-forest-green-400">Propos</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Découvrez mon parcours et mes compétences en animation 3D et synthèse d'image
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Profile Info - Colonne gauche optimisée */}
          <div className="space-y-8">
            {/* Personal Info */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-volcanic-orange-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="/assets/new_assets/PhotoEmanuel.jpeg" 
                    alt="Emmanuel"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{portfolioData.personal.name}</h3>
                  <p className="text-volcanic-orange-400 font-medium">{portfolioData.personal.title}</p>
                  <p className="text-gray-400 text-sm">{portfolioData.personal.specialty}</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-volcanic-orange-400" />
                  <span className="text-sm">{portfolioData.personal.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-volcanic-orange-400">📞</span>
                  <span className="text-sm">{portfolioData.personal.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-volcanic-orange-400">✉️</span>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-sm hover:text-volcanic-orange-400 transition-colors">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Compétences */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-forest-green-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Code size={24} className="text-forest-green-400" />
                <span>Compétences</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Logiciels 3D</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.software.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-volcanic-orange-500/20 text-volcanic-orange-400 text-sm rounded-full border border-volcanic-orange-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Compétences relationnelles</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.soft.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-forest-green-500/20 text-forest-green-400 text-sm rounded-full border border-forest-green-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Qualités personnelles simplifiées */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <User size={24} className="text-blue-400" />
                <span>Qualités personnelles</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {portfolioData.qualities.map((quality, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{quality}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Formation et Expérience - Colonne droite optimisée */}
          <div className="space-y-8">
            {/* Formation */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-forest-green-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Award size={24} className="text-forest-green-400" />
                <span>Formation</span>
              </h3>
              
              <div className="space-y-6">
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-forest-green-500/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-forest-green-500 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-forest-green-400 text-sm font-medium">
                        <Calendar size={14} />
                        <span>{edu.years}</span>
                      </div>
                      <h4 className="text-white font-semibold">{edu.program}</h4>
                      <p className="text-gray-400 text-sm">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-gray-500 text-xs flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{edu.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certification */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Award size={24} className="text-yellow-400" />
                <span>Certification</span>
              </h3>
              
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="/assets/new_assets/Certification SonyPicture Animation.jpeg" 
                    alt="Certification Sony Pictures Animation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sony Pictures Animation</h4>
                  <p className="text-yellow-400 text-sm font-medium">Certification en Animation 3D</p>
                  <p className="text-gray-400 text-sm">Formation professionnelle en techniques d'animation avancées</p>
                </div>
              </div>
            </motion.div>

            {/* Expérience professionnelle */}
            <motion.div 
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-volcanic-orange-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <span className="text-volcanic-orange-400">💼</span>
                <span>Expérience professionnelle</span>
              </h3>
              
              <div className="space-y-6">
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-volcanic-orange-500/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-volcanic-orange-500 rounded-full"></div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-volcanic-orange-400 text-sm font-medium">
                        <Calendar size={14} />
                        <span>{exp.years}</span>
                      </div>
                      <h4 className="text-white font-semibold">{exp.organization}</h4>
                      <p className="text-gray-400 text-sm flex items-center space-x-1">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </p>
                      <ul className="space-y-2 mt-3">
                        {exp.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                            <span className="text-volcanic-orange-400 mt-1">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Statistiques simplifiées */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-volcanic-orange-500/20 to-forest-green-500/20 rounded-xl p-6 text-center border border-volcanic-orange-500/30">
                <div className="text-2xl font-bold text-volcanic-orange-400 mb-2">
                  {portfolioData.stats.projectsCompleted}
                </div>
                <div className="text-gray-400 text-sm">Projets réalisés</div>
              </div>
              <div className="bg-gradient-to-br from-forest-green-500/20 to-blue-500/20 rounded-xl p-6 text-center border border-forest-green-500/30">
                <div className="text-2xl font-bold text-forest-green-400 mb-2">
                  {portfolioData.stats.yearsExperience}
                </div>
                <div className="text-gray-400 text-sm">Années d'expérience</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
