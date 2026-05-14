import { requireSupabase, supabase } from '../../../lib/supabaseClient.js';

export async function signInAdmin(email, password) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const { data: allowlist, error: adminError } = await client
    .from('admin_users')
    .select('email,is_active')
    .eq('email', email)
    .eq('is_active', true)
    .maybeSingle();
  if (adminError) throw adminError;
  if (!allowlist) {
    await client.auth.signOut();
    throw new Error('Akun ini belum terdaftar sebagai admin.');
  }
  return data;
}

export async function signOutAdmin() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(callback) {
  if (!supabase) return { unsubscribe: () => {} };
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return data.subscription;
}
