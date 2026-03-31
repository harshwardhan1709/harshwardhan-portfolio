import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure EVERY icon we use is imported here
import { FiTerminal, FiCpu, FiGitBranch, FiGitCommit, FiServer, FiCloud, FiCode, FiBox, FiDatabase, FiLayers, FiLayout, FiStar, FiClock } from 'react-icons/fi';

import profImg from '../assets/profimg/pp1.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const terminalTextRef = useRef(null);
  const pipelineRef = useRef(null);
  const packetRef = useRef(null);
  const gitFeedRef = useRef(null); 

  // --- LIVE GITHUB STATE ---
  const [gitRepos, setGitRepos] = useState([]);
  const [gitLoading, setGitLoading] = useState(true);

  // --- THE 10 ENGINEERING SNIPPETS ---
  const codeSnippets = [
`// 01. SPRING BOOT SECURITY CONFIGURATION
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeRequests().antMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated();
        http.addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}`,
`// 02. REACT DOM VIRTUALIZATION & GSAP
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".brutalist-card", {
      y: 100, opacity: 0, stagger: 0.05, ease: "expo.out",
      scrollTrigger: { trigger: ".grid-container", scrub: 1 }
    });
  });
  return () => ctx.revert();
}, []);`,
`// 03. COMPLEX SQL RELATIONAL JOIN (MySQL)
SELECT u.id AS user_id, u.email, COUNT(o.id) AS total_orders, SUM(o.amount) AS lifetime_value
FROM users u LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'ACTIVE' AND o.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY u.id HAVING lifetime_value > 10000 ORDER BY lifetime_value DESC;`,
`// 04. DOCKERFILE ARCHITECTURE
FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/portfolio-api-1.0.jar
COPY \${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080`,
`// 05. NEXT.JS SERVER COMPONENT & FETCH
export default async function DashboardData() {
  const res = await fetch('https://api.internal.dev/metrics', { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch metrics');
  const metrics = await res.json();
  return <div className="grid">{metrics.map(m => <StatCard key={m.id} data={m} />)}</div>;
}`,
`// 06. CORE JAVA MULTI-THREADING LOGIC
public class DataProcessor implements Runnable {
    private final List<Record> batch;
    public DataProcessor(List<Record> batch) { this.batch = batch; }
    @Override
    public void run() {
        batch.parallelStream().forEach(record -> TransformationEngine.process(record));
    }
}`,
`// 07. GITHUB ACTIONS CI/CD WORKFLOW (YAML)
name: Java CI with Maven
on: push: branches: [ "main" ]
jobs: build: runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with: java-version: '17' distribution: 'temurin'
    - name: Build with Maven
      run: mvn -B package --file pom.xml`,
`// 08. EXPRESS.JS MIDDLEWARE ARCHITECTURE
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user; next();
        });
    } else res.sendStatus(401);
};`,
`// 09. TAILWIND CSS CONFIGURATION EXTENSION
module.exports = {
  theme: { extend: { colors: { forest: '#01140d', golden: '#FEC700' } } }
}`,
`// 10. REACT CUSTOM HOOK: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem(key)) || initialValue; } 
    catch (error) { return initialValue; }
  });
  return [storedValue, setStoredValue];
}`
  ];

  // --- 1. FETCH LIVE GITHUB DATA ---
  useEffect(() => {
    const fetchGitData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/harshwardhan1709/repos?sort=updated&per_page=4');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGitRepos(data);
      } catch (error) {
        console.error("Failed to fetch Github Data. Loading fallbacks.", error);
        setGitRepos([
          { id: 1, name: 'harsh-portfolio', description: 'React & GSAP Brutalist Portfolio', language: 'JavaScript', updated_at: new Date().toISOString(), html_url: 'https://github.com/harshwardhan1709', stargazers_count: 5 },
          { id: 2, name: 'fitx-pro', description: 'FullStack Fitness Platform', language: 'Java', updated_at: new Date(Date.now() - 86400000).toISOString(), html_url: 'https://github.com/harshwardhan1709', stargazers_count: 3 },
          { id: 3, name: 'secure-bank-api', description: 'Spring Boot Banking Microservice', language: 'Java', updated_at: new Date(Date.now() - 172800000).toISOString(), html_url: 'https://github.com/harshwardhan1709', stargazers_count: 8 },
          { id: 4, name: 'algorithm-structures', description: 'Core Java Data Structures', language: 'Java', updated_at: new Date(Date.now() - 259200000).toISOString(), html_url: 'https://github.com/harshwardhan1709', stargazers_count: 2 },
        ]);
      } finally {
        setGitLoading(false);
      }
    };
    fetchGitData();
  }, []);

  // --- 2. HIGH-PERFORMANCE DIRECT DOM TYPING ENGINE ---
  useEffect(() => {
    const termElement = terminalTextRef.current;
    if (!termElement) return;

    let isRunning = true;
    let snippetIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 10; 
    
    const typeCode = () => {
      if (!isRunning) return;

      const currentSnippet = codeSnippets[snippetIndex];

      if (isDeleting) {
        termElement.textContent = "> SYSTEM REBOOTING...\n> FLUSHING MEMORY...\n";
        setTimeout(() => {
          termElement.textContent = "";
          isDeleting = false;
          snippetIndex = (snippetIndex + 1) % codeSnippets.length;
          charIndex = 0;
          setTimeout(typeCode, 500);
        }, 800);
        return;
      }

      const chunkSize = 3;
      termElement.textContent = currentSnippet.substring(0, charIndex + chunkSize);
      charIndex += chunkSize;

      if (terminalContainerRef.current) {
        terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
      }

      if (charIndex < currentSnippet.length) {
        setTimeout(typeCode, typingSpeed);
      } else {
        isDeleting = true;
        setTimeout(typeCode, 3000);
      }
    };

    termElement.textContent = "> INITIALIZING HARSH_WARDHAN_CORE...\n> FETCHING REPOSITORIES...\n";
    setTimeout(typeCode, 1500);

    return () => { isRunning = false; };
  }, []);

  // --- 3. GSAP MAIN SCROLL ANIMATIONS (Runs strictly once) ---
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(imageRef.current,
      { x: -50, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" }
    );

    tl.fromTo(textContentRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.8"
    );

    gsap.to(packetRef.current, {
      left: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: pipelineRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1
      }
    });
  }, []);

  // --- 4. GITHUB FEED ANIMATION & HEIGHT RECALCULATION ---
  useEffect(() => {
    if (!gitLoading && gitFeedRef.current) {
      
      gsap.fromTo(gitFeedRef.current.children,
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: gitFeedRef.current, start: "top 85%" }
        }
      );

      // THE CRITICAL FIX: Force GSAP to recalculate the page height 
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200); 

      return () => clearTimeout(timer);
    }
  }, [gitLoading]); 

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="about" ref={sectionRef} className="relative bg-[#01140d] text-white py-32 md:py-40 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-golden opacity-[0.015] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-20 md:mb-32">
          <p className="text-golden font-mono text-sm uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-golden"></span> Classified Dossier
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            System <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>Architect.</span>
          </h2>
        </div>

        {/* --- TOP GRID: IMAGE & BIOGRAPHY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-center">
          
          <div className="lg:col-span-5 relative group" ref={imageRef}>
            <div className="absolute top-6 -right-6 w-full h-full border-2 border-golden/30 z-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
            
            <div className="relative z-10 w-full aspect-[4/5] bg-[#021a12] overflow-hidden">
              <img 
                src={profImg} 
                alt="Harsh Wardhan" 
                className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
              <div className="absolute bottom-6 left-6 bg-[#01140d] border border-golden/50 px-4 py-2 font-mono text-xs text-golden uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0_rgba(254,199,0,0.2)]">
                <span className="w-2 h-2 rounded-full bg-golden animate-pulse"></span>
                Status: Online
              </div>
            </div>
          </div>

          <div ref={textContentRef} className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-white border-l-4 border-golden pl-6 leading-tight">
              Bridging the gap between raw backend logic and fluid visual experiences.
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mt-4">
              I am a FullStack Engineer who views code not just as instructions, but as architecture. Based in Bengaluru, I specialize in building highly scalable backends using <strong className="text-white font-normal">Core Java and Spring Boot</strong>, flawlessly integrated with lightning-fast, brutalist <strong className="text-white font-normal">React</strong> frontends.
            </p>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether optimizing complex MySQL database queries for maximum throughput or engineering mathematically precise GSAP animations for the DOM, my philosophy remains constant: <span className="text-golden font-bold">Write code that is robust, readable, and ruthlessly efficient.</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <FiServer />, label: "Backend", sub: "Java/Spring" },
                { icon: <FiLayout />, label: "Frontend", sub: "React/Vite" },
                { icon: <FiDatabase />, label: "Database", sub: "MySQL/Oracle" },
                { icon: <FiLayers />, label: "Architecture", sub: "System Design" }
              ].map((skill, i) => (
                <div key={i} className="border border-gray-800 p-4 bg-white/[0.02] hover:border-golden/50 hover:bg-golden/5 transition-colors group">
                  <div className="text-2xl text-gray-500 group-hover:text-golden transition-colors mb-3">{skill.icon}</div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">{skill.label}</h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{skill.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- MIDDLE GRID: TERMINAL & PIPELINE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-[#010a07] border border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-[500px] w-full relative group">
              <div className="bg-[#01140d] px-4 py-3 border-b border-gray-800 flex items-center justify-between select-none">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2">
                  <FiTerminal className="text-gray-500" />
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Compiler_Active :: /src/core</p>
                </div>
              </div>
              
              <div 
                ref={terminalContainerRef}
                className="flex-grow p-6 font-mono text-sm md:text-base text-[#4af626] leading-relaxed overflow-y-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                <pre className="whitespace-pre-wrap break-words">
                  <code ref={terminalTextRef}></code>
                  <span className="animate-pulse bg-[#4af626] w-2 h-5 inline-block align-middle ml-1 shadow-[0_0_8px_#4af626]"></span>
                </pre>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full">
            <div ref={pipelineRef} className="bg-white/[0.02] border border-gray-800 p-8 flex flex-col justify-center h-[500px] relative overflow-hidden">
              <div className="absolute top-8 left-8">
                <p className="text-golden font-mono text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <FiCode /> CI/CD Protocol
                </p>
                <h3 className="text-2xl font-light uppercase tracking-widest text-white">Deployment Matrix</h3>
              </div>

              <div className="relative w-full h-2 bg-gray-800 mt-20 rounded-full">
                <div ref={packetRef} className="absolute top-1/2 -translate-y-1/2 w-12 h-3 bg-golden shadow-[0_0_20px_#FEC700] rounded-full z-10" style={{ left: '0%' }}></div>
                
                <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-0 z-20">
                  <div className="relative group flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#01140d] border-2 border-gray-600 group-hover:border-white flex items-center justify-center transition-colors">
                      <FiCode className="text-gray-400 group-hover:text-white" />
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-mono text-white uppercase tracking-widest whitespace-nowrap">Local</span>
                    </div>
                  </div>
                  <div className="relative group flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#01140d] border-2 border-gray-600 group-hover:border-white flex items-center justify-center transition-colors">
                      <FiGitCommit className="text-gray-400 group-hover:text-white" />
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-mono text-white uppercase tracking-widest whitespace-nowrap">Commit</span>
                    </div>
                  </div>
                  <div className="relative group flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#01140d] border-2 border-gray-600 group-hover:border-golden flex items-center justify-center transition-colors">
                      <FiBox className="text-gray-400 group-hover:text-golden" />
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-mono text-golden uppercase tracking-widest whitespace-nowrap">Build</span>
                    </div>
                  </div>
                  <div className="relative group flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#01140d] border-2 border-golden bg-golden/10 flex items-center justify-center shadow-[0_0_15px_rgba(254,199,0,0.4)]">
                      <FiCloud className="text-golden" />
                    </div>
                    <div className="absolute top-14 right-0 flex flex-col items-end gap-1">
                      <span className="text-xs font-bold font-mono text-golden uppercase tracking-widest whitespace-nowrap">Production</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM GRID: LIVE GITHUB NETWORK --- */}
        <div className="border-t border-gray-800 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-golden font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                <FiGitBranch /> Global Network
              </p>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                Live Repositories
              </h3>
            </div>
            <a href="https://github.com/harshwardhan1709" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-golden font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
              View All Commits <FiCode />
            </a>
          </div>

          {gitLoading ? (
            <div className="h-40 flex items-center justify-center border border-gray-800 bg-white/[0.02]">
              <p className="text-golden font-mono text-xs uppercase tracking-widest animate-pulse">Syncing with GitHub Servers...</p>
            </div>
          ) : (
            <div ref={gitFeedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gitRepos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex flex-col border border-gray-800 bg-[#010a07] hover:border-golden/50 hover:bg-white/[0.02] p-6 transition-all duration-300 relative overflow-hidden h-[200px]"
                >
                  <FiGitCommit className="absolute -bottom-6 -right-6 text-9xl text-white/[0.02] group-hover:text-golden/[0.05] transition-colors transform group-hover:-rotate-12" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h4 className="text-lg font-bold text-white mb-2 truncate group-hover:text-golden transition-colors">{repo.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-auto leading-relaxed">
                      {repo.description || 'No description provided for this node.'}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-gray-800 pt-4 mt-4">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-golden"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                          <FiStar /> {repo.stargazers_count}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-1">
                        <FiClock /> {formatDate(repo.updated_at)}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}