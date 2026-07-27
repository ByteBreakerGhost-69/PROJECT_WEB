'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactEnvelope() {
  const t = useTranslations('contact');
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (captchaAnswer.trim() !== '8') {
      setError('Jawaban captcha salah, coba lagi ya.');
      return;
    }
    setError('');
    setSent(true);
    // Di produksi: kirim ke API route / email service di sini.
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <h2 className="mb-8 text-center text-3xl font-bold text-charcoal md:text-4xl">
        {t('title')}
      </h2>

      <div className="mx-auto max-w-md" style={{ perspective: 1200 }}>
        {!open && !sent && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ink-spread group flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-terracotta/50 bg-white/50 px-8 py-12 text-charcoal transition"
          >
            <svg viewBox="0 0 100 60" className="h-16 w-28">
              <rect x="2" y="2" width="96" height="56" rx="4" fill="#FDFBF7" stroke="var(--color-terracotta)" strokeWidth="2" />
              <path d="M4 4 L50 36 L96 4" fill="none" stroke="var(--color-terracotta)" strokeWidth="2" />
            </svg>
            <span className="font-hand text-lg">{t('open')}</span>
          </button>
        )}

        <AnimatePresence>
          {open && !sent && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
              className="flex flex-col gap-4 rounded-xl border border-charcoal/10 bg-white/70 p-6 shadow-md"
            >
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="name">
                  {t('name')}
                </label>
                <input
                  id="name"
                  required
                  className="w-full rounded-lg border border-charcoal/15 bg-cream px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="email">
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-charcoal/15 bg-cream px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="message">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full rounded-lg border border-charcoal/15 bg-cream px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="captcha">
                  {t('captcha')}
                </label>
                <input
                  id="captcha"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  required
                  className="w-24 rounded-lg border border-charcoal/15 bg-cream px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
                />
              </div>
              {error && <p className="text-sm text-terracotta">{error}</p>}
              <button
                type="submit"
                className="ink-spread mt-2 rounded-lg bg-charcoal px-6 py-3 text-sm font-semibold text-cream"
              >
                {t('send')}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {sent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-hand rounded-xl border border-sage/40 bg-sage/10 px-6 py-8 text-center text-lg text-charcoal"
          >
            {t('sent')}
          </motion.p>
        )}
      </div>
    </section>
  );
}
