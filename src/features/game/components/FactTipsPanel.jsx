import { useState } from 'react';
import { fallbackFacts, fallbackTips } from '../data/fallbackData.js';

export default function FactTipsPanel({ onReady }) {
  const [tab, setTab] = useState('facts');
  const [storyIndex, setStoryIndex] = useState(0);
  const [openTip, setOpenTip] = useState(null);
  const fact = fallbackFacts[storyIndex];

  return (
    <div className="screen active" id="screen-facts">
      <div className="card">
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, background: 'var(--bg)', borderRadius: 'var(--r-sm)', padding: 4 }}>
          <button className={`tab-btn ${tab === 'facts' ? 'active' : ''}`} type="button" onClick={() => setTab('facts')} style={{ flex: 1, padding: 10, border: 'none', borderRadius: 10, fontFamily: 'Nunito, sans-serif', fontWeight: 700, cursor: 'pointer', background: tab === 'facts' ? 'white' : 'transparent', color: tab === 'facts' ? 'var(--purple)' : 'var(--muted)' }}>💡 Fakta Penting</button>
          <button className={`tab-btn ${tab === 'tips' ? 'active' : ''}`} type="button" onClick={() => setTab('tips')} style={{ flex: 1, padding: 10, border: 'none', borderRadius: 10, fontFamily: 'Nunito, sans-serif', fontWeight: 700, cursor: 'pointer', background: tab === 'tips' ? 'white' : 'transparent', color: tab === 'tips' ? 'var(--purple)' : 'var(--muted)' }}>🛡️ Tips Menolak</button>
        </div>
        {tab === 'facts' ? (
          <>
            <div className="story-progress-bar"><div className="story-progress-fill" style={{ width: `${((storyIndex + 1) / fallbackFacts.length) * 100}%` }} /></div>
            <div className="story-chapter-label"><span className="story-chapter-num">{storyIndex + 1}</span><span>dari {fallbackFacts.length} fakta penting</span></div>
            <div className="story-card" style={{ borderColor: `${fact.color}33` }}>
              <div className="story-card-header" style={{ background: `${fact.color}10` }}>
                <div className="story-icon-wrap" style={{ background: `linear-gradient(135deg,${fact.color},${fact.color}cc)` }}>{fact.emoji}</div>
                <div><div className="story-card-title">{fact.title}</div><div className="story-card-stat">{fact.stat}</div><div className="story-card-stat-context">{fact.stat_context}</div></div>
              </div>
              <div className="story-card-body">{fact.body}</div>
            </div>
            <div className="story-nav">
              <button className="story-nav-btn" type="button" onClick={() => setStoryIndex((value) => Math.max(0, value - 1))} disabled={storyIndex === 0}>← Prev</button>
              <div className="story-dots">{fallbackFacts.map((_, index) => <div key={index} className={`story-dot ${index === storyIndex ? 'active' : ''}`} />)}</div>
              <button className="story-nav-btn" type="button" onClick={() => setStoryIndex((value) => Math.min(fallbackFacts.length - 1, value + 1))}>Next →</button>
            </div>
          </>
        ) : (
          <>
            <div className="tips-intro"><span style={{ fontSize: 20 }}>🎭</span><span>Tap setiap skenario untuk lihat cara terbaik merespon!</span></div>
            <div>
              {fallbackTips.map((tip, index) => (
                <div className="tip-scenario-card" key={tip.title}>
                  <button className="tip-scenario-header" type="button" onClick={() => setOpenTip(openTip === index ? null : index)}>
                    <div className="tip-icon-badge">{tip.icon}</div>
                    <div><div className="tip-scenario-title">{tip.title}</div><div className="tip-scenario-sub">{tip.subtitle}</div></div>
                    <span className="tip-arrow">▼</span>
                  </button>
                  <div className={`tip-body ${openTip === index ? 'open' : ''}`}>
                    <div className="tip-body-inner"><div className="tip-response-box"><div className="tip-response-label">✅ Respons terbaik:</div>{tip.response}</div><p>{tip.body}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <button className="btn btn-primary" type="button" style={{ marginTop: 16 }} onClick={onReady}>🎯 Siap Kuis!</button>
      </div>
    </div>
  );
}
