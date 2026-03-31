import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  useEffect(() => {
    // High-performance GSAP tracking
    const xMoveCursor = gsap.quickTo(cursorDot.current, "x", { duration: 0.1, ease: "power3" });
    const yMoveCursor = gsap.quickTo(cursorDot.current, "y", { duration: 0.1, ease: "power3" });
    
    // The outline trails slightly behind the dot for a fluid effect
    const xMoveOutline = gsap.quickTo(cursorOutline.current, "x", { duration: 0.6, ease: "power3" });
    const yMoveOutline = gsap.quickTo(cursorOutline.current, "y", { duration: 0.6, ease: "power3" });

    const moveCursor = (e) => {
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveOutline(e.clientX);
      yMoveOutline(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects for all buttons and links
    const hoverElements = document.querySelectorAll('a, button');
    const handleHoverEnter = () => {
      gsap.to(cursorOutline.current, { scale: 2.5, backgroundColor: 'rgba(254, 199, 0, 0.1)', borderColor: 'transparent', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 0, duration: 0.3 });
    };
    const handleHoverLeave = () => {
      gsap.to(cursorOutline.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(254, 199, 0, 0.5)', duration: 0.3 });
      gsap.to(cursorDot.current, { scale: 1, duration: 0.3 });
    };

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-3 h-3 bg-golden rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      ></div>
      <div 
        ref={cursorOutline} 
        className="fixed top-0 left-0 w-10 h-10 border border-golden/50 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
    </>
  );
}