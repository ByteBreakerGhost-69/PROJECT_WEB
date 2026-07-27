'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';

const LOCALES: { code: 'id' | 'en' | 'zh'; label: string; flag: string }[] = [
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Ganti bahasa"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition hover:bg-sage/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
      >
        🌐
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-charcoal/10 bg-cream shadow-lg"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === l.code}
                onClick={() => {
                  router.replace(pathname, { locale: l.code });
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-sage/10 ${
                  locale === l.code ? 'font-bold text-terracotta' : 'text-charcoal'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
