import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiTerminal, FiX, FiMaximize2 } from 'react-icons/fi';

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'HW-OS v.2026.1 initialized.' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  
  const terminalRef = useRef(null);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const outputEndRef = useRef(null);
  const tlRef = useRef(null); 

  // --- Keyboard Shortcut Listener ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); 
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // --- GSAP Setup & Animation ---
  useEffect(() => {
    // Initial GSAP setup (yPercent handles the slide down)
    gsap.set(terminalRef.current, { yPercent: -100, scale: 0.95 });

    const tl = gsap.timeline({ paused: true });

    // autoAlpha natively animates opacity and toggles visibility: visible/hidden
    tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
      .to(terminalRef.current, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" }, "-=0.2");

    tlRef.current = tl;
  }, []);

  // --- Trigger Animation on State Change ---
  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      tlRef.current.play();
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => inputRef.current?.focus(), 200); 
    } else {
      tlRef.current.reverse();
      document.body.style.overflow = 'auto'; 
    }
  }, [isOpen]);

  // --- Auto-scroll to bottom of terminal output ---
  useEffect(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // --- Command Parser Logic ---
  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `harsh@admin:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands:' });
        newHistory.push({ type: 'output', text: '  about      - Display developer profile' });
        newHistory.push({ type: 'output', text: '  skills     - Navigate to Engineering Arsenal' });
        newHistory.push({ type: 'output', text: '  sandbox    - Navigate to Logic Sandbox' });
        newHistory.push({ type: 'output', text: '  projects   - Navigate to Featured Works' });
        newHistory.push({ type: 'output', text: '  contact    - Initialize communication protocols' });
        newHistory.push({ type: 'output', text: '  clear      - Clear terminal output' });
        newHistory.push({ type: 'output', text: '  sudo       - Execute with root privileges' });
        break;
      case 'about':
        newHistory.push({ type: 'output', text: 'Harsh Wardhan: FullStack Engineer.' });
        newHistory.push({ type: 'output', text: 'Specialization: Core Java, React, Spring Boot.' });
        newHistory.push({ type: 'output', text: 'Status: Ready to build.' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        newHistory.push({ type: 'error', text: 'Nice try. This incident will be reported.' });
        break;
      case 'skills':
      case 'projects':
      case 'contact':
      case 'sandbox':
      case 'home':
      case 'capabilities':
        newHistory.push({ type: 'success', text: `Executing routing protocol to /${cmd}...` });
        setTimeout(() => {
          setIsOpen(false);
          document.getElementById(cmd)?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
        break;
      default:
        newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type 'help' for options.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      {/* Background Dark Overlay */}
      {/* FIX: Used inline style for opacity and visibility instead of Tailwind classes */}
      <div 
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-[#01140d]/90 backdrop-blur-md z-[200] cursor-pointer"
        style={{ opacity: 0, visibility: 'hidden' }}
      ></div>

      {/* The Terminal Window */}
      {/* FIX: Used inline style for opacity and visibility instead of Tailwind classes */}
      <div 
        ref={terminalRef}
        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-[95%] max-w-4xl h-[70vh] bg-[#020d09]/95 border border-gray-700 shadow-[0_30px_100px_rgba(0,0,0,0.8)] rounded-lg z-[210] flex flex-col overflow-hidden"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {/* Terminal Mac-style Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#01140d] border-b border-gray-800 select-none">
          <div className="flex gap-2">
            <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></button>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest">
            <FiTerminal /> harsh-wardhan-root-terminal
          </div>
          <div className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <FiMaximize2 className="text-sm" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-grow p-6 overflow-y-auto font-mono text-sm md:text-base flex flex-col gap-2 custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className={`
              ${line.type === 'system' ? 'text-gray-500 italic' : ''}
              ${line.type === 'user' ? 'text-white font-bold' : ''}
              ${line.type === 'output' ? 'text-gray-300 ml-4' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'success' ? 'text-green-400' : ''}
            `}>
              {line.text}
            </div>
          ))}
          
          {/* Active Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
            <span className="text-golden font-bold shrink-0">harsh@admin:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent border-none outline-none text-white caret-golden shadow-none"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
          <div ref={outputEndRef} />
        </div>
      </div>

      {/* UI Helper Tooltip */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[190] hidden md:flex items-center gap-2 cursor-pointer mix-blend-difference opacity-50 hover:opacity-100 transition-opacity"
      >
        <span className="bg-white text-black px-2 py-1 rounded text-xs font-bold font-mono">Ctrl</span>
        <span className="text-white text-xs font-bold">+</span>
        <span className="bg-white text-black px-2 py-1 rounded text-xs font-bold font-mono">K</span>
        <span className="text-white text-xs font-mono ml-2 uppercase tracking-widest">Terminal</span>
      </div>
    </>
  );
}