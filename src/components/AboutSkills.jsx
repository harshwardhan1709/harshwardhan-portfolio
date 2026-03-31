import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBookOpen, FiCode, FiDatabase, FiLayout, FiTool, FiTarget } from 'react-icons/fi';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AboutSkills() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarsRef = useRef([]);

  // Helpers to push refs into arrays for staggered animations
  const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };
  const addToBars = (el) => { if (el && !progressBarsRef.current.includes(el)) progressBarsRef.current.push(el); };

  useEffect(() => {
    // Create a GSAP MatchMedia instance for responsive animations
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Desktop Setup
        isDesktop: "(min-width: 1024px)",
        // Mobile/Tablet Setup
        isMobile: "(max-width: 1023px)"
      },
      (context) => {
        let { isDesktop } = context.conditions;

        // 1. Desktop Only: Pin the Left Column
        if (isDesktop) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 10%",
            end: "bottom bottom",
            pin: leftColRef.current,
            scrub: 1,
          });
        }

        // 2. Animate Cards In (Both Desktop & Mobile)
        cardsRef.current.forEach((card) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: isDesktop ? "top 85%" : "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // 3. Animate Skill Progress Bars (Both Desktop & Mobile)
        progressBarsRef.current.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-width');
          gsap.fromTo(bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.5,
              ease: "expo.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        return () => {
          // Cleanup done automatically by matchMedia
        };
      }
    );

    return () => mm.revert(); // Clean up on component unmount
  }, []);

  return (
    <section id="skills" className="relative bg-[#01140d] text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-golden opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      <div ref={containerRef} className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* --- LEFT COLUMN: Sticky Header --- */}
        <div className="lg:col-span-5 relative">
          <div ref={leftColRef} className="flex flex-col gap-6 lg:pt-10">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-golden"></span>
              <span className="text-golden font-mono text-sm uppercase tracking-[0.2em]">The Foundation</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Education <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px #ffffff' }}>& Skills</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mt-4 max-w-md border-l border-golden/30 pl-6">
              A solid academic background combined with intensive, hands-on fullstack training. I focus on writing clean, efficient, and scalable code.
            </p>

            {/* Decorative Grid Square */}
            <div className="hidden lg:grid grid-cols-3 gap-2 w-32 mt-12 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-full aspect-square border border-golden"></div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Scrolling Content --- */}
        <div className="lg:col-span-7 flex flex-col gap-20">
          
          {/* ================= EDUCATION SECTION ================= */}
          <div className="flex flex-col gap-10">
            <h3 className="text-3xl font-light uppercase tracking-widest text-white flex items-center gap-4 border-b border-gray-800 pb-4">
              <FiBookOpen className="text-golden" /> Academic Journey
            </h3>

            <div className="relative border-l border-gray-800 pl-8 md:pl-12 flex flex-col gap-12">
              
              {/* Item 1: Jspiders */}
              <div ref={addToCards} className="relative group">
                <span className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 rounded-full border-2 border-[#01140d] bg-golden group-hover:scale-150 transition-transform duration-300"></span>
                <p className="text-golden font-mono text-sm tracking-widest mb-2">2025 - Present</p>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Java Fullstack with React</h4>
                <p className="text-gray-400 text-lg uppercase tracking-wider">Jspiders</p>
                <p className="text-gray-500 mt-3 text-sm leading-relaxed">Intensive training program focusing on modern web development architectures, bridging backend stability with frontend interactivity.</p>
              </div>

              {/* Item 2: College */}
              <div ref={addToCards} className="relative group">
                <span className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 rounded-full border-2 border-[#01140d] bg-gray-600 group-hover:bg-golden transition-colors duration-300"></span>
                <p className="text-gray-500 font-mono text-sm tracking-widest mb-2">2022 - Present</p>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Bachelor of Engineering in IT</h4>
                <p className="text-gray-400 text-lg uppercase tracking-wider">Siliguri Institute of Technology</p>
              </div>

              {/* Item 3 & 4: Schooling (Grid layout for compactness) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <span className="absolute -left-[33px] md:-left-[49px] top-1 w-4 h-4 rounded-full border-2 border-[#01140d] bg-gray-600"></span>
                
                <div ref={addToCards} className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-golden/50 transition-colors">
                  <p className="text-gray-500 font-mono text-xs mb-2">12th Grade (BSEB)</p>
                  <h5 className="text-xl font-bold text-white mb-1">Lila Mandal School</h5>
                  <div className="inline-block mt-2 px-3 py-1 bg-forest text-golden text-sm font-bold border border-golden/30">65.6%</div>
                </div>

                <div ref={addToCards} className="bg-white/5 border border-white/10 p-6 rounded-none hover:border-golden/50 transition-colors">
                  <p className="text-gray-500 font-mono text-xs mb-2">10th Grade (CBSE)</p>
                  <h5 className="text-xl font-bold text-white mb-1">DAV Public School</h5>
                  <p className="text-sm text-gray-400 mb-2">Cantt Area, Gaya</p>
                  <div className="inline-block px-3 py-1 bg-forest text-golden text-sm font-bold border border-golden/30">8.4 CGPA</div>
                </div>
              </div>
            </div>
          </div>


          {/* ================= SKILLS SECTION ================= */}
          <div className="flex flex-col gap-10">
            <h3 className="text-3xl font-light uppercase tracking-widest text-white flex items-center gap-4 border-b border-gray-800 pb-4">
              <FiCode className="text-golden" /> Technical Arsenal
            </h3>

            <div className="flex flex-col gap-8">
              
              {/* Skill 1: Core Java */}
              <div ref={addToCards} className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <FiCode className="text-gray-400" />
                    <span className="font-bold text-lg md:text-xl text-white">Core Java</span>
                  </div>
                  <span className="text-golden font-mono text-sm">90%</span>
                </div>
                <p className="text-xs text-gray-500 font-mono uppercase">OOPs • Exception Handling • Collections • Threading</p>
                <div className="h-1 w-full bg-gray-800">
                  <div ref={addToBars} data-width="90%" className="h-full bg-golden shadow-[0_0_10px_rgba(254,199,0,0.5)]"></div>
                </div>
              </div>

              {/* Skill 2: Database */}
              <div ref={addToCards} className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <FiDatabase className="text-gray-400" />
                    <span className="font-bold text-lg md:text-xl text-white">Database (MySQL, Oracle)</span>
                  </div>
                  <span className="text-golden font-mono text-sm">85%</span>
                </div>
                <p className="text-xs text-gray-500 font-mono uppercase">CRUD • Joins • Complex Queries</p>
                <div className="h-1 w-full bg-gray-800">
                  <div ref={addToBars} data-width="85%" className="h-full bg-golden shadow-[0_0_10px_rgba(254,199,0,0.5)]"></div>
                </div>
              </div>

              {/* Skill 3: Frontend */}
              <div ref={addToCards} className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <FiLayout className="text-gray-400" />
                    <span className="font-bold text-lg md:text-xl text-white">Frontend Development</span>
                  </div>
                  <span className="text-golden font-mono text-sm">75%</span>
                </div>
                <p className="text-xs text-gray-500 font-mono uppercase">HTML • CSS • JavaScript (Basics) • React</p>
                <div className="h-1 w-full bg-gray-800">
                  <div ref={addToBars} data-width="75%" className="h-full bg-golden shadow-[0_0_10px_rgba(254,199,0,0.5)]"></div>
                </div>
              </div>

              {/* Tools & Platforms */}
              <div ref={addToCards} className="mt-6 border border-gray-800 p-6 relative">
                <div className="absolute -top-3 left-4 bg-[#01140d] px-2 text-golden font-mono text-xs flex items-center gap-2">
                  <FiTool /> Tools & Platforms
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Git', 'GitHub', 'VS Code', 'Eclipse'].map((tool, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-golden hover:text-golden transition-colors cursor-default">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div ref={addToCards} className="mt-2 border border-gray-800 p-6 relative">
                <div className="absolute -top-3 left-4 bg-[#01140d] px-2 text-golden font-mono text-xs flex items-center gap-2">
                  <FiTarget /> Soft Skills
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Problem-Solving', 'Quick Learner', 'Attention to Detail', 'Teamwork', 'Communication'].map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-golden hover:text-golden transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}