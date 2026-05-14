import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fallbackRanks } from '../data/fallbackData.js';
import {
  createAnswerLogs,
  createGameSession,
  createMiniGameAnswerLogs,
  getActiveChapters,
  getActiveGameSettings,
  getActiveMiniGameItems,
  getQuestionsForGame,
} from '../services/gameService.js';
import { playGameSfx } from '../utils/audioEngine.js';
import { emitNara } from '../utils/naraEvents.js';
import { calculateAccuracy, calculateScore, getRank, maxPossibleScore } from '../utils/scoring.js';

const initialState = {
  status: 'idle',
  player: null,
  settings: null,
  chapters: [],
  questions: [],
  miniGameItems: [],
  index: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  streak: 0,
  bestStreak: 0,
  answerLogs: [],
  miniGameLogs: [],
  miniGameCorrectCount: 0,
  activeMiniRound: null,
  answered: false,
  selectedOption: null,
  startedAt: null,
  error: '',
};

export default function useGameEngine() {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const currentQuestion = state.questions[state.index];
  const progress = state.questions.length ? Math.round((state.index / state.questions.length) * 100) : 0;

  const currentChapter = useMemo(() => {
    if (!currentQuestion) return null;
    return currentQuestion.chapter || state.chapters.find((chapter) => chapter.id === currentQuestion.chapter_id);
  }, [currentQuestion, state.chapters]);

  const startGame = useCallback(async (player) => {
    setState((current) => ({ ...current, status: 'loading', error: '' }));
    try {
      const settings = await getActiveGameSettings();
      const chapters = (await getActiveChapters()).slice(0, settings.max_chapters_per_game ?? 4);
      const [questions, miniGameItems] = await Promise.all([
        getQuestionsForGame(settings, chapters),
        getActiveMiniGameItems(),
      ]);
      setState({
        ...initialState,
        status: 'quiz',
        player,
        settings,
        chapters,
        questions,
        miniGameItems,
        startedAt: new Date().toISOString(),
      });
    } catch (error) {
      setState((current) => ({ ...current, status: 'idle', error: error.message }));
    }
  }, []);

  const answerQuestion = useCallback((selectedOption) => {
    setState((current) => {
      if (current.answered) return current;
      const question = current.questions[current.index];
      const chapter = question.chapter || current.chapters.find((item) => item.id === question.chapter_id);
      const isCorrect = selectedOption === question.correct_option;
      const nextStreak = isCorrect ? current.streak + 1 : 0;
      const bestStreak = Math.max(current.bestStreak, nextStreak);
      const scoreGained = isCorrect ? (current.settings.points_correct ?? question.points ?? 10) : (current.settings.points_wrong ?? 0);
      if (isCorrect) {
        const streakMood = nextStreak >= 5 ? 'streak5' : nextStreak >= 3 ? 'streak3' : 'correct';
        emitNara({ mood: streakMood, commentKey: streakMood });
        playGameSfx(nextStreak >= 3 ? 'streak' : 'correct');
      } else {
        const hadStreak = current.streak >= 2;
        emitNara({ mood: hadStreak ? 'streakBreak' : 'wrong', commentKey: hadStreak ? 'streakBreak' : 'wrong' });
        playGameSfx('wrong');
      }
      const log = {
        question_id: question.id,
        chapter_id: question.chapter_id,
        chapter_title_snapshot: chapter?.title || '',
        question_text_snapshot: question.question_text,
        option_a_snapshot: question.option_a,
        option_b_snapshot: question.option_b,
        option_c_snapshot: question.option_c,
        option_d_snapshot: question.option_d,
        selected_option: selectedOption,
        correct_option_snapshot: question.correct_option,
        is_correct: isCorrect,
        score_gained: scoreGained,
      };
      return {
        ...current,
        answered: true,
        selectedOption,
        score: current.score + scoreGained,
        correctCount: current.correctCount + (isCorrect ? 1 : 0),
        wrongCount: current.wrongCount + (isCorrect ? 0 : 1),
        streak: nextStreak,
        bestStreak,
        answerLogs: [...current.answerLogs, log],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((current) => {
      const nextIndex = current.index + 1;
      const interval = current.settings?.mini_game_interval ?? 4;
      const activeMiniRound = Math.floor(nextIndex / interval);
      const shouldShowMiniGame = current.settings?.mini_game_enabled !== false
        && nextIndex > 0
        && nextIndex < current.questions.length
        && nextIndex % interval === 0
        && current.miniGameItems.some((item) => item.round_number === activeMiniRound);
      if (shouldShowMiniGame) {
        emitNara({ mood: 'minigame', commentKey: 'minigame' });
        return { ...current, status: 'minigame', activeMiniRound, answered: false, selectedOption: null };
      }
      if (nextIndex >= current.questions.length) {
        return { ...current, status: 'finishing' };
      }
      return { ...current, index: nextIndex, answered: false, selectedOption: null };
    });
  }, []);

  const answerMiniGame = useCallback((item, selectedAnswer) => {
    setState((current) => {
      const isCorrect = selectedAnswer === item.correct_answer;
      const scoreGained = isCorrect ? (current.settings.mini_game_points ?? 5) : 0;
      if (selectedAnswer === 'timeout') {
        emitNara({ mood: 'mgTimeout', commentKey: 'mgTimeout' });
        playGameSfx('timeout');
      } else {
        emitNara({ mood: isCorrect ? 'mgCorrect' : 'mgWrong', commentKey: isCorrect ? 'mgCorrect' : 'mgWrong' });
        playGameSfx(isCorrect ? 'correct' : 'wrong');
      }
      return {
        ...current,
        score: current.score + scoreGained,
        miniGameCorrectCount: current.miniGameCorrectCount + (isCorrect ? 1 : 0),
        miniGameLogs: [
          ...current.miniGameLogs,
          {
            mini_game_item_id: item.id,
            statement_text_snapshot: item.statement_text,
            selected_answer: selectedAnswer,
            correct_answer_snapshot: item.correct_answer,
            is_correct: isCorrect,
            score_gained: scoreGained,
          },
        ],
      };
    });
  }, []);

  const finishMiniGame = useCallback(() => {
    setState((current) => ({ ...current, status: 'quiz', index: current.index + 1, activeMiniRound: null, answered: false, selectedOption: null }));
  }, []);

  const finishGame = useCallback(async () => {
    if (state.status !== 'finishing') return;
    setState((current) => ({ ...current, status: 'saving', error: '' }));
    try {
      const finalAccuracy = calculateAccuracy(state.correctCount, state.questions.length);
      const rank = getRank(finalAccuracy, fallbackRanks);
      const finalScore = calculateScore({
        correctCount: state.correctCount,
        wrongCount: state.wrongCount,
        bestStreak: state.bestStreak,
        miniGameCorrectCount: state.miniGameCorrectCount,
        settings: state.settings,
      });
      const finishedAt = new Date().toISOString();
      const sessionPayload = {
        player_name: state.player.name,
        class_name: state.player.className,
        score: finalScore,
        max_possible_score: maxPossibleScore(state.questions.length, state.miniGameLogs.length, state.settings),
        correct_count: state.correctCount,
        wrong_count: state.wrongCount,
        total_questions: state.questions.length,
        accuracy: finalAccuracy,
        best_streak: state.bestStreak,
        mini_game_score: state.miniGameCorrectCount * (state.settings?.mini_game_points ?? 5),
        mini_game_correct_count: state.miniGameCorrectCount,
        rank_label: rank.label,
        started_at: state.startedAt,
        finished_at: finishedAt,
      };
      const session = await createGameSession(sessionPayload);
      await createAnswerLogs(state.answerLogs.map((log) => ({ ...log, session_id: session.id })));
      await createMiniGameAnswerLogs(state.miniGameLogs.map((log) => ({ ...log, session_id: session.id })));
      navigate(`/result/${session.id}`, { replace: true });
    } catch (error) {
      setState((current) => ({ ...current, status: 'error', error: `Gagal menyimpan hasil: ${error.message}` }));
    }
  }, [navigate, state]);

  return {
    state,
    currentQuestion,
    currentChapter,
    progress,
    startGame,
    answerQuestion,
    nextQuestion,
    answerMiniGame,
    finishMiniGame,
    finishGame,
  };
}
