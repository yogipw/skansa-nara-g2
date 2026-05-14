import { fallbackRanks } from '../data/fallbackData.js';

export function getRank(accuracy, ranks = fallbackRanks) {
  return [...ranks].sort((a, b) => b.min - a.min).find((rank) => accuracy >= rank.min) || ranks[ranks.length - 1];
}

export function calculateAccuracy(correctCount, totalQuestions) {
  if (!totalQuestions) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function calculateScore({ correctCount, wrongCount, bestStreak, miniGameCorrectCount, settings }) {
  const cfg = settings || {};
  const baseScore = correctCount * (cfg.points_correct ?? 10);
  const wrongScore = wrongCount * (cfg.points_wrong ?? 0);
  const streakBonus = cfg.streak_bonus_enabled === false
    ? 0
    : Math.floor(bestStreak / (cfg.streak_bonus_every ?? 3)) * (cfg.streak_bonus_points ?? 5);
  const miniGameScore = miniGameCorrectCount * (cfg.mini_game_points ?? 5);
  return baseScore + wrongScore + streakBonus + miniGameScore;
}

export function maxPossibleScore(totalQuestions, miniGameCount, settings) {
  const cfg = settings || {};
  const quiz = totalQuestions * (cfg.points_correct ?? 10);
  const streak = cfg.streak_bonus_enabled === false
    ? 0
    : Math.floor(totalQuestions / (cfg.streak_bonus_every ?? 3)) * (cfg.streak_bonus_points ?? 5);
  const mini = miniGameCount * (cfg.mini_game_points ?? 5);
  return quiz + streak + mini;
}
