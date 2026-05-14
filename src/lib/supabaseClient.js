import { createClient } from '@supabase/supabase-js';
import { env, hasSupabaseEnv } from './env.js';

export const supabase = hasSupabaseEnv
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}
