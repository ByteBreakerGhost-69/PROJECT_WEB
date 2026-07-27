'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { login, register, validateEmail, validatePassword } from '@/lib/local-auth';

export default function AuthModal() {
  const t = useTranslations('auth');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setOpen(searchParams.get('auth') === 'login' || searchParams.get('auth') === 'register');
    if (searchParams.get('auth') === 'register') setMode('register');
  }, [searchParams]);

  function close() {
    setOpen(false);
    router.replace(pathname);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Email tidak valid.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Kata sandi minimal 8 karakter.');
      return;
    }

    const supabase = getSupabaseClient();

    if (supabase) {
      const result =
        mode === 'login'
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password, options: { data: { name } } });

      if (result.error) {
        setError(result.error.message);
        return;
      }
    } else {
      const result = mode === 'login' ? login(email, password) : register(name, email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
    }

    router.push('/dashboard');
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'login' ? t('loginTitle') : t('registerTitle')}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/40 px-4"
      onClick={close}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-cream p-6 shadow-xl"
      >
        <h2 className="mb-1 text-2xl font-bold text-charcoal">
          {mode === 'login' ? t('loginTitle') : t('registerTitle')}
        </h2>
        {!isSupabaseConfigured && (
          <p className="mb-4 text-xs text-charcoal/50">
            Mode demo: akun disimpan lokal di browser ini.
          </p>
        )}

        {mode === 'register' && (
          <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold" htmlFor="auth-name">
              {t('name')}
            </label>
            <input
              id="auth-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="mb-1 block text-sm font-semibold" htmlFor="auth-email">
            {t('email')}
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-semibold" htmlFor="auth-password">
            {t('password')}
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
          />
        </div>

        {error && <p className="mb-3 text-sm text-terracotta">{error}</p>}

        <button
          type="submit"
          className="ink-spread w-full rounded-lg bg-charcoal px-4 py-3 text-sm font-semibold text-cream"
        >
          {mode === 'login' ? t('loginCta') : t('registerCta')}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="hand-underline mt-4 w-full text-center text-sm text-charcoal/70"
        >
          {mode === 'login' ? t('switchToRegister') : t('switchToLogin')}
        </button>
      </form>
    </div>
  );
}
