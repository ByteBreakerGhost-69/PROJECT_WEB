'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioItems } from '@/lib/portfolio-data';

const COLOR_MAP = {
  sage: 'var(--color-sage)',
  terracotta: 'var(--color-terracotta)',
  gold: 'var(--color-gold)',
};

export default function PortfolioGallery() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = portfolioItems.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {portfolioItems.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActiveSlug(item.slug)}
            className={`group block w-full overflow-hidden rounded-2xl text-left transition-transform duration-300 ease-reveal hover:-translate-y-2 ${item.heightClass}`}
            style={{ backgroundColor: COLOR_MAP[item.color] + '40' }}
          >
            <span className="font-hand block h-full w-full p-4 text-charcoal opacity-0 transition-opacity group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.slug}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/70 px-4"
            onClick={() => setActiveSlug(null)}
          >
            <motion.div
              key={active.slug + '-panel'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-cream p-8 shadow-xl"
            >
              <div
                className="mb-6 h-64 w-full rounded-xl"
                style={{ backgroundColor: COLOR_MAP[active.color] + '55' }}
              />
              <h2 className="mb-2 text-2xl font-bold text-charcoal">{active.title}</h2>
              <p className="font-hand text-terracotta">{active.caption}</p>

              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="hand-underline mt-6 text-sm font-semibold text-charcoal"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
