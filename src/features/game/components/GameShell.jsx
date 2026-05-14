import { useEffect, useState } from 'react';
import { getGameAudioState, startGameBGM, toggleGameMuted } from '../utils/audioEngine.js';

export default function GameShell({ children }) {
  const [audioState, setAudioState] = useState(getGameAudioState);

  useEffect(() => {
    setAudioState(getGameAudioState());
  }, []);

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
        <div id="nara-bubble"><span className="nara-name">✨ Nara</span><span id="nara-text">Halo bestie! 👋</span></div>
        <span id="nara-emoji">🦸</span>
      </div>
      <div className="toast" id="toast" />
      {children}
    </div>
  );
}
