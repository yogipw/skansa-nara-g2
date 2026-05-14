import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GameShell from '../components/GameShell.jsx';
import { getResultBySessionId } from '../services/gameService.js';
import { fallbackQuotes, fallbackRanks } from '../data/fallbackData.js';
import { getRank } from '../utils/scoring.js';
import { shareWhatsApp } from '../utils/share.js';

function Certificate({ result, accuracy, rank }) {
  return (
    <>
      <div className="cert-area-card">
        <span className="cert-corner tl">🌟</span><span className="cert-corner tr">🌟</span><span className="cert-corner bl">🛡️</span><span className="cert-corner br">🛡️</span>
        <div className="cert-header">
          <div className="cert-school">🏫 SMK NEGERI 1 KONGBENG</div>
          <div className="cert-school-sub">Kabupaten Kutai Timur - Kalimantan Timur</div>
          <div className="cert-title">Sertifikat Digital - Narkotika Quest</div>
        </div>
        <hr className="cert-divider" />
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontWeight: 700, marginBottom: 2 }}>DIBERIKAN KEPADA</div>
        <div className="cert-name">{result.player_name}</div>
        <div className="cert-score-row">
          <div className="cert-score-item"><div className="cert-score-val">{result.score}</div><div className="cert-score-lbl">SKOR</div></div>
          <div className="cert-score-item"><div className="cert-score-val">{accuracy}%</div><div className="cert-score-lbl">AKURASI</div></div>
          <div className="cert-score-item"><div className="cert-score-val">{result.best_streak}</div><div className="cert-score-lbl">STREAK</div></div>
        </div>
        <div className="cert-rank"><div className="cert-rank-text">{rank.icon} {rank.label}</div></div>
        <div className="cert-footer">Generasi Siaga Narkotika 🇮🇩 | NarkotikaQuest v3.0</div>
      </div>
      <div className="cert-hint">📸 Screenshot sertifikat ini untuk kenang-kenangan!</div>
    </>
  );
}

export default function ResultPage() {
  const { sessionId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showMobileCert, setShowMobileCert] = useState(false);

  useEffect(() => {
    getResultBySessionId(sessionId).then(setResult).catch((err) => setError(err.message));
  }, [sessionId]);

  if (error) {
    return <GameShell><div className="screen active"><div className="card"><div className="section-title">Hasil tidak ditemukan</div><p className="section-sub">{error}</p><Link className="btn btn-primary" to="/">Main Lagi</Link></div></div></GameShell>;
  }

  if (!result) {
    return <GameShell><div className="screen active"><div className="card section-title">Memuat hasil...</div></div></GameShell>;
  }

  const accuracy = Math.round(Number(result.accuracy || 0));
  const rank = fallbackRanks.find((item) => item.label === result.rank_label) || getRank(accuracy);
  const quote = fallbackQuotes[accuracy % fallbackQuotes.length];

  return (
    <GameShell>
      <div className="screen active" id="screen-results">
        <div className="results-layout">
          <div className="results-cert-col">
            <Certificate result={result} accuracy={accuracy} rank={rank} />
          </div>
          <div className="results-main-col">
            <div className="card results-main-card" style={{ maxWidth: '100%' }}>
              <span className="result-mascot">🏆</span>
              <div className="result-title">Luar Biasa!</div>
              <div className="result-category">{result.class_name}</div>
              <div className="rank-badge" style={{ '--badge-start': rank.badgeStart, '--badge-end': rank.badgeEnd, '--badge-glow': rank.badgeGlow }}>
                <span className="rank-icon">{rank.icon}</span>
                <div className="rank-label">{rank.label}</div>
                <div className="rank-sub">{rank.sub}</div>
              </div>
              <div className="stats-grid">
                <div className="stat-box"><span className="stat-val">{accuracy}%</span><span className="stat-label">Akurasi Total</span></div>
                <div className="stat-box"><span className="stat-val">{result.best_streak}</span><span className="stat-label">Streak Terbaik</span></div>
                <div className="stat-box"><span className="stat-val">{result.correct_count}</span><span className="stat-label">Jawaban Benar</span></div>
                <div className="stat-box"><span className="stat-val">{result.wrong_count}</span><span className="stat-label">Jawaban Salah</span></div>
              </div>
              <div className="big-score"><span className="score-number">{result.score}</span><span className="score-max"> poin</span></div>
              <div className="anti-quote">{quote}</div>
              <button className={`cert-toggle-btn ${showMobileCert ? 'is-on' : ''}`} type="button" aria-pressed={showMobileCert} onClick={() => setShowMobileCert((value) => !value)}>
                <span className="cert-toggle-switch"><span /></span>
                <span>{showMobileCert ? 'Sertifikat ON' : 'Sertifikat OFF'}</span>
              </button>
              <div className={`mobile-cert-slot ${showMobileCert ? 'show' : ''}`}>
                <Certificate result={result} accuracy={accuracy} rank={rank} />
              </div>
              <div className="result-btns">
                <button className="btn btn-wa" type="button" onClick={() => shareWhatsApp(result)}>📱 Bagikan ke WhatsApp</button>
                <Link className="btn btn-primary" to="/">🔄 Main Lagi!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GameShell>
  );
}
