'use client';

import { useEffect, useRef } from 'react';

const CODE = 'KARYA';

export default function EasterEgg() {
  const buffer = useRef('');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.length !== 1) return; // abaikan tombol non-karakter (Shift, Enter, dst)

      buffer.current = (buffer.current + e.key).slice(-CODE.length).toUpperCase();

      if (buffer.current === CODE) {
        buffer.current = '';
        document.body.classList.add('retro-mode');
        window.dispatchEvent(new CustomEvent('karya:retro', { detail: true }));

        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => {
          document.body.classList.remove('retro-mode');
          window.dispatchEvent(new CustomEvent('karya:retro', { detail: false }));
        }, 5000);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  return null;
}
