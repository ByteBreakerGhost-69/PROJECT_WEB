'use client';

import { useState, type ReactNode } from 'react';

const NOTES = [
  'Kalimat ini enak dibaca — pertahankan iramanya.',
  'Coba bayangkan pembaca yang baru pertama kali mampir.',
  'Bagian ini bisa jadi kutipan pendek yang menarik.',
  'Perhatikan transisi ke paragraf berikutnya.',
];

let counter = 0;

export default function AnnotatedParagraph({ children }: { children?: ReactNode }) {
  const [hover, setHover] = useState(false);
  const [note] = useState(() => NOTES[counter++ % NOTES.length]);

  return (
    <span
      className="group relative block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="mb-6">{children}</p>
      <span
        className={`font-hand pointer-events-none absolute left-full top-0 ml-6 hidden w-48 -rotate-1 text-sm text-terracotta transition-opacity duration-200 lg:block ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {note}
      </span>
    </span>
  );
}
