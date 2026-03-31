import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTrackRef = useRef(null);
  const textRefs = useRef([]);
  const brandRef = useRef(null);

  const [loadingText, setLoadingText] = useState("INITIALIZING KERNEL...");

  // Add elements to textRefs array for staggered exit
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  // Glitching text effect during load
  useEffect(() => {
    const texts = [
      "INITIALIZING KERNEL...",
      "LOADING ASSETS...",
      "ESTABLISHING DATABASE CONNECTION...",
      "COMPILING REACT COMPONENTS...",
      "SYSTEM READY."
    ];
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < texts.length) {
        setLoadingText(texts[step]);
      } else {
        clearInterval(interval);
      }
    }, 600); // Changes text every 600ms
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // The Master Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Counter ticking from 0 to 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.8,
      roundProps: "val", 
      onUpdate: () => {
        if (counterRef.current) counterRef.current.innerText = counter.val + "%";
      },
      ease: "power3.inOut"
    }, 0);

    // 2. Progress Bar fills up
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.8,
      ease: "power3.inOut"
    }, 0);

    // 3. EXIT SEQUENCE (The crucial part to prevent stuck elements)
    // First, collapse the progress bar down to a thin line, then fade it out
    tl.to(progressBarRef.current, { height: "1px", duration: 0.3, ease: "power2.inOut" }, 3.0)
      .to(progressTrackRef.current, { opacity: 0, duration: 0.3 }, 3.2);

    // Fade and slide out the massive counter and terminal text
    tl.to(textRefs.current, {
      y: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in"
    }, 3.1);

    // Pulse and fade out the brand name
    tl.to(brandRef.current, {
      scale: 1.1,
      opacity: 0,
      letterSpacing: "0.5em",
      duration: 0.6,
      ease: "expo.inOut"
    }, 3.3);

    // Finally, fade the entire preloader container to complete darkness before unmounting
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, 3.8);

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#01140d] flex flex-col items-center justify-center overflow-hidden"
    >
      
      {/* Background Architectural Grid (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="w-full max-w-4xl px-6 md:px-12 relative z-10 flex flex-col items-center justify-center h-full">
        
        {/* Top Terminal Text */}
        <div ref={addToTextRefs} className="absolute top-12 left-6 md:left-12 flex flex-col gap-1">
          <p className="text-golden font-mono text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-golden animate-pulse rounded-full"></span>
            {loadingText}
          </p>
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
            HW-OS // V.2026.1
          </p>
        </div>

        {/* Central Brand Name */}
        <div ref={brandRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none opacity-10">
          <h1 className="text-[15vw] font-black uppercase tracking-tighter text-white leading-none mix-blend-overlay">
            Harsh<br/>Wardhan
          </h1>
        </div>

        {/* Massive Dynamic Counter */}
        <div 
          ref={counterRef}
          className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-8 z-20"
          style={{ color: 'transparent', WebkitTextStroke: '2px #FEC700' }}
        >
          0%
        </div>

        {/* The Progress Bar */}
        <div 
          ref={progressTrackRef}
          className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden z-20"
        >
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full w-0 bg-golden shadow-[0_0_15px_#FEC700]"
          ></div>
        </div>

        {/* Bottom Decorative Data */}
        <div ref={addToTextRefs} className="absolute bottom-12 right-6 md:right-12 text-right">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Target: 100%
          </p>
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mt-1">
            Unlocking Portfolio...
          </p>
        </div>

      </div>
    </div>
  );
}