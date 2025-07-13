import { useEffect, useRef, useState } from 'react';

/**
 * Hook d'Intersection Observer optimisé pour de meilleures performances
 * @param {Object} options - Options pour l'Intersection Observer
 * @returns {Array} - [ref, isVisible]
 */
export const useOptimizedIntersection = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Options optimisées par défaut
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px',
      ...options
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        // Une fois visible, on peut éviter de re-animer
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      defaultOptions
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasBeenVisible, options]);

  return [elementRef, isVisible, hasBeenVisible];
};

/**
 * Hook pour gérer le lazy loading d'images
 * @param {string} src - URL de l'image
 * @returns {Object} - { ref, isLoaded, imageSrc }
 */
export const useLazyImage = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [ref, isVisible] = useOptimizedIntersection({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isVisible && src && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isVisible, src, isLoaded]);

  return { ref, isLoaded, imageSrc };
};

/**
 * Composant d'image lazy loading optimisé
 */
export const LazyImage = ({ src, alt, className, fallback, ...props }) => {
  const { ref, isLoaded, imageSrc } = useLazyImage(src);

  return (
    <div ref={ref} className={className}>
      {isLoaded ? (
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-cover transition-opacity duration-300"
          {...props}
        />
      ) : (
        fallback || (
          <div className="w-full h-full bg-gray-700/50 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
      )}
    </div>
  );
};

export default { useOptimizedIntersection, useLazyImage, LazyImage };
