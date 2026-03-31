import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// --- GLOBAL UI OVERLAYS ---
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import TerminalOverlay from './components/TerminalOverlay';
import Navbar from './components/Navbar';

// --- PAGE COMPONENTS ---
import Hero from './components/Hero';
import About from './components/About';
import AboutSkills from './components/AboutSkills';
import Capabilities from './components/Capabilities';
import Sandbox from './components/Sandbox';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  // If you are using a custom GSAP cursor, it's best to apply the 'cursor-none' 
  // class to the main wrapper below rather than directly manipulating the document body, 
  // but keeping this fallback is completely fine.
  useEffect(() => {
    if (!loading) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto'; // Reset if loading is toggled
    }
  }, [loading]);

  return (
    <Router>
      {/* Global Toast Notification System */}
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: '#011c12',
            color: '#fff',
            border: '1px solid #FEC700',
            borderRadius: '0px',
            fontFamily: 'monospace'
          },
        }}
      />

      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        /* Added 'cursor-none' here as a Tailwind fallback for hiding the default cursor */
        <div className="relative min-h-screen bg-forest text-white selection:bg-golden selection:text-forest overflow-x-hidden cursor-none">
          
          {/* Always-on Global Tools */}
          <CustomCursor />
          <TerminalOverlay />
          <Navbar />
          
          {/* Main Content Flow - Single Page App Structure */}
          <Routes>
            <Route path="/" element={
              <main className="w-full flex flex-col">
                <section id="home"><Hero /></section>
                <section id="about"><About /></section>
                <section id="skills"><AboutSkills /></section>
                <section id="capabilities"><Capabilities /></section>
                <section id="sandbox"><Sandbox /></section>
                <section id="projects"><Projects /></section>
              </main>
            } />
          </Routes>

          {/* Footer handles bottom meta and contact links */}
          <Footer />
          
        </div>
      )}
    </Router>
  );
}