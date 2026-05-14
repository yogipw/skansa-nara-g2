import { supabase } from '../../../lib/supabaseClient.js';
import {
  fallbackChapters,
  fallbackFacts,
  fallbackMiniGameItems,
  fallbackQuestions,
  fallbackSettings,
  fallbackTips,
} from '../data/fallbackData.js';

function orderByNumber(rows) {
  return [...rows].sort((a, b) => (a.order_number ?? 0) - (b.order_number ?? 0));
}

function createClientId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function getActiveGameSettings() {
  if (!supabase) return fallbackSettings;
  const { data, error } = await supabase.from('game_settings').select('*').eq('is_active', true).limit(1).maybeSingle();
  if (error || !data) return fallbackSettings;
  return data;
}

export async function getActiveChapters() {
  if (!supabase) return orderByNumber(fallbackChapters);
  const { data, error } = await supabase.from('chapters').select('*').eq('is_active', true).order('order_number');
  if (error || !data?.length) return orderByNumber(fallbackChapters);
  return data;
}

export async function getQuestionsForGame(settings, chapters) {
  if (!supabase) return fallbackQuestions;
  const chapterIds = chapters.map((chapter) => chapter.id);
  const { data, error } = await supabase
    .from('questions')
    .select('*, chapter:chapters(*)')
    .in('chapter_id', chapterIds)
    .eq('is_active', true)
    .order('order_number');
  if (error || !data?.length) return fallbackQuestions;
  const perChapter = settings.questions_per_chapter ?? 4;
  return chapters.flatMap((chapter) => data.filter((question) => question.chapter_id === chapter.id).slice(0, perChapter));
}

export async function getActiveMiniGameItems() {
  if (!supabase) return fallbackMiniGameItems;
  const { data, error } = await supabase.from('mini_game_items').select('*').eq('is_active', true).order('round_number').order('order_number');
  if (error || !data?.length) return fallbackMiniGameItems;
  return data;
}

export async function getActiveFacts() {
  return fallbackFacts;
}

export async function getActiveTips() {
  return fallbackTips;
}

export async function createGameSession(payload) {
  const session = { ...payload, id: createClientId(), created_at: new Date().toISOString() };
  if (!supabase) {
    sessionStorage.setItem(`result:${session.id}`, JSON.stringify(session));
    return session;
  }
  const { error } = await supabase.from('game_sessions').insert(session);
  if (error) throw error;
  return session;
}

export async function createAnswerLogs(payload) {
  if (!supabase || !payload.length) return [];
  const { error } = await supabase.from('answer_logs').insert(payload);
  if (error) throw error;
  return [];
}

export async function createMiniGameAnswerLogs(payload) {
  if (!supabase || !payload.length) return [];
  const { error } = await supabase.from('mini_game_answer_logs').insert(payload);
  if (error) throw error;
  return [];
}

export async function getResultBySessionId(sessionId) {
  const local = sessionStorage.getItem(`result:${sessionId}`);
  if (local) return JSON.parse(local);
  if (!supabase) throw new Error('Hasil tidak ditemukan di mode lokal.');
  const { data, error } = await supabase.rpc('get_public_result', { session_uuid: sessionId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}
