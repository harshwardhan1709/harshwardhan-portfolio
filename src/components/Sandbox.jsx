import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlay, FiTerminal, FiFolder, FiFile, FiDatabase, FiLayout, FiServer, FiCpu, FiCheckCircle, FiClock } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Sandbox() {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const terminalRef = useRef(null);
  const outputRef = useRef(null);
  const compileIntervalRef = useRef(null); 
  
  const [activeFile, setActiveFile] = useState('auth');
  const [isCompiling, setIsCompiling] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);

  // --- THE VIRTUAL FILE SYSTEM ---
  const fileSystem = {
    auth: {
      name: "SecurityConfig.java",
      icon: <FiServer className="text-blue-400" />,
      folder: "backend/security",
      language: "java",
      code: 
`@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/api/v1/auth/**").permitAll()
            .anyRequest().authenticated();
            
        http.addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}`,
      executionSteps: [
        "[SYSTEM] Initiating Spring Boot Context...",
        "[INFO] Loading SecurityFilterChain beans...",
        "[WARN] CSRF protection disabled globally.",
        "[INFO] Session creation policy set to STATELESS.",
        "[SUCCESS] JWT Authentication Filter injected successfully.",
        "BUILD SUCCESSFUL in 1.2s"
      ]
    },
    gsap: {
      name: "HeroAnimation.jsx",
      icon: <FiLayout className="text-yellow-400" />,
      folder: "frontend/components",
      language: "javascript",
      code: 
`useEffect(() => {
  const ctx = gsap.context(() => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "+=100%",
        scrub: 1.5,
        pin: true
      }
    });

    tl.to(".brutalist-text", { 
      scale: 1.5, 
      opacity: 0, 
      ease: "power3.inOut" 
    });

  });
  return () => ctx.revert();
}, []);`,
      executionSteps: [
        "[VITE] HMR enabled. Compiling React components...",
        "[GSAP] Core engine initialized.",
        "[GSAP] ScrollTrigger plugin registered.",
        "[DOM] Attaching listeners to '.hero-container'...",
        "[SUCCESS] Hardware-accelerated animations active.",
        "RENDER SUCCESSFUL in 45ms"
      ]
    },
    query: {
      name: "UserMetrics.sql",
      icon: <FiDatabase className="text-purple-400" />,
      folder: "database/queries",
      language: "sql",
      code: 
`WITH ActiveUsers AS (
    SELECT id, username, joined_at
    FROM users
    WHERE status = 'ACTIVE' AND is_verified = TRUE
)
SELECT 
    a.username,
    COUNT(t.id) as total_transactions,
    SUM(t.amount) as lifetime_value
FROM ActiveUsers a
LEFT JOIN transactions t ON a.id = t.user_id
WHERE t.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, a.username
HAVING SUM(t.amount) > 5000
ORDER BY lifetime_value DESC;`,
      executionSteps: [
        "[PSQL] Connecting to primary cluster...",
        "[QUERY] Analyzing execution plan...",
        "[INFO] Using Index Scan on 'users_status_idx'",
        "[INFO] Performing Hash Left Join on 'transactions'",
        "[SUCCESS] Query executed.",
        "RESULT: 1,024 rows fetched in 112ms."
      ]
    }
  };

  // --- COMPILATION ENGINE ---
  const handleCompile = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalOutput([]);
    
    // Slide terminal up (Slightly shorter on mobile to preserve screen space)
    const terminalHeight = window.innerWidth < 768 ? "220px" : "280px";
    gsap.to(terminalRef.current, { height: terminalHeight, duration: 0.5, ease: "expo.out" });

    const steps = fileSystem[activeFile].executionSteps;
    let currentStep = 0;

    if (compileIntervalRef.current) clearInterval(compileIntervalRef.current);

    compileIntervalRef.current = setInterval(() => {
      if (currentStep < steps.length) {
        const nextStep = steps[currentStep];
        if (nextStep) { 
          setTerminalOutput(prev => [...prev, nextStep]);
        }
        currentStep++;
        
        // Auto-scroll terminal
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      } else {
        clearInterval(compileIntervalRef.current);
        setIsCompiling(false);
      }
    }, 400); 
  };

  const closeTerminal = () => {
    gsap.to(terminalRef.current, { height: "0px", duration: 0.4, ease: "power3.in" });
  };

  useEffect(() => {
    return () => {
      if (compileIntervalRef.current) clearInterval(compileIntervalRef.current);
    };
  }, []);

  // --- SYNTAX HIGHLIGHTER ---
  const highlightCode = (code, language) => {
    let highlighted = code;
    highlighted = highlighted.replace(/(@\w+)/g, '<span class="text-golden font-bold">$1</span>');
    highlighted = highlighted.replace(/(public|private|class|return|new|import|const|let|var|function|useEffect|SELECT|FROM|WHERE|LEFT JOIN|GROUP BY|HAVING|ORDER BY|WITH|AS|AND|TRUE)/g, '<span class="text-blue-400">$1</span>');
    highlighted = highlighted.replace(/("(.*?)"|'(.*?)')/g, '<span class="text-green-400">$1</span>');
    highlighted = highlighted.replace(/(\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>');
    highlighted = highlighted.replace(/([A-Z][a-zA-Z0-9_]*)(?=\s|\.|\()/g, '<span class="text-yellow-200">$1</span>');
    return highlighted;
  };

  // --- GSAP SCROLL ANIMATION ---
  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
    );
  }, []);

  return (
    <section id="sandbox" className="bg-[#010a07] py-24 md:py-32 px-4 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-golden opacity-[0.02] blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={containerRef}>
        
        <div className="mb-12 md:mb-16">
          <p className="text-golden font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <FiCpu /> Logic Execution Environment
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">
            Live <span style={{ color: 'transparent', WebkitTextStroke: '1px #FEC700' }}>Sandbox.</span>
          </h2>
        </div>

        {/* --- THE IDE CONTAINER --- */}
        <div className="border border-gray-700 rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-[#01140d] flex flex-col h-[600px] md:h-[650px]">
          
          {/* Top Mac-style Bar */}
          <div className="bg-[#000805] px-4 py-3 border-b border-gray-800 flex items-center justify-between select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">harsh-ide-v2.0</p>
            <div className="w-16"></div> 
          </div>

          {/* --- MOBILE ONLY: Horizontal File Tabs --- */}
          <div className="md:hidden flex overflow-x-auto bg-[#000805] border-b border-gray-800 custom-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {Object.keys(fileSystem).map((key) => (
              <button
                key={key}
                onClick={() => { 
                  if(isCompiling) return; 
                  setActiveFile(key); 
                  closeTerminal(); 
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono whitespace-nowrap transition-colors border-b-2 ${
                  activeFile === key ? 'bg-[#01140d] text-golden border-golden' : 'text-gray-500 hover:text-gray-300 border-transparent'
                }`}
              >
                {fileSystem[key].icon} {fileSystem[key].name}
              </button>
            ))}
          </div>

          <div className="flex flex-1 overflow-hidden relative">
            
            {/* --- DESKTOP ONLY: Left Pane File Explorer --- */}
            <div className="w-64 border-r border-gray-800 hidden md:flex flex-col bg-[#010a07]">
              <div className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800">
                Explorer
              </div>
              <div className="p-2 flex flex-col gap-1 overflow-y-auto">
                {Object.keys(fileSystem).map((key) => (
                  <div key={key} className="flex flex-col gap-1 mb-2">
                    <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 font-mono select-none">
                      <FiFolder className="text-golden/50" /> {fileSystem[key].folder}
                    </div>
                    <button
                      onClick={() => { 
                        if(isCompiling) return; 
                        setActiveFile(key); 
                        closeTerminal(); 
                      }}
                      className={`flex items-center gap-2 px-6 py-2 text-sm font-mono transition-colors text-left ${
                        activeFile === key ? 'bg-golden/10 text-golden border-l-2 border-golden' : 'text-gray-400 hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      {fileSystem[key].icon} {fileSystem[key].name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT PANE: Code Editor & Terminal --- */}
            <div className="flex-1 flex flex-col relative bg-[#01140d]">
              
              {/* Editor Header & Run Button */}
              <div className="flex items-center justify-between bg-[#010a07] border-b border-gray-800 pr-2 md:pr-4">
                {/* Desktop active file tab (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#01140d] border-r border-gray-800 border-t-2 border-t-golden text-gray-300 font-mono text-sm">
                  {fileSystem[activeFile].icon} {fileSystem[activeFile].name}
                </div>
                {/* Mobile spacer when tab is hidden */}
                <div className="md:hidden px-4 py-3 text-xs text-gray-500 font-mono">
                  ~/{fileSystem[activeFile].folder}
                </div>
                
                <button 
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                    isCompiling ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-golden text-[#01140d] hover:bg-white hover:scale-105 shadow-[0_0_10px_rgba(254,199,0,0.2)]'
                  }`}
                >
                  {isCompiling ? <FiClock className="animate-spin" /> : <FiPlay />}
                  {isCompiling ? 'Executing' : 'Run'}
                </button>
              </div>

              {/* Code Display Area */}
              <div ref={editorRef} className="flex-1 overflow-y-auto p-2 md:p-4 flex custom-scrollbar">
                {/* Line Numbers */}
                <div className="flex flex-col text-right pr-2 md:pr-4 border-r border-gray-800 text-gray-600 font-mono text-xs md:text-sm select-none opacity-50">
                  {fileSystem[activeFile].code.split('\n').map((_, i) => (
                    <span key={i} className="leading-[1.6] md:leading-relaxed">{i + 1}</span>
                  ))}
                </div>
                
                {/* Highlighted Code */}
                <pre className="pl-2 md:pl-4 font-mono text-xs md:text-sm text-gray-300 leading-[1.6] md:leading-relaxed whitespace-pre-wrap flex-1 overflow-x-auto">
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(fileSystem[activeFile].code, fileSystem[activeFile].language) }} />
                </pre>
              </div>

              {/* SLIDING TERMINAL OUTPUT */}
              <div ref={terminalRef} className="absolute bottom-0 left-0 w-full bg-[#000805] border-t border-gray-700 flex flex-col h-0 overflow-hidden z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#010a07] border-b border-gray-800">
                  <span className="text-[10px] md:text-xs text-gray-400 font-mono uppercase tracking-widest flex items-center gap-2">
                    <FiTerminal /> Execution Output
                  </span>
                  <button onClick={closeTerminal} className="text-gray-500 hover:text-white transition-colors text-[10px] md:text-xs uppercase tracking-widest">
                    Close
                  </button>
                </div>
                <div ref={outputRef} className="p-3 md:p-4 flex-1 overflow-y-auto font-mono text-xs md:text-sm flex flex-col gap-1 custom-scrollbar">
                  {terminalOutput.map((line, index) => {
                    const safeLine = line || ""; 
                    return (
                      <div key={index} className={`
                        ${safeLine.includes('[SUCCESS]') || safeLine.includes('SUCCESSFUL') ? 'text-green-400' : ''}
                        ${safeLine.includes('[WARN]') || safeLine.includes('[INFO]') ? 'text-yellow-400' : ''}
                        ${safeLine.includes('[SYSTEM]') || safeLine.includes('[PSQL]') || safeLine.includes('[VITE]') ? 'text-blue-400' : ''}
                        ${!safeLine.includes('[') ? 'text-gray-300 font-bold mt-2' : 'text-gray-400'}
                      `}>
                        <span className="text-gray-600 mr-2">{'>'}</span> {safeLine}
                      </div>
                    );
                  })}
                  {isCompiling && (
                    <div className="text-golden animate-pulse mt-1"><span className="text-gray-600 mr-2">{'>'}</span>_ processing...</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}