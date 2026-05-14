import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameShell from '../components/GameShell.jsx';
import SchoolBanner from '../components/SchoolBanner.jsx';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    if (!name.trim() || !className.trim()) {
      setError('Nama dan kelas wajib diisi dulu ya.');
      return;
    }
    sessionStorage.setItem('pendingPlayer', JSON.stringify({ name: name.trim(), className: className.trim() }));
    navigate('/play');
  }

  return (
    <GameShell>
      <div className="screen active" id="screen-welcome">
        <SchoolBanner />
        <form className="card" onSubmit={submit}>
          <div className="logo-area">
            <span className="mascot-wrap" id="welcome-mascot">🦸</span>
            <h1 className="game-title">Narkotika<br />Quest!</h1>
            <p className="game-subtitle">Quiz Edukasi Narkotika, Pencegahan, dan Pelaporan 🚓 v3.0</p>
          </div>
          <div className="field-stack">
            <input className="name-input" value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="✏️ Nama kamu" maxLength="40" />
            <input className="name-input" value={className} onChange={(event) => setClassName(event.target.value)} type="text" placeholder="🏫 Kelas kamu" maxLength="40" />
          </div>
          {error ? <div className="form-error">{error}</div> : null}
          <button className="btn btn-primary" type="submit">🚀 Mulai Petualangan!</button>
          <div style={{ marginTop: 10, textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>16 soal seru • 4 bab • mini game Mitos/Fakta!</div>
        </form>
      </div>
    </GameShell>
  );
}
