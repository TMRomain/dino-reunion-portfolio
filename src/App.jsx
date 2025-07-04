import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery3D from './components/Gallery3D';
import VideoSection from './components/VideoSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden w-full max-w-full">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Gallery3D />
        <VideoSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
