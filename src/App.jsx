import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy loading des composants non critiques
const About = lazy(() => import('./components/About'));
const Gallery3D = lazy(() => import('./components/Gallery3D'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Composant de loading simple et rapide
const QuickLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-volcanic-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden w-full max-w-full">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <Suspense fallback={<QuickLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<QuickLoader />}>
          <Gallery3D />
        </Suspense>
        <Suspense fallback={<QuickLoader />}>
          <VideoSection />
        </Suspense>
        <Suspense fallback={<QuickLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<QuickLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
