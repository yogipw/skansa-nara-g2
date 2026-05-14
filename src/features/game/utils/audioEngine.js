const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;

let audioCtx = null;
let masterGain = null;
let bgmGain = null;
let bgmNodes = [];
let bgmRunning = false;
let bgmLoopTimer = null;
let isMuted = localStorage.getItem('nara-muted') === 'true';

const BPM = 128;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const BARS = 8;
const LOOP_LEN = BAR * BARS;

const MELODY_SEQ = [
  [523.25, 0, 0.85], [659.25, 1, 0.85], [783.99, 2, 0.85], [659.25, 3, 0.45], [698.46, 3.5, 0.45],
  [783.99, 4, 1.2], [880, 5.5, 0.5], [987.77, 6, 0.85], [880, 7, 0.85],
  [783.99, 8, 0.85], [698.46, 9, 0.85], [659.25, 10, 0.85], [523.25, 11, 0.85],
  [587.33, 12, 0.85], [698.46, 13, 0.85], [783.99, 14, 1.7],
  [1046.5, 16, 0.5], [987.77, 16.5, 0.5], [880, 17, 0.85], [783.99, 18, 0.85], [698.46, 19, 0.45], [659.25, 19.5, 0.45],
  [783.99, 20, 0.85], [659.25, 21, 0.5], [587.33, 21.5, 0.5], [523.25, 22, 1.7],
  [659.25, 24, 0.4], [698.46, 24.5, 0.4], [783.99, 25, 0.4], [880, 25.5, 0.4], [987.77, 26, 0.85], [1046.5, 27, 0.85],
  [880, 28, 0.5], [783.99, 28.5, 0.5], [698.46, 29, 0.5], [659.25, 29.5, 0.5], [523.25, 30, 1.8],
];

const BASS_SEQ = [
  [130.81, 0], [164.81, 2], [196, 4], [164.81, 6],
  [130.81, 8], [146.83, 10], [146.83, 12], [130.81, 14],
  [261.63, 16], [220, 18], [196, 20], [130.81, 22],
  [164.81, 24], [196, 26], [174.61, 28], [130.81, 30],
];

const CHORD_BEATS = [2, 6, 10, 14, 18, 22, 26, 30];
const CHORD_FREQS = [
  [523.25, 659.25, 783.99], [523.25, 659.25, 783.99], [392, 523.25, 659.25], [392, 523.25, 659.25],
  [440, 554.37, 659.25], [440, 554.37, 659.25], [349.23, 440, 523.25], [349.23, 440, 523.25],
];

export function initGameAudio() {
  if (!AudioCtx) return false;
  if (audioCtx) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return true;
  }
  try {
    audioCtx = new AudioCtx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);
    bgmGain = audioCtx.createGain();
    bgmGain.gain.value = 0;
    bgmGain.connect(masterGain);
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return true;
  } catch (error) {
    return false;
  }
}

function noise(gainVal, duration, delay = 0, hpFreq = 3000, targetGain = bgmGain) {
  if (!audioCtx || isMuted) return null;
  const t = audioCtx.currentTime + delay;
  const bufLen = Math.ceil(audioCtx.sampleRate * (duration + 0.01));
  const buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
  const src = audioCtx.createBufferSource();
  const g = audioCtx.createGain();
  const hf = audioCtx.createBiquadFilter();
  hf.type = 'highpass';
  hf.frequency.value = hpFreq;
  src.buffer = buf;
  src.connect(hf);
  hf.connect(g);
  g.connect(targetGain);
  g.gain.setValueAtTime(gainVal, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.start(t);
  src.stop(t + duration + 0.02);
  return src;
}

function scheduleBGMLoop(startTime) {
  if (!audioCtx || !bgmGain || isMuted) return;
  MELODY_SEQ.forEach(([freq, beat, dur]) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const lp = audioCtx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;
    osc.connect(lp);
    lp.connect(g);
    g.connect(bgmGain);
    osc.type = 'square';
    osc.frequency.value = freq;
    const st = startTime + beat * BEAT;
    const d = dur * BEAT * 0.82;
    g.gain.setValueAtTime(0, st);
    g.gain.linearRampToValueAtTime(0.18, st + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, st + d);
    osc.start(st);
    osc.stop(st + d + 0.02);
    bgmNodes.push(osc);
  });

  BASS_SEQ.forEach(([freq, beat]) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.connect(g);
    g.connect(bgmGain);
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const st = startTime + beat * BEAT;
    const d = BEAT * 0.78;
    g.gain.setValueAtTime(0, st);
    g.gain.linearRampToValueAtTime(0.3, st + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, st + d);
    osc.start(st);
    osc.stop(st + d + 0.02);
    bgmNodes.push(osc);
  });

  CHORD_BEATS.forEach((beat, index) => {
    CHORD_FREQS[index].forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.connect(g);
      g.connect(bgmGain);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const st = startTime + beat * BEAT;
      const d = BEAT * 0.3;
      g.gain.setValueAtTime(0, st);
      g.gain.linearRampToValueAtTime(0.09, st + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, st + d);
      osc.start(st);
      osc.stop(st + d + 0.02);
      bgmNodes.push(osc);
    });
  });

  for (let beat = 0; beat < BARS * 4; beat += 1) {
    const st = startTime + beat * BEAT;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.connect(g);
    g.connect(bgmGain);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, st);
    osc.frequency.exponentialRampToValueAtTime(38, st + 0.1);
    g.gain.setValueAtTime(0.55, st);
    g.gain.exponentialRampToValueAtTime(0.0001, st + 0.14);
    osc.start(st);
    osc.stop(st + 0.16);
    bgmNodes.push(osc);
    if (beat % 4 === 1 || beat % 4 === 3) {
      const snare = noise(0.12, 0.08, beat * BEAT, 2000, bgmGain);
      if (snare) bgmNodes.push(snare);
    }
    const hat = noise(0.06, 0.035, beat * BEAT + BEAT * 0.5, 7000, bgmGain);
    if (hat) bgmNodes.push(hat);
  }
}

export function startGameBGM() {
  if (bgmRunning || isMuted || !initGameAudio()) return false;
  bgmRunning = true;
  bgmGain.gain.cancelScheduledValues(audioCtx.currentTime);
  bgmGain.gain.setValueAtTime(0, audioCtx.currentTime);
  bgmGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 1.2);
  let loopStart = audioCtx.currentTime + 0.05;
  scheduleBGMLoop(loopStart);
  function scheduleNext() {
    loopStart += LOOP_LEN;
    scheduleBGMLoop(loopStart);
    bgmLoopTimer = setTimeout(scheduleNext, (LOOP_LEN - 1) * 1000);
  }
  bgmLoopTimer = setTimeout(scheduleNext, (LOOP_LEN - 1) * 1000);
  return true;
}

export function stopGameBGM(fade = true) {
  if (!bgmRunning || !audioCtx || !bgmGain) return;
  bgmRunning = false;
  clearTimeout(bgmLoopTimer);
  if (fade) {
    bgmGain.gain.cancelScheduledValues(audioCtx.currentTime);
    bgmGain.gain.setValueAtTime(bgmGain.gain.value, audioCtx.currentTime);
    bgmGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.8);
    setTimeout(() => {
      bgmNodes.forEach((node) => {
        try { node.stop(); } catch (error) { /* already stopped */ }
      });
      bgmNodes = [];
    }, 900);
  } else {
    bgmGain.gain.value = 0;
    bgmNodes.forEach((node) => {
      try { node.stop(); } catch (error) { /* already stopped */ }
    });
    bgmNodes = [];
  }
}

export function setGameMuted(value) {
  isMuted = value;
  localStorage.setItem('nara-muted', String(isMuted));
  if (isMuted) stopGameBGM(false);
  return isMuted;
}

export function toggleGameMuted() {
  const next = setGameMuted(!isMuted);
  if (!next) startGameBGM();
  return next;
}

export function getGameAudioState() {
  return { muted: isMuted, running: bgmRunning };
}

function tone(freq, duration, delay = 0, type = 'sine', gainValue = 0.16) {
  if (!audioCtx || isMuted) return;
  const t = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(g);
  g.connect(masterGain);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gainValue, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playGameSfx(type) {
  if (!initGameAudio() || isMuted) return;
  if (type === 'correct') {
    tone(659.25, 0.12, 0, 'triangle', 0.12);
    tone(987.77, 0.16, 0.08, 'triangle', 0.14);
    return;
  }
  if (type === 'wrong') {
    tone(220, 0.16, 0, 'sawtooth', 0.09);
    tone(164.81, 0.18, 0.1, 'sawtooth', 0.08);
    return;
  }
  if (type === 'streak') {
    tone(523.25, 0.09, 0, 'square', 0.1);
    tone(783.99, 0.1, 0.07, 'square', 0.11);
    tone(1046.5, 0.18, 0.15, 'square', 0.12);
    return;
  }
  if (type === 'timeout') {
    tone(330, 0.1, 0, 'sine', 0.08);
    tone(247, 0.22, 0.12, 'sine', 0.08);
    return;
  }
  if (type === 'win') {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => tone(freq, 0.18, index * 0.08, 'triangle', 0.12));
  }
}
