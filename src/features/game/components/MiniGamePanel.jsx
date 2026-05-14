import { useCallback, useEffect, useMemo, useState } from 'react';

const miniGameTimerSeconds = 60;

function MiniGameItem({ item, index, total, log, selectedAnswer, isCompleted, onAnswer }) {
  const [remainingMs, setRemainingMs] = useState(miniGameTimerSeconds * 1000);
  const isCorrect = log?.is_correct ?? selectedAnswer === item.correct_answer;
  const timerPercent = Math.max(0, Math.round((remainingMs / (miniGameTimerSeconds * 1000)) * 100));
  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

  useEffect(() => {
    setRemainingMs(miniGameTimerSeconds * 1000);
  }, [item.id]);

  useEffect(() => {
    if (isCompleted) return undefined;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const nextRemaining = Math.max((miniGameTimerSeconds * 1000) - (Date.now() - startedAt), 0);
      setRemainingMs(nextRemaining);
      if (nextRemaining <= 0) {
        window.clearInterval(timer);
        onAnswer(item, 'timeout');
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [isCompleted, item, onAnswer]);

  return (
    <div className={`mg-item-wrap ${isCompleted ? (isCorrect ? 'mg-done-correct' : 'mg-done-wrong') : 'mg-active'}`}>
      <div className="mg-timer-bar"><div className="mg-timer-fill" style={{ width: `${timerPercent}%` }} /></div>
      <div className="mg-item-body">
        <div className="mg-item-num">
          <span>Pernyataan {index + 1} dari {total}</span>
          <span className={`mg-countdown-badge ${remainingSeconds <= 3 && !isCompleted ? 'urgent' : ''}`}>{remainingSeconds}s</span>
        </div>
        <div className="mg-statement">{item.statement_text}</div>
        <div className="myth-buttons">
          <button
            className={`myth-btn mitos ${isCompleted && item.correct_answer === 'mitos' ? 'correct-result' : ''} ${selectedAnswer === 'mitos' && !isCorrect ? 'wrong-result' : ''}`}
            type="button"
            onClick={() => onAnswer(item, 'mitos')}
            disabled={isCompleted}
          >
            🚫 Mitos
          </button>
          <button
            className={`myth-btn fakta ${isCompleted && item.correct_answer === 'fakta' ? 'correct-result' : ''} ${selectedAnswer === 'fakta' && !isCorrect ? 'wrong-result' : ''}`}
            type="button"
            onClick={() => onAnswer(item, 'fakta')}
            disabled={isCompleted}
          >
            ✅ Fakta
          </button>
        </div>
      </div>
      {isCompleted ? (
        <div className="mg-explain-box show">
          {selectedAnswer === 'timeout' ? (
            <span className="mg-timeout-tag">Waktu Habis!</span>
          ) : (
            <span className={`mg-result-tag ${isCorrect ? 'correct' : 'wrong'}`}>{isCorrect ? 'Benar!' : 'Salah'}</span>
          )}
          <br />
          {item.explanation}
        </div>
      ) : null}
    </div>
  );
}

export default function MiniGamePanel({ state, onAnswer, onFinish }) {
  const [completedIds, setCompletedIds] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const items = useMemo(
    () => state.miniGameItems
      .filter((item) => item.round_number === state.activeMiniRound)
      .sort((a, b) => (a.order_number ?? 0) - (b.order_number ?? 0)),
    [state.activeMiniRound, state.miniGameItems],
  );
  const miniGamePoints = state.settings?.mini_game_points ?? 5;
  const roundLogs = state.miniGameLogs.filter((log) => items.some((item) => item.id === log.mini_game_item_id));
  const roundScore = roundLogs.filter((log) => log.is_correct).length * miniGamePoints;
  const maxRoundScore = items.length * miniGamePoints;
  const isRoundDone = items.length > 0 && completedIds.size === items.length;
  const roundPct = maxRoundScore ? Math.round((roundScore / maxRoundScore) * 100) : 0;

  useEffect(() => {
    setCompletedIds(new Set());
    setSelectedAnswers({});
  }, [state.activeMiniRound]);

  const handleAnswer = useCallback((item, answer) => {
    setCompletedIds((current) => {
      if (current.has(item.id)) return current;
      onAnswer(item, answer);
      setSelectedAnswers((answers) => ({ ...answers, [item.id]: answer }));
      return new Set([...current, item.id]);
    });
  }, [onAnswer]);

  function recapText() {
    if (roundPct >= 75) return `Wow kamu kritis banget! ${roundScore} dari ${maxRoundScore} poin! 🔥`;
    if (roundPct >= 50) return `Lumayan lahh! ${roundScore}/${maxRoundScore} poin. Belajar lagi ya! 😊`;
    return `Gapapa ${roundScore}/${maxRoundScore}, yang penting udah nyoba! 💪 Baca faktanya ya!`;
  }

  return (
    <div className="screen active" id="screen-minigame">
      <div className="quiz-header"><div className="score-chip">⭐ <span>{state.score}</span></div><div style={{ flex: 1 }} /></div>
      <div className="card minigame-card" id="minigame-card">
        <span style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>🎯</span>
        <div className="minigame-title">Mitos atau Fakta?</div>
        <div className="minigame-subtitle">Ronde {state.activeMiniRound} - Jawab sebelum timer habis!</div>
        <div className="mg-score-tally"><span>Poin Mini Game:</span><span className="mg-score-num">+{roundScore}</span></div>
        <div id="myth-items">
          {items.map((item, index) => {
            const log = roundLogs.find((entry) => entry.mini_game_item_id === item.id);
            const selectedAnswer = log?.selected_answer || selectedAnswers[item.id];
            return (
              <MiniGameItem
                index={index}
                isCompleted={completedIds.has(item.id)}
                item={item}
                key={item.id}
                log={log}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                total={items.length}
              />
            );
          })}
        </div>
        {isRoundDone ? (
          <>
            <div id="mg-recap-box" className="show">
              <span style={{ fontSize: 18 }}>{roundPct >= 75 ? '🎉' : roundPct >= 50 ? '👍' : '💪'}</span> <strong>Nara says:</strong> {recapText()}
            </div>
            <button className="btn btn-primary" type="button" style={{ marginTop: 12 }} onClick={onFinish}>Lanjut ➡️</button>
          </>
        ) : null}
        {!items.length ? <button className="btn btn-primary" type="button" onClick={onFinish}>Lanjut ➡️</button> : null}
      </div>
    </div>
  );
}
