'use client';

// Simulasi auth berbasis localStorage — fallback kalau Supabase belum
// dikonfigurasi. TIDAK aman untuk produksi nyata (password disimpan
// hashed sederhana di client), hanya untuk demo/prototype.

const USERS_KEY = 'karya_users_v1';
const SESSION_COOKIE = 'karya-auth-token';

export interface LocalUser {
  name: string;
  email: string;
  passwordHash: string;
}

function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

function readUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as LocalUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: LocalUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSessionCookie(email: string) {
  // Cookie ringan hanya untuk ditangkap middleware; bukan token aman.
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(
    email
  )}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearSession() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function register(
  name: string,
  email: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  if (!name.trim()) return { ok: false, error: 'Nama wajib diisi.' };
  if (!validateEmail(email)) return { ok: false, error: 'Email tidak valid.' };
  if (!validatePassword(password))
    return { ok: false, error: 'Kata sandi minimal 8 karakter.' };

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'Email sudah terdaftar.' };
  }

  users.push({ name, email, passwordHash: simpleHash(password) });
  writeUsers(users);
  setSessionCookie(email);
  return { ok: true };
}

export function login(
  email: string,
  password: string
): { ok: true } | { ok: false; error: string } {
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user || user.passwordHash !== simpleHash(password)) {
    return { ok: false, error: 'Email atau kata sandi salah.' };
  }
  setSessionCookie(email);
  return { ok: true };
}

export function getCurrentUserEmail(): string | null {
  const match = document.cookie.match(/karya-auth-token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCurrentUser(): LocalUser | null {
  const email = getCurrentUserEmail();
  if (!email) return null;
  return readUsers().find((u) => u.email === email) ?? null;
}
