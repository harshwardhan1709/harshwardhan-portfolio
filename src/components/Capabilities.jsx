import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiServer, FiLayout, FiDatabase, FiCpu } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const floatingBoxRef = useRef(null);
  const [activeCapability, setActiveCapability] = useState(null);

  const addToRows = (el) => {
    if (el && !rowsRef.current.includes(el)) rowsRef.current.push(el);
  };

  const capabilities = [
    {
      id: "01",
      title: "Backend Architecture",
      icon: <FiServer className="text-4xl text-golden mb-4" />,
      desc: "Designing secure, scalable microservices and monolithic architectures using Core Java and Spring Boot. Focusing on high-throughput data processing and RESTful API engineering.",
      tech: "Java • Spring Boot • JWT • REST APIs"
    },
    {
      id: "02",
      title: "Frontend Engineering",
      icon: <FiLayout className="text-4xl text-golden mb-4" />,
      desc: "Translating complex logic into seamless, interactive user experiences. Utilizing React, Next.js, and GSAP to build high-performance, brutalist web applications that command attention.",
      tech: "React • Next.js • Tailwind CSS • GSAP"
    },
    {
      id: "03",
      title: "Database Management",
      icon: <FiDatabase className="text-4xl text-golden mb-4" />,
      desc: "Architecting relational database schemas for optimal querying and data integrity. Writing complex SQL joins, indexing, and optimizing CRUD operations for massive datasets.",
      tech: "MySQL • Oracle DB • Database Optimization"
    },
    {
      id: "04",
      title: "System Integration",
      icon: <FiCpu className="text-4xl text-golden mb-4" />,
      desc: "Bridging the gap between server and client. Containerizing applications for reliable deployment and ensuring smooth data flow across the entire technology stack.",
      tech: "Docker • Version Control (Git) • API Integration"
    }
  ];

  // 1. Entrance Animations
  useEffect(() => {
    gsap.fromTo(rowsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // 2. High-Performance Mouse Tracking for Desktop
  useEffect(() => {
    const floatingBox = floatingBoxRef.current;
    if (!floatingBox) return;

    // Use GSAP quickTo for buttery smooth 60fps cursor tracking
    const xMove = gsap.quickTo(floatingBox, "x", { duration: 0.4, ease: "power3" });
    const yMove = gsap.quickTo(floatingBox, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      // Offset by 20px so the box doesn't sit directly under the mouse cursor
      xMove(e.clientX + 20);
      yMove(e.clientY + 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = (cap) => {
    setActiveCapability(cap);
    gsap.to(floatingBoxRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
  };

  const handleMouseLeave = () => {
    gsap.to(floatingBoxRef.current, { scale: 0.8, opacity: 0, duration: 0.2, ease: "power2.in" });
    // Timeout prevents flickering if moving quickly between rows
    setTimeout(() => setActiveCapability(null), 200);
  };

  return (
    <section ref={sectionRef} className="relative bg-[#011c12] text-white py-32 border-t border-white/5 cursor-default">
      
      {/* --- FLOATING TRACKER CARD (Desktop Only) --- */}
      <div 
        ref={floatingBoxRef}
        className="fixed top-0 left-0 w-80 bg-[#021a12]/90 backdrop-blur-xl border border-golden/30 p-6 rounded-none pointer-events-none z-[80] hidden lg:block opacity-0 scale-80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ transformOrigin: "top left" }}
      >
        {activeCapability && (
          <div>
            {activeCapability.icon}
            <h4 className="text-xl font-bold text-white mb-2 uppercase">{activeCapability.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{activeCapability.desc}</p>
            <div className="text-golden font-mono text-xs uppercase tracking-widest bg-golden/5 px-2 py-1 inline-block border border-golden/20">
              {activeCapability.tech}
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-20">
          <p className="text-golden font-mono text-sm uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-golden"></span> Core Competencies
          </p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Engineering <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FEC700' }}>Capabilities.</span>
          </h2>
        </div>

        {/* --- DESKTOP INTERACTIVE LIST --- */}
        <div className="hidden lg:flex flex-col border-t border-gray-800 relative z-10 group/list">
          {capabilities.map((cap, index) => (
            <div 
              key={index}
              ref={addToRows}
              onMouseEnter={() => handleMouseEnter(cap)}
              onMouseLeave={handleMouseLeave}
              className="group border-b border-gray-800 py-12 flex items-center justify-between hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="flex items-center gap-12 pointer-events-none">
                <span className="text-gray-600 font-mono text-3xl transition-colors duration-300 group-hover:text-golden">
                  {cap.id}
                </span>
                <h3 className="text-6xl font-black uppercase tracking-tight text-gray-300 transition-all duration-500 group-hover:translate-x-8 group-hover:text-white"
                    style={{ WebkitTextStroke: '1px transparent' }}
                >
                  {cap.title}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition-all duration-500 group-hover:border-golden group-hover:bg-golden group-hover:text-[#011c12] text-transparent">
                <FiServer className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* --- MOBILE/TABLET STATIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
          {capabilities.map((cap, index) => (
            <div key={index} ref={addToRows} className="bg-white/5 border border-white/10 p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                {cap.icon}
                <span className="text-gray-600 font-mono text-xl">{cap.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-white uppercase mb-4">{cap.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{cap.desc}</p>
              <div className="text-golden font-mono text-xs uppercase tracking-widest pt-4 border-t border-gray-800">
                {cap.tech}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}