import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiX, FiMessageCircle, FiMail, FiSend } from 'react-icons/fi';

export default function ContactDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GSAP Animation for opening/closing the drawer
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Fade in overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      visibility: "visible",
      duration: 0.3,
      ease: "power2.out"
    });

    // Slide in drawer
    tl.to(drawerRef.current, {
      x: "0%",
      duration: 0.6,
      ease: "expo.out"
    }, "-=0.2");

    // Stagger form elements
    tl.fromTo(".form-element",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    );

    if (isOpen) {
      tl.play();
      document.body.style.overflow = 'hidden'; 
    } else {
      tl.reverse();
      document.body.style.overflow = 'auto';
    }

    return () => tl.kill();
  }, [isOpen]);

  // --- THE WHATSAPP MAGIC ---
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // Your actual phone number (without the '+' sign)
    const phoneNumber = "916299116544"; 
    
    // Format the message nicely
    const text = `Hi Harsh, I am ${formData.name}.\n\n*Purpose:* ${formData.purpose}\n\n*Message:*\n${formData.message}`;
    
    // URL Encode the text so it safely passes through the browser
    const encodedText = encodeURIComponent(text);
    
    // Construct the WhatsApp API URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form and close drawer
    setFormData({ name: '', purpose: '', message: '' });
    setIsOpen(false);
  };

  return (
    <>
      {/* --- FLOATING ACTION BUTTON --- */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[80] w-16 h-16 bg-golden text-[#01140d] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(254,199,0,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(254,199,0,0.6)] transition-all duration-300 group"
      >
        <FiMessageCircle className="text-3xl group-hover:animate-bounce" />
      </button>

      {/* --- BACKGROUND OVERLAY --- */}
      <div 
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-[#01140d]/80 backdrop-blur-sm z-[90] invisible opacity-0 cursor-pointer"
      ></div>

      {/* --- THE SLIDE-OUT DRAWER --- */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 w-full max-w-md h-full bg-[#021a12] border-l border-white/10 z-[100] transform translate-x-full shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-gray-800">
          <div>
            <p className="text-golden font-mono text-xs uppercase tracking-widest mb-1">Direct Line</p>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Let's <span className="text-golden">Talk.</span></h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-golden hover:border-golden transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-10">
          
          {/* WhatsApp Form */}
          <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-8">
            <div className="form-element flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-400 font-mono text-xs uppercase tracking-widest">Your Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className="bg-transparent border-b-2 border-gray-700 text-white py-2 outline-none focus:border-golden transition-colors font-mono text-base"
                placeholder="John Doe"
              />
            </div>

            <div className="form-element flex flex-col gap-2">
              <label htmlFor="purpose" className="text-gray-400 font-mono text-xs uppercase tracking-widest">Purpose of Contact</label>
              <input 
                type="text" 
                name="purpose" 
                id="purpose" 
                value={formData.purpose}
                onChange={handleChange}
                required 
                className="bg-transparent border-b-2 border-gray-700 text-white py-2 outline-none focus:border-golden transition-colors font-mono text-base"
                placeholder="Job Opportunity, Freelance, etc."
              />
            </div>

            <div className="form-element flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-400 font-mono text-xs uppercase tracking-widest">Message</label>
              <textarea 
                name="message" 
                id="message" 
                value={formData.message}
                onChange={handleChange}
                required 
                rows="4"
                className="bg-transparent border-b-2 border-gray-700 text-white py-2 outline-none focus:border-golden transition-colors font-mono text-base resize-none"
                placeholder="How can we collaborate?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="form-element mt-2 flex items-center justify-center gap-3 bg-[#25D366] text-[#01140d] font-bold uppercase tracking-widest py-4 hover:brightness-110 transition-all shadow-[8px_8px_0px_#012e1e] hover:shadow-[4px_4px_0px_#012e1e] hover:translate-x-1 hover:translate-y-1"
            >
              Send via WhatsApp <FiMessageCircle className="text-xl" />
            </button>
          </form>

          {/* Divider */}
          <div className="form-element flex items-center gap-4 opacity-50">
            <div className="flex-1 h-[1px] bg-gray-600"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-gray-600"></div>
          </div>

          {/* Direct Email Link */}
          <a 
            href={`mailto:harshwardhan987@gmail.com?subject=Inquiry from Portfolio 2026`}
            className="form-element flex items-center justify-center gap-3 border-2 border-golden text-golden font-bold uppercase tracking-widest py-4 hover:bg-golden hover:text-[#01140d] transition-all shadow-[8px_8px_0px_rgba(254,199,0,0.1)] hover:shadow-[4px_4px_0px_rgba(254,199,0,0.1)] hover:translate-x-1 hover:translate-y-1"
          >
            Send an Email <FiMail className="text-xl" />
          </a>

        </div>
      </div>
    </>
  );
}