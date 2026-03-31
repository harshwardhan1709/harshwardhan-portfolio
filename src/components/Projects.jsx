import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiActivity, FiLayers, FiDatabase, FiCpu, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const projects = [
    {
      id: "01",
      title: "FitX Pro",
      category: "FullStack Architecture",
      description: "A high-performance fitness platform. Engineered with a brutalist React/Vite frontend and a highly optimized backend for tracking user metrics, workout routines, and real-time analytics.",
      tech: ["React", "Vite", "Node.js", "GSAP"],
      metrics: { latency: "45ms", lighthouse: "98/100" },
      icon: <FiActivity />,
      link: "#",
      github: "#",
      bgGradient: "radial-gradient(circle at 50% 50%, #022c1e 0%, #010a07 100%)"
    },
    {
      id: "02",
      title: "Secure Bank API",
      category: "Backend Microservices",
      description: "A stateless, scalable banking API built on Spring Boot. Features deep JWT security configurations, multi-threaded transaction processing, and complex relational data mapping.",
      tech: ["Core Java", "Spring Boot", "MySQL", "JWT"],
      metrics: { throughput: "10k req/s", uptime: "99.99%" },
      icon: <FiDatabase />,
      link: "#",
      github: "#",
      bgGradient: "radial-gradient(circle at 0% 0%, #1a1a00 0%, #010a07 100%)"
    },
    {
      id: "03",
      title: "HW-OS Portfolio",
      category: "Frontend Engineering",
      description: "The current system you are viewing. A masterclass in DOM manipulation, featuring a raw JS typing engine, GSAP ScrollTrigger physics, and an interactive command-line terminal.",
      tech: ["React", "Tailwind", "GSAP", "Vercel"],
      metrics: { render: "16ms", fps: "60.0" },
      icon: <FiCpu />,
      link: "#",
      github: "#",
      bgGradient: "radial-gradient(circle at 100% 100%, #021a12 0%, #010a07 100%)"
    },
    {
      id: "04",
      title: "Data Pipeline",
      category: "System Integration",
      description: "An automated CI/CD pipeline and data processing script that extracts, transforms, and loads massive datasets into a centralized Oracle database for BI analysis.",
      tech: ["Java", "Docker", "Oracle DB", "Git Actions"],
      metrics: { processed: "5TB+", errors: "0.01%" },
      icon: <FiLayers />,
      link: "#",
      github: "#",
      bgGradient: "radial-gradient(circle at 50% 0%, #1a1500 0%, #010a07 100%)"
    }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();

    // --- DESKTOP: Horizontal Scroll Override ---
    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray(".desktop-panel");
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + trackRef.current.offsetWidth
        }
      });
    });

    // --- MOBILE: Fade up on scroll ---
    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".mobile-card");
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });
    });

    return () => mm.revert(); 
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-[#010a07] text-white overflow-hidden border-t border-white/5 relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-golden/20 to-transparent"></div>
      <div className="absolute top-32 lg:bottom-10 lg:top-auto left-4 lg:left-10 text-[25vw] lg:text-[20vw] font-black text-white/[0.02] pointer-events-none select-none mix-blend-overlay z-0 leading-none">
        WORKS
      </div>

      <div className="container mx-auto max-w-7xl pt-24 lg:pt-32 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="mb-12 lg:mb-0">
          <p className="text-golden font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-golden"></span> Featured Implementations
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            Project <br className="hidden md:block"/>
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px #ffffff' }}>Gallery.</span>
          </h2>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP LAYOUT (Horizontal Scroll)           */}
      {/* ========================================== */}
      <div className="hidden lg:block relative z-10 mt-12 xl:mt-16">
        <div ref={trackRef} className="flex w-[400vw] h-screen">
          {projects.map((project, index) => (
            <div key={index} className="desktop-panel w-screen h-screen flex flex-col justify-center px-12 xl:px-24 border-r border-gray-800 relative group">
              
              {/* Giant Background Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.01] pointer-events-none z-0 group-hover:scale-110 transition-transform duration-1000">
                {project.id}
              </div>

              {/* FIX 1: Wrapped the content in a max-w-7xl container so it never stretches too wide */}
              <div className="container mx-auto max-w-7xl w-full">
                <div className="grid grid-cols-12 gap-12 xl:gap-16 items-center relative z-10">
                  
                  {/* Left: Text & Data */}
                  <div className="col-span-7 xl:col-span-6 flex flex-col">
                    <div className="flex items-center gap-4 mb-4 xl:mb-6">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border border-golden/30 flex items-center justify-center text-golden text-lg xl:text-xl bg-golden/5">
                        {project.icon}
                      </div>
                      <p className="text-golden font-mono text-xs xl:text-sm uppercase tracking-[0.2em]">{project.category}</p>
                    </div>
                    
                    <h3 className="text-5xl xl:text-6xl font-black uppercase tracking-tight text-white mb-4 xl:mb-6 leading-none">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-base xl:text-lg leading-relaxed mb-6 xl:mb-8 max-w-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 xl:gap-3 mb-6 xl:mb-10">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-[#01140d] border border-gray-700 text-gray-300 font-mono text-[10px] xl:text-xs uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-8 xl:gap-10 border-t border-gray-800 pt-6 mb-8 xl:mb-10">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={i}>
                          <p className="text-gray-600 font-mono text-[9px] xl:text-[10px] uppercase tracking-widest mb-1">{key}</p>
                          <p className="text-golden font-mono text-lg xl:text-xl">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 xl:gap-6">
                      <a href={project.link} className="flex items-center gap-3 bg-golden text-[#010a07] font-bold uppercase tracking-widest py-2.5 px-6 hover:bg-white transition-colors shadow-[4px_4px_0px_#021a12] hover:translate-x-1 hover:translate-y-1 text-sm">
                        Launch <FiArrowUpRight className="text-lg" />
                      </a>
                      <a href={project.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-[10px] xl:text-xs uppercase tracking-widest group">
                        <FiGithub className="text-base xl:text-lg group-hover:text-golden transition-colors" /> Source
                      </a>
                    </div>
                  </div>

                  {/* Right: Visual Abstract Container */}
                  {/* FIX 2: Responsive height (h-[400px] on small laptops, h-[550px] on large monitors) */}
                  <div className="col-span-5 xl:col-span-6 h-[400px] xl:h-[550px] w-full border border-gray-800 relative overflow-hidden group-hover:border-golden/50 transition-colors duration-500 rounded-lg">
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105" style={{ background: project.bgGradient }}></div>
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(#FEC700 1px, transparent 1px), linear-gradient(90deg, #FEC700 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 xl:w-40 xl:h-40 rounded-full border border-golden/20 bg-[#01140d]/50 backdrop-blur-xl flex items-center justify-center text-6xl xl:text-7xl text-golden shadow-[0_0_80px_rgba(254,199,0,0.15)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                      {project.icon}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE LAYOUT (Sticky Stacking Cards)        */}
      {/* ========================================== */}
      <div className="lg:hidden relative z-10 px-4 md:px-12 pb-32 mt-8 flex flex-col gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="mobile-card sticky w-full border border-gray-800 bg-[#01140d] overflow-hidden shadow-2xl"
            style={{ top: `${100 + (index * 20)}px`, zIndex: index + 1 }}
          >
            
            <div className="h-48 w-full relative border-b border-gray-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0" style={{ background: project.bgGradient }}></div>
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#FEC700 1px, transparent 1px), linear-gradient(90deg, #FEC700 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="relative z-10 text-5xl text-golden drop-shadow-[0_0_15px_rgba(254,199,0,0.3)]">
                {project.icon}
              </div>
              <div className="absolute top-3 right-3 text-4xl font-black text-white/[0.05] pointer-events-none">
                {project.id}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-golden font-mono text-[10px] uppercase tracking-widest mb-2">
                {project.category}
              </p>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-[#010a07] border border-gray-800 text-gray-300 font-mono text-[10px] uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between border-t border-gray-800 pt-4 mb-8">
                {Object.entries(project.metrics).map(([key, value], i) => (
                  <div key={i}>
                    <p className="text-gray-600 font-mono text-[9px] uppercase tracking-widest mb-1">{key}</p>
                    <p className="text-golden font-mono text-sm">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a href={project.link} className="w-full flex items-center justify-center gap-2 bg-golden text-[#010a07] font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors">
                  Launch App <FiExternalLink className="text-base" />
                </a>
                <a href={project.github} className="w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-300 font-mono text-xs uppercase tracking-widest py-3 hover:border-golden hover:text-golden transition-colors">
                  <FiGithub className="text-base" /> Source Code
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}