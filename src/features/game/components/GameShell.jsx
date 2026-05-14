import { useEffect, useRef, useState } from 'react';
import { getGameAudioState, startGameBGM, toggleGameMuted } from '../utils/audioEngine.js';
import { naraFaces, pickNaraComment, subscribeNara } from '../utils/naraEvents.js';

export default function GameShell({ children }) {
  const [audioState, setAudioState] = useState(getGameAudioState);
  const [nara, setNara] = useState({ face: naraFaces.idle, mood: 'idle', text: 'Halo bestie!', show: true });
  const naraTimer = useRef(null);

  useEffect(() => {
    setAudioState(getGameAudioState());
  }, []);

  useEffect(() => subscribeNara((event) => {
    window.clearTimeout(naraTimer.current);
    const mood = event.mood || event.commentKey || 'correct';
    setNara({
      face: event.face || naraFaces[mood] || naraFaces.idle,
      mood,
      text: event.text || pickNaraComment(event.commentKey || mood),
      show: true,
    });
    naraTimer.current = window.setTimeout(() => {
      setNara((current) => ({ ...current, show: false }));
    }, event.duration || 3600);
  }), []);

  useEffect(() => () => window.clearTimeout(naraTimer.current), []);

  function startAudioFromGesture() {
    startGameBGM();
    setAudioState(getGameAudioState());
  }

  function toggleAudio(event) {
    event.stopPropagation();
    const muted = toggleGameMuted();
    setAudioState({ muted, running: !muted });
  }

  return (
    <div className="screen-route" onPointerDownCapture={startAudioFromGesture}>
      <canvas id="stars-canvas" />
      <canvas id="confetti-canvas" />
      <canvas id="fireworks-canvas" />
      <button id="mute-btn" type="button" title="Mute/Unmute" onClick={toggleAudio}>{audioState.muted ? '🔇' : '🔊'}</button>
      <div id="bgm-status" className={audioState.running && !audioState.muted ? 'show' : ''}><div id="bgm-dot" /><span>BGM ON</span></div>
      <div id="nara-corner">
        <div id="nara-bubble" className={nara.show ? 'show' : ''}><span className="nara-name">✨ Nara</span><span id="nara-text">{nara.text}</span></div>
        <span id="nara-emoji" className={`nara-${nara.mood}`} key={`${nara.mood}-${nara.text}`}>{nara.face}</span>
      </div>
      <div className="toast" id="toast" />
      {children}
    </div>
  );
}
