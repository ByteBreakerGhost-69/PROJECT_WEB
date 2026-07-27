'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    function move(e: MouseEvent) {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${
        e.clientY - 8
      }px, 0)`;
    }

    function overCheck(e: MouseEvent) {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest('a, button, [role="button"], input, textarea')));
    }

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', overCheck, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', overCheck);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full will-change-transform"
      style={{
        width: isHovering ? 10 : 16,
        height: isHovering ? 10 : 16,
        backgroundColor: 'var(--color-sage)',
        opacity: 0.85,
        transition: 'width 150ms ease, height 150ms ease',
      }}
    />
  );
}
