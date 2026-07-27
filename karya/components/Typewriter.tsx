'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function Typewriter({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [shown, setShown] = useState(prefersReducedMotion ? text : '');

  useEffect(() => {
    if (prefersReducedMotion) {
      setShown(text);
      return;
    }

    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        // Kecepatan sedikit acak biar terasa natural, bukan robotik,
        // dengan jeda sedikit lebih lama setelah spasi.
        const prevChar = text[i - 1];
        const base = 45 + Math.random() * 55;
        const pause = prevChar === ' ' ? 90 : 0;
        setTimeout(tick, base + pause);
      }
    }

    const start = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, prefersReducedMotion]);

  return (
    <span>
      {shown}
      <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-terracotta align-middle" style={{ height: '0.8em' }} aria-hidden="true" />
    </span>
  );
}
