import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

// 1. IMPORT YOUR RESUME HERE
import resumePDF from '../assets/resume/myresume.pdf';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const progressBarRef = useRef(null);

  // The Master Navigation Map
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Arsenal', id: 'skills' },
    { name: 'Expertise', id: 'capabilities' },
    { name: 'Logic', id: 'sandbox' },
    { name: 'Works', id: 'projects' },
    { name: 'Contact', id: 'contact' } 
  ];

  const addToLinks = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Top Progress Bar Tracking
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, { scaleX: scroll, duration: 0.1, transformOrigin: "left" });
      }

      // Active Section Scroll Spy
      const sections = ['home', 'about', 'skills', 'capabilities', 'sandbox', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- THE FIX: GSAP Mobile Menu Animation ---
  useEffect(() => {
    // We set initial state so autoAlpha works correctly
    if (!menuRef.current.style.visibility) {
        gsap.set(menuRef.current, { autoAlpha: 0, y: "-100%" });
    }

    if (isOpen) {
      // autoAlpha handles both opacity and visibility simultaneously
      gsap.to(menuRef.current, { y: "0%", autoAlpha: 1, duration: 0.8, ease: "expo.inOut" });
      gsap.fromTo(linksRef.current,
        { y: 80, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 0.8, ease: "expo.out", delay: 0.3 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      // This ensures the menu becomes completely invisible and cannot bleed into the screen
      gsap.to(menuRef.current, { y: "-100%", autoAlpha: 0, duration: 0.8, ease: "expo.inOut" });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Smooth Scroll Override
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[110]">
        <div ref={progressBarRef} className="h-full bg-golden w-full scale-x-0"></div>
      </div>

      <header className={`fixed top-[3px] left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#01140d]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
          
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="relative z-[110] text-2xl md:text-3xl font-black tracking-tighter text-white uppercase group">
            HW<span className="text-golden">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-[10px] xl:text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative ${activeSection === item.id ? 'text-golden' : 'text-gray-400 hover:text-white'}`}
              >
                {activeSection === item.id && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-golden rounded-full"></span>
                )}
                {item.name}
              </a>
            ))}
            
            <a 
              href={resumePDF} 
              download="Harsh_Wardhan_CV.pdf" 
              className="ml-4 px-5 py-2.5 bg-white text-[#01140d] hover:bg-golden font-bold text-[10px] uppercase tracking-[0.2em] transition-colors"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-[110] w-12 h-12 flex flex-col items-end justify-center gap-[6px] focus:outline-none">
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-[8px] bg-golden' : 'w-8'}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-6'}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-[8px] bg-golden' : 'w-4'}`}></span>
          </button>
        </div>
      </header>

      {/* --- THE FIX: Mobile Curtain Dropdown --- */}
      {/* Removed justify-center, added pt-32 pb-12 and overflow-y-auto to handle short screens safely */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 z-[90] bg-[#01140d] flex flex-col px-8 pt-32 pb-12 transform -translate-y-full opacity-0 invisible overflow-y-auto custom-scrollbar"
      >
        <div className="flex flex-col gap-4">
          <p className="text-golden font-mono text-[10px] uppercase tracking-[0.4em] mb-4 border-b border-white/10 pb-4">// System Navigation</p>
          {navItems.map((item, index) => (
            <div key={index} className="overflow-hidden flex-shrink-0">
              <a 
                ref={addToLinks}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block text-5xl md:text-7xl font-black uppercase tracking-tighter transition-colors ${activeSection === item.id ? 'text-golden' : 'text-white'}`}
                style={{ WebkitTextStroke: activeSection === item.id ? 'none' : '1px rgba(255,255,255,0.1)', color: activeSection === item.id ? '#FEC700' : 'transparent' }}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-auto border-t border-white/10 pt-8 flex justify-between items-center text-gray-500 flex-shrink-0">
          <div className="flex gap-6 text-xl">
            <a href="https://github.com/harshwardhan1709" target="_blank" rel="noreferrer" className="hover:text-golden transition-colors"><FiGithub /></a>
            <a href="https://www.linkedin.com/in/harsh-wardhan-b905a5386" target="_blank" rel="noreferrer" className="hover:text-golden transition-colors"><FiLinkedin /></a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest">Bengaluru, IN</p>
        </div>
      </div>
    </>
  );
}