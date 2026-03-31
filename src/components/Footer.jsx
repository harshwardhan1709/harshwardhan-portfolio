import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiCopy, FiCheckCircle, FiMessageSquare, FiMail, FiTerminal } from 'react-icons/fi';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const textContainerRef = useRef(null);
  const formRef = useRef(null);
  const marqueeRef = useRef(null);
  
  const [localTime, setLocalTime] = useState('');
  const [formData, setFormData] = useState({ name: '', purpose: '', message: '' });

  // --- 1. LIVE BENGALURU SYSTEM CLOCK ---
  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Kolkata', 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(`${timeString} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. MOUSE PARALLAX (Massive Text Tracking) ---
  const handleMouseMove = (e) => {
    if (!textContainerRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 30; 
    const yPos = (clientY / window.innerHeight - 0.5) * 30;
    
    gsap.to(textContainerRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: "power3.out"
    });
  };

  // --- 3. GSAP SCROLL ANIMATIONS & MARQUEE ---
  useEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(textContainerRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }
    );

    tl.fromTo(formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  // --- 4. MAGNETIC BUTTON HOVER EFFECT ---
  const handleMagneticHover = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power3.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  // --- LOGIC HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      `[SYSTEM CONNECTION ESTABLISHED]\n\n*Client:* ${formData.name}\n*Vector:* ${formData.purpose}\n\n*Payload:*\n${formData.message}`
    );
    window.open(`https://wa.me/916299116544?text=${encodedText}`, '_blank');
    setFormData({ name: '', purpose: '', message: '' });
  };

  // --- DYNAMIC EMAIL LINK GENERATOR ---
  const dynamicMailTo = `mailto:harshwardhan987@gmail.com?subject=${encodeURIComponent(formData.purpose || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Client Name: ${formData.name}\n\nMessage:\n${formData.message}`)}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to system clipboard.`, {
      icon: <FiTerminal className="text-golden text-xl" />,
      style: { borderRadius: '0px', background: '#020d09', color: '#4af626', border: '1px solid #4af626', padding: '16px', fontFamily: 'monospace' },
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer 
      id="contact" 
      ref={footerRef} 
      onMouseMove={handleMouseMove}
      className="relative bg-[#010a07] text-white overflow-hidden border-t border-white/5"
    >
      {/* --- INFINITE SCROLLING MARQUEE --- */}
      <div className="w-full bg-golden text-[#010a07] py-3 border-b border-[#010a07] overflow-hidden whitespace-nowrap flex items-center shadow-[0_0_20px_rgba(254,199,0,0.2)] relative z-20">
        <div ref={marqueeRef} className="flex gap-10 text-xs md:text-sm font-black uppercase tracking-[0.3em]">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              AVAILABLE FOR HIRE <span className="w-2 h-2 rounded-full bg-[#010a07]"></span> OPEN TO RELOCATION <span className="w-2 h-2 rounded-full bg-[#010a07]"></span> FULLSTACK ARCHITECTURE
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl pt-24 pb-12 px-6 md:px-12 lg:px-24 relative z-10 flex flex-col">
        
        {/* --- TOP: PARALLAX MASSIVE TEXT --- */}
        <div ref={textContainerRef} className="flex flex-col mb-24 pointer-events-none">
          <p className="text-golden font-mono text-xs uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-golden animate-pulse"></span>
            Initiate Handshake Protocol
          </p>
          <h2 className="text-[14vw] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8]">
            Let's Build
          </h2>
          <h2 className="text-[14vw] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8]" style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>
            Together<span className="text-golden">.</span>
          </h2>
        </div>

        {/* --- MIDDLE: FORM & TERMINAL INFO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-gray-800 pt-16 mb-16 relative">
          
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* LEFT: Direct Transmission Form */}
          <div ref={formRef} className="lg:col-span-7 flex flex-col relative z-10">
            <h3 className="text-xl font-mono text-white uppercase tracking-widest border-l-2 border-golden pl-4 mb-10">
              // Direct Transmission
            </h3>
            
            <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-8">
              <div className="group relative">
                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 outline-none focus:border-golden transition-colors font-mono text-sm peer" placeholder=" " />
                <label className="absolute left-0 top-3 text-gray-500 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-golden peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-golden">
                  [Enter Your Name]
                </label>
              </div>

              <div className="group relative">
                <input type="text" name="purpose" required value={formData.purpose} onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 outline-none focus:border-golden transition-colors font-mono text-sm peer" placeholder=" " />
                <label className="absolute left-0 top-3 text-gray-500 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-golden peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-golden">
                  [Subject / Purpose]
                </label>
              </div>

              <div className="group relative mt-2">
                <textarea name="message" required rows="3" value={formData.message} onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 outline-none focus:border-golden transition-colors font-mono text-sm resize-none peer" placeholder=" "></textarea>
                <label className="absolute left-0 top-3 text-gray-500 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-golden peer-valid:-top-6 peer-valid:text-[10px] peer-valid:text-golden">
                  [Payload / Message]
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button type="submit" onMouseMove={handleMagneticHover} onMouseLeave={handleMagneticLeave}
                  className="flex-1 flex items-center justify-center gap-3 bg-golden text-[#010a07] font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors shadow-[4px_4px_0px_#021a12]">
                  Transmit (WA) <FiArrowUpRight className="text-xl" />
                </button>
                
                {/* --- THE UPGRADED EMAIL BUTTON --- */}
                <a href={dynamicMailTo} onMouseMove={handleMagneticHover} onMouseLeave={handleMagneticLeave}
                  className="flex-1 flex items-center justify-center gap-3 border border-gray-700 text-gray-300 font-bold uppercase tracking-widest py-4 hover:border-golden hover:text-golden transition-colors">
                  Via Email <FiMail className="text-xl" />
                </a>
              </div>
            </form>
          </div>

          {/* RIGHT: Data Nodes & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:pl-12 lg:border-l border-gray-800 relative z-10">
            
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mb-2">Target Email</p>
                <button onClick={() => copyToClipboard('harshwardhan987@gmail.com', 'Email')} 
                  className="text-lg md:text-xl font-bold text-white hover:text-golden transition-colors break-all flex items-center gap-3 group">
                  harshwardhan987@gmail.com <FiCopy className="opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </button>
              </div>
              
              <div>
                <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mb-2">Target Comm-Link</p>
                <button onClick={() => copyToClipboard('+916299116544', 'Phone')} 
                  className="text-lg md:text-xl font-bold text-white hover:text-golden transition-colors flex items-center gap-3 group">
                  +91 6299 116 544 <FiCopy className="opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mb-2">Global Network</p>
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-wardhan-b905a5386' },
                { name: 'GitHub', url: 'https://github.com/harshwardhan1709' },
                { name: 'Instagram', url: 'https://www.instagram.com/harsh.wardhan17' },
                { name: 'Facebook', url: 'https://m.facebook.com/harsh.wardhan.5209/' }
              ].map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noreferrer" 
                   className="flex items-center justify-between text-sm font-mono text-gray-400 hover:text-golden border-b border-gray-800 pb-2 transition-colors group">
                  {social.name}
                  <FiArrowUpRight className="text-gray-600 group-hover:text-golden transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* --- BOTTOM: META STATUS BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest pt-8 border-t border-gray-800 gap-6 md:gap-0 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              System Online
            </span>
            <span className="hidden md:inline-block">|</span>
            <span className="hidden md:inline-block text-gray-400">LOC: BLR, IN</span>
            <span className="hidden md:inline-block">|</span>
            <span className="text-golden">{localTime}</span>
          </div>
          
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors group">
            Terminate Session <FiArrowUpRight className="-rotate-45 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}