import { useEffect, useMemo, useState } from 'react';

export default function MiniGamePanel({ state, onAnswer, onFinish }) {
  const [answeredIds, setAnsweredIds] = useState(new Set());
  const items = useMemo(
    () => state.miniGameItems.filter((item) => item.round_number === state.activeMiniRound),
    [state.activeMiniRound, state.miniGameItems],
  );
  const answeredCurrentItems = items.filter((item) => answeredIds.has(item.id)).length;

  useEffect(() => {
    setAnsweredIds(new Set());
  }, [state.activeMiniRound]);

  function handleAnswer(item, answer) {
    if (answeredIds.has(item.id)) return;
    onAnswer(item, answer);
    setAnsweredIds((current) => new Set([...current, item.id]));
  }

  return (
    <div className="screen active" id="screen-minigame">
      <div className="quiz-header"><div className="score-chip">⭐ <span>{state.score}</span></div><div style={{ flex: 1 }} /></div>
      <div className="card minigame-card" id="minigame-card">
        <span style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>🎯</span>
        <div className="minigame-title">Mitos atau Fakta?</div>
        <div className="minigame-subtitle">Tebak sebelum lanjut ke bab berikutnya!</div>
        <div className="mg-score-tally"><span>Poin Mini Game:</span><span className="mg-score-num">+{state.miniGameCorrectCount * (state.settings?.mini_game_points ?? 5)}</span></div>
        <div>
          {items.map((item, index) => {
            const answered = answeredIds.has(item.id);
            const log = state.miniGameLogs.find((entry) => entry.mini_game_item_id === item.id);
            const resultClass = answered ? (log?.is_correct ? 'mg-done-correct' : 'mg-done-wrong') : '';
            return (
              <div className={`mg-item-wrap ${resultClass}`} key={item.id}>
                <div className="mg-item-body">
                  <div className="mg-item-num"><span>#{index + 1}</span></div>
                  <div className="mg-statement">{item.statement_text}</div>
                  <div className="myth-buttons">
                    <button className={`myth-btn mitos ${answered && item.correct_answer === 'mitos' ? 'correct-result' : ''} ${log?.selected_answer === 'mitos' && !log?.is_correct ? 'wrong-result' : ''}`} type="button" onClick={() => handleAnswer(item, 'mitos')} disabled={answered}>🚫 Mitos</button>
                    <button className={`myth-btn fakta ${answered && item.correct_answer === 'fakta' ? 'correct-result' : ''} ${log?.selected_answer === 'fakta' && !log?.is_correct ? 'wrong-result' : ''}`} type="button" onClick={() => handleAnswer(item, 'fakta')} disabled={answered}>✅ Fakta</button>
                  </div>
                </div>
                {answered ? <div className="mg-explain-box show"><span className={`mg-result-tag ${log?.is_correct ? 'correct' : 'wrong'}`}>{log?.is_correct ? '✅ Benar!' : '❌ Salah'}</span><br />{item.explanation}</div> : null}
              </div>
            );
          })}
        </div>
        {items.length > 0 && items.length === answeredCurrentItems ? <button className="btn btn-primary" type="button" style={{ marginTop: 12 }} onClick={onFinish}>Lanjut ➡️</button> : null}
      </div>
    </div>
  );
}
