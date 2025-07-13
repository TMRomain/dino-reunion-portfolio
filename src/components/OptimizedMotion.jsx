import { motion } from 'framer-motion';
import { useOptimizedIntersection } from '../utils/optimizedHooks';

// Variantes d'animation ultra-rapides
const fastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05
    }
  }
};

/**
 * Composant d'animation optimisé qui utilise l'intersection observer
 * pour ne déclencher les animations que quand nécessaire
 */
export const OptimizedMotionDiv = ({ 
  children, 
  className = "", 
  delay = 0,
  variants = fastVariants,
  ...props 
}) => {
  const [ref, isVisible, hasBeenVisible] = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  // Si l'élément a déjà été visible, on garde l'état final pour éviter les re-animations
  const animationState = hasBeenVisible ? "visible" : (isVisible ? "visible" : "hidden");

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={animationState}
      variants={variants}
      transition={{ ...variants.visible.transition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Conteneur pour les animations staggerées optimisées
 */
export const OptimizedStaggerContainer = ({ children, className = "", ...props }) => {
  const [ref, isVisible, hasBeenVisible] = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: '-30px'
  });

  const animationState = hasBeenVisible ? "visible" : (isVisible ? "visible" : "hidden");

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={animationState}
      variants={staggerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Hook pour des animations simples sans framer-motion
 * Utilise des transitions CSS natives pour de meilleures performances
 */
export const useSimpleAnimation = (triggerCondition = true) => {
  const [ref, isVisible] = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: '-30px'
  });

  const shouldAnimate = triggerCondition && isVisible;

  return {
    ref,
    style: {
      opacity: shouldAnimate ? 1 : 0,
      transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
    },
    className: shouldAnimate ? 'fast-fade-in' : ''
  };
};

export default { OptimizedMotionDiv, OptimizedStaggerContainer, useSimpleAnimation };
