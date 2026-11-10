import React, { useRef, useEffect } from 'react';
// @ts-ignore
import pastaSvg from '../assets/images/PASTA.svg';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : -100,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.45 : -100,
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Positionnement initial direct sans re-render React
    el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;

    const render = () => {
      if (el) {
        el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = null;
    };

    const scheduleUpdate = (x: number, y: number) => {
      posRef.current.x = x;
      posRef.current.y = y;
      if (el.style.opacity !== '1') {
        el.style.opacity = '1';
      }
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      scheduleUpdate(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        scheduleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        scheduleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (el) el.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-100 transition-opacity duration-150 will-change-transform"
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    >
      {/* Halo lumineux doux et diffus couleur pâte / ambré en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#E8C37B]/25 blur-xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#966EA3]/20 blur-lg pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 blur-md pointer-events-none" />

      {/* Curseur PASTA.svg */}
      <img
        src={pastaSvg}
        alt=""
        className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-contain drop-shadow-[0_0_12px_rgba(232,195,123,0.55)] select-none"
        draggable={false}
      />
    </div>
  );
};

export default CustomCursor;
