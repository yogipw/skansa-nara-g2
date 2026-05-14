import { requireSupabase } from '../../../lib/supabaseClient.js';

export async function getDashboardStats() {
  const client = requireSupabase();
  const [{ data: sessions }, { data: answers }, { data: miniGames }] = await Promise.all([
    client.from('game_sessions').select('*').order('created_at', { ascending: false }),
    client.from('answer_logs').select('*'),
    client.from('mini_game_items').select('*').order('round_number').order('order_number'),
  ]);
  const safeSessions = sessions || [];
  const safeAnswers = answers || [];
  const totalPlayers = safeSessions.length;
  const averageScore = totalPlayers ? Math.round(safeSessions.reduce((sum, row) => sum + Number(row.score || 0), 0) / totalPlayers) : 0;
  const averageAccuracy = totalPlayers ? Math.round(safeSessions.reduce((sum, row) => sum + Number(row.accuracy || 0), 0) / totalPlayers) : 0;
  const totalCorrect = safeAnswers.filter((row) => row.is_correct).length;
  const totalWrong = safeAnswers.filter((row) => !row.is_correct).length;
  const missed = groupMissedQuestion(safeAnswers);
  const weakest = groupWeakChapter(safeAnswers);
  return {
    totalPlayers,
    averageScore,
    averageAccuracy,
    totalCorrect,
    totalWrong,
    mostMissedQuestion: missed?.label || '-',
    weakestChapter: weakest?.label || '-',
    leaderboard: [...safeSessions].sort((a, b) => Number(b.accuracy) - Number(a.accuracy) || Number(b.score) - Number(a.score)).slice(0, 10),
    miniGames: miniGames || [],
  };
}

function groupMissedQuestion(rows) {
  const map = new Map();
  rows.filter((row) => !row.is_correct).forEach((row) => {
    const key = row.question_text_snapshot;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }))[0];
}

function groupWeakChapter(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const key = row.chapter_title_snapshot || 'Tanpa bab';
    const current = map.get(key) || { total: 0, wrong: 0 };
    map.set(key, { total: current.total + 1, wrong: current.wrong + (row.is_correct ? 0 : 1) });
  });
  return [...map.entries()]
    .map(([label, value]) => ({ label, pct: value.total ? value.wrong / value.total : 0 }))
    .sort((a, b) => b.pct - a.pct)[0];
}

export async function getChapters() {
  const client = requireSupabase();
  const { data, error } = await client.from('chapters').select('*').order('order_number');
  if (error) throw error;
  return data || [];
}

export async function saveChapter(payload, id) {
  const client = requireSupabase();
  const query = id
    ? client.from('chapters').update(payload).eq('id', id)
    : client.from('chapters').insert(payload);
  const { error } = await query;
  if (error) throw error;
}

export async function toggleChapterStatus(id, isActive) {
  const client = requireSupabase();
  const { error } = await client.from('chapters').update({ is_active: isActive }).eq('id', id);
  if (error) throw error;
}

export async function getQuestions() {
  const client = requireSupabase();
  const { data, error } = await client.from('questions').select('*, chapter:chapters(*)').order('order_number');
  if (error) throw error;
  return data || [];
}

export async function saveQuestion(payload, id) {
  const client = requireSupabase();
  const query = id
    ? client.from('questions').update(payload).eq('id', id)
    : client.from('questions').insert(payload);
  const { error } = await query;
  if (error) throw error;
}

export async function toggleQuestionStatus(id, isActive) {
  const client = requireSupabase();
  const { error } = await client.from('questions').update({ is_active: isActive }).eq('id', id);
  if (error) throw error;
}

export async function getGameSessions() {
  const client = requireSupabase();
  const { data, error } = await client.from('game_sessions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function deleteGameSession(sessionId) {
  const client = requireSupabase();
  const [{ error: answerError }, { error: miniError }] = await Promise.all([
    client.from('answer_logs').delete().eq('session_id', sessionId),
    client.from('mini_game_answer_logs').delete().eq('session_id', sessionId),
  ]);
  if (answerError) throw answerError;
  if (miniError) throw miniError;
  const { error: sessionError } = await client.from('game_sessions').delete().eq('id', sessionId);
  if (sessionError) throw sessionError;
}

export async function clearPlayerResultData() {
  const client = requireSupabase();
  const zeroUuid = '00000000-0000-0000-0000-000000000000';
  const [{ error: answerError }, { error: miniError }] = await Promise.all([
    client.from('answer_logs').delete().neq('id', zeroUuid),
    client.from('mini_game_answer_logs').delete().neq('id', zeroUuid),
  ]);
  if (answerError) throw answerError;
  if (miniError) throw miniError;
  const { error: sessionError } = await client.from('game_sessions').delete().neq('id', zeroUuid);
  if (sessionError) throw sessionError;
}

export async function getGameSessionDetail(sessionId) {
  const client = requireSupabase();
  const [{ data: session, error: sessionError }, { data: answers, error: answersError }, { data: miniAnswers, error: miniError }] = await Promise.all([
    client.from('game_sessions').select('*').eq('id', sessionId).single(),
    client.from('answer_logs').select('*').eq('session_id', sessionId).order('answered_at'),
    client.from('mini_game_answer_logs').select('*').eq('session_id', sessionId).order('answered_at'),
  ]);
  if (sessionError) throw sessionError;
  if (answersError) throw answersError;
  if (miniError) throw miniError;
  return { session, answers: answers || [], miniAnswers: miniAnswers || [] };
}

export async function getMiniGameItems() {
  const client = requireSupabase();
  const { data, error } = await client.from('mini_game_items').select('*').order('round_number').order('order_number');
  if (error) throw error;
  return data || [];
}

export async function saveMiniGameItem(payload, id) {
  const client = requireSupabase();
  const query = id
    ? client.from('mini_game_items').update(payload).eq('id', id)
    : client.from('mini_game_items').insert(payload);
  const { error } = await query;
  if (error) throw error;
}

export async function toggleMiniGameStatus(id, isActive) {
  const client = requireSupabase();
  const { error } = await client.from('mini_game_items').update({ is_active: isActive }).eq('id', id);
  if (error) throw error;
}

export function exportResultsToCSV(rows) {
  const headers = ['Nama', 'Kelas', 'Skor', 'Max Possible Score', 'Akurasi', 'Benar', 'Salah', 'Streak Terbaik', 'Mini Game Score', 'Rank', 'Tanggal Main'];
  const body = rows.map((row) => [
    row.player_name,
    row.class_name,
    row.score,
    row.max_possible_score,
    row.accuracy,
    row.correct_count,
    row.wrong_count,
    row.best_streak,
    row.mini_game_score,
    row.rank_label,
    row.created_at,
  ]);
  const csv = [headers, ...body].map((line) => line.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `skansa-results-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
