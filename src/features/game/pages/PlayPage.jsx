import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import FactTipsPanel from '../components/FactTipsPanel.jsx';
import GameShell from '../components/GameShell.jsx';
import MiniGamePanel from '../components/MiniGamePanel.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import SchoolBanner from '../components/SchoolBanner.jsx';
import useGameEngine from '../hooks/useGameEngine.js';

export default function PlayPage() {
  const [showIntro, setShowIntro] = useState(true);
  const player = JSON.parse(sessionStorage.getItem('pendingPlayer') || 'null');
  const engine = useGameEngine();

  useEffect(() => {
    if (!showIntro && player && engine.state.status === 'idle') {
      engine.startGame(player);
    }
  }, [engine, player, showIntro]);

  useEffect(() => {
    if (engine.state.status === 'finishing') {
      engine.finishGame();
    }
  }, [engine]);

  if (!player) return <Navigate to="/" replace />;

  return (
    <GameShell>
      {showIntro ? (
        <div className="screen active">
          <SchoolBanner tagline="Sebelum kuis, baca dulu yuk!" badge="" />
          <FactTipsPanel onReady={() => setShowIntro(false)} />
        </div>
      ) : null}
      {engine.state.status === 'loading' ? <div className="screen active"><div className="card section-title">Menyiapkan petualangan...</div></div> : null}
      {engine.state.error ? <div className="screen active"><div className="card form-error">{engine.state.error}</div></div> : null}
      {engine.state.status === 'quiz' && engine.currentQuestion ? (
        <QuestionCard
          question={engine.currentQuestion}
          chapter={engine.currentChapter}
          state={engine.state}
          progress={engine.progress}
          onAnswer={engine.answerQuestion}
          onNext={engine.nextQuestion}
        />
      ) : null}
      {engine.state.status === 'minigame' ? (
        <MiniGamePanel state={engine.state} onAnswer={engine.answerMiniGame} onFinish={engine.finishMiniGame} />
      ) : null}
      {engine.state.status === 'finishing' || engine.state.status === 'saving' ? <div className="screen active"><div className="card section-title">Menyimpan hasil...</div></div> : null}
    </GameShell>
  );
}
