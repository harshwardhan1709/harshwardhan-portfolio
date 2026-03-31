import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi';

// 1. IMPORT YOUR RESUME HERE
import resumePDF from '../assets/resume/myresume.pdf';

export default function Hero() {
  const heroRef = useRef(null);
  const titleLines = useRef([]);
  const textRefs = useRef([]);
  const lineRef = useRef(null);
  const bottomMetaRef = useRef(null);

  // Helper to add elements to arrays for staggered animations
  const addToTitle = (el) => { if (el && !titleLines.current.includes(el)) titleLines.current.push(el); };
  const addToText = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };

  useEffect(() => {
    // A clean, disciplined animation timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Reveal massive title lines from behind their overflow-hidden masks
    tl.fromTo(titleLines.current,
      { y: 150, skewY: 5 },
      { y: 0, skewY: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // 2. Expand the golden divider line
    tl.fromTo(lineRef.current,
      { width: "0%" },
      { width: "100%", duration: 1.5, ease: "expo.inOut" },
      "-=0.8"
    );

    // 3. Fade and slide up the bio and buttons
    tl.fromTo(textRefs.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=1"
    );

    // 4. Fade in bottom meta details
    tl.fromTo(bottomMetaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-forest flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 md:pt-40 pb-12 selection:bg-golden selection:text-forest">
      
      {/* Background Grid - Minimal and subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

      <div className="container mx-auto max-w-7xl relative z-10 flex-grow flex flex-col justify-center">
        
        {/* --- TOP ROW: Introduction --- */}
        <div className="flex flex-col mb-6 md:mb-8 overflow-hidden">
          <p ref={addToText} className="text-golden font-mono text-xs md:text-sm lg:text-base uppercase tracking-[0.3em] mb-4">
            // System Initialized
          </p>
          
          {/* Masked Title Lines - Optimized Scaling */}
          <div className="overflow-hidden pb-1 md:pb-2 lg:pb-4">
            <h1 ref={addToTitle} className="text-[16vw] md:text-[12vw] lg:text-[10rem] xl:text-[11rem] font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter uppercase">
              Harsh
            </h1>
          </div>
          <div className="overflow-hidden pb-1 md:pb-2 lg:pb-4">
            <h1 ref={addToTitle} className="text-[16vw] md:text-[12vw] lg:text-[10rem] xl:text-[11rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase" style={{ color: 'transparent', WebkitTextStroke: '2px #FEC700' }}>
              Wardhan<span className="text-golden">.</span>
            </h1>
          </div>
        </div>

        {/* Expanding Divider Line */}
        <div className="w-full h-[1px] bg-gray-800 my-6 md:my-8 relative">
          <div ref={lineRef} className="absolute top-0 left-0 h-full bg-golden w-0"></div>
        </div>

        {/* --- BOTTOM ROW: Bio & Actions --- */}
        {/* Upgraded from purely 1-col/12-col to a smooth 1-col -> 2-col -> 12-col progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Role */}
          <div className="md:col-span-1 lg:col-span-4 overflow-hidden">
            <h2 ref={addToText} className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide uppercase leading-tight">
              FullStack <br />
              <span className="font-bold text-golden">Developer</span>
            </h2>
          </div>

          {/* Middle: Bio */}
          <div className="md:col-span-1 lg:col-span-5 overflow-hidden">
            <p ref={addToText} className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed font-light">
              Architecting robust digital environments. From developing secure digital banking suites to modern web platforms like fitx-pro, I bridge the gap between heavy-duty Java backends and seamless React frontends.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-start lg:items-end gap-6 overflow-hidden md:mt-4 lg:mt-0">
            <a 
              ref={addToText}
              href={resumePDF} 
              download="Harsh_Wardhan_CV.pdf"
              className="group relative inline-flex items-center gap-4 border border-golden text-golden py-3 px-6 md:py-4 md:px-8 uppercase tracking-widest font-bold text-xs md:text-sm overflow-hidden transition-colors hover:text-forest"
            >
              <span className="absolute inset-0 bg-golden translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
              <span className="relative z-10 flex items-center gap-2">
                Download CV <FiArrowDownRight className="text-lg group-hover:rotate-[-45deg] transition-transform duration-300" />
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* --- BOTTOM META DETAILS --- */}
      <div ref={bottomMetaRef} className="container mx-auto max-w-7xl mt-auto pt-10 md:pt-12 flex justify-between items-end border-t border-white/10 text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest relative z-10">
        <div className="flex gap-6 md:gap-8">
          <a href="https://github.com/harshwardhan1709" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-golden transition-colors"><FiGithub className="text-sm md:text-base" /> Github</a>
          <a href="https://www.linkedin.com/in/harsh-wardhan-b905a5386" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-golden transition-colors"><FiLinkedin className="text-sm md:text-base" /> LinkedIn</a>
        </div>
        <div className="hidden sm:block">
          Based in Bengaluru, IN
        </div>
      </div>

    </section>
  );
}