'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const IDLE_TIMEOUT = 10_000;

export default function Mascot() {
  const t = useTranslations('mascot');
  const facts = t.raw('facts') as string[];
  const prefersReducedMotion = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [asleep, setAsleep] = useState(false);
  const [blownAway, setBlownAway] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [retro, setRetro] = useState(false);

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const scrollResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mata mengikuti kursor / gestur touch
  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointer(clientX: number, clientY: number) {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (clientX - cx) / 200));
      const dy = Math.max(-1, Math.min(1, (clientY - cy) / 200));
      setEye({ x: dx * 4, y: dy * 4 });
      wakeUp();
    }

    function onMouseMove(e: MouseEvent) {
      handlePointer(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (touch) handlePointer(touch.clientX, touch.clientY);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Idle -> tertidur setelah 10 detik tanpa interaksi
  function wakeUp() {
    setAsleep(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setAsleep(true), IDLE_TIMEOUT);
  }

  useEffect(() => {
    wakeUp();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efek "terbawa angin" saat scroll cepat
  useEffect(() => {
    if (prefersReducedMotion) return;

    function onScroll() {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScrollY.current);
      lastScrollY.current = current;
      wakeUp();

      if (delta > 40) {
        setBlownAway(true);
        if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
        scrollResetTimer.current = setTimeout(() => setBlownAway(false), 500);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  // Dengarkan easter egg retro mode dari komponen EasterEgg
  useEffect(() => {
    function onRetro(e: Event) {
      setRetro((e as CustomEvent<boolean>).detail);
    }
    window.addEventListener('karya:retro', onRetro as EventListener);
    return () => window.removeEventListener('karya:retro', onRetro as EventListener);
  }, []);

  function handleClick() {
    wakeUp();
    const fact = facts[Math.floor(Math.random() * facts.length)];
    setBubble(fact);
    setTimeout(() => setBubble(null), 4500);
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-4 right-4 z-40 hidden select-none sm:block md:bottom-8 md:right-8"
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="font-hand absolute -top-4 right-full mr-3 w-48 -translate-y-1/2 rounded-2xl border border-charcoal/10 bg-cream px-4 py-3 text-sm shadow-lg"
          >
            {bubble}
            <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-r border-charcoal/10 bg-cream" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Kiko, si maskot Karya"
        onClick={handleClick}
        animate={
          prefersReducedMotion
            ? undefined
            : blownAway
            ? { x: -12, rotate: -8 }
            : asleep
            ? { y: 2, rotate: 0 }
            : { y: [0, -6, 0], rotate: [0, -2, 0] }
        }
        transition={
          asleep || blownAway
            ? { duration: 0.4 }
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative h-16 w-16 md:h-20 md:w-20"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md">
          {/* Badan - bentuk organik seperti bantal/awan */}
          <path
            d="M20 65 C10 65 8 45 22 38 C22 20 45 10 55 22 C72 12 90 28 82 45 C95 50 92 72 78 72 L30 72 C22 72 18 70 20 65 Z"
            fill="var(--color-sage)"
          />
          {/* Kaki mungil */}
          <ellipse cx="38" cy="80" rx="6" ry="4" fill="var(--color-sage)" />
          <ellipse cx="64" cy="80" rx="6" ry="4" fill="var(--color-sage)" />

          {/* Mata */}
          <g>
            <circle cx="40" cy="48" r="9" fill="#FDFBF7" />
            <circle cx="62" cy="48" r="9" fill="#FDFBF7" />
            {asleep ? (
              <>
                <path d="M35 48 Q40 52 45 48" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M57 48 Q62 52 67 48" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx={40 + eye.x} cy={48 + eye.y} r="4" fill="#2C2C2C" />
                <circle cx={62 + eye.x} cy={48 + eye.y} r="4" fill="#2C2C2C" />
              </>
            )}
          </g>

          {/* Pipi */}
          <circle cx="30" cy="58" r="4" fill="var(--color-terracotta)" opacity="0.35" />
          <circle cx="72" cy="58" r="4" fill="var(--color-terracotta)" opacity="0.35" />

          {/* Topi koboi - muncul cuma saat easter egg aktif */}
          {retro && (
            <g>
              <ellipse cx="51" cy="24" rx="22" ry="5" fill="#8B5A2B" />
              <path d="M38 24 Q51 4 64 24 Z" fill="#A9662F" />
            </g>
          )}
        </svg>
      </motion.button>
    </div>
  );
}
