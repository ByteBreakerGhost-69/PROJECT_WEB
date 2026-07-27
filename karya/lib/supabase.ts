import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Return null kalau env Supabase belum di-set — komponen auth akan
 * otomatis fallback ke lib/local-auth.ts (simulasi localStorage).
 */
export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string);
}
