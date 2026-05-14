const listeners = new Set();

export const naraComments = {
  start: ['Yayyy gaspol! Kamu bisa!', 'Ready? Kita taklukkan kuis ini.', 'Fokus dulu, Nara temenin.'],
  correct: ['YASS! Jawabanmu tepat.', 'Mantap, itu baru siaga!', 'Nailed it. Lanjut terus.'],
  wrong: ['Belum tepat, tapi ini bahan belajar.', 'Tenang, baca faktanya dulu ya.', 'Salah sedikit tidak apa, lanjut lebih tajam.'],
  streak3: ['Streak 3! Panas nih.', 'Tiga benar berturut-turut. Fokusmu mantap.', 'Combo mulai hidup!'],
  streak5: ['Streak 5! Kamu lagi mode juara.', 'Ngeri, lima berturut-turut.', 'Nara sampai ikut lompat.'],
  streakBreak: ['Streak putus, tapi semangat jangan ikut putus.', 'Oke reset dulu, ambil fokus lagi.', 'Santai, comeback dimulai sekarang.'],
  minigame: ['Mini game time! Jadi fakta checker ya.', 'Mode detektif aktif.', 'Cepat, tapi tetap teliti.'],
  mgCorrect: ['Kamu tidak gampang dibohongi.', 'Big brain moment.', 'Fakta kebaca jelas.'],
  mgWrong: ['Itu jebakan, baca faktanya ya.', 'Next pasti lebih kritis.', 'Hampir, tapi belum kena.'],
  mgTimeout: ['Waktu habis. Jangan panik, baca faktanya.', 'Timer menang kali ini.', 'Kecepatan juga bagian tantangan.'],
  win: ['Juara! SMK 1 Kongbeng bangga.', 'Champion! Generasi siaga banget.', 'Keren, hasilmu menyala.'],
  lose: ['Belum maksimal, tapi kamu sudah mulai.', 'Belajar lagi yuk, Nara tunggu.', 'Yang penting berani mencoba.'],
};

export const naraFaces = {
  idle: '🦸',
  correct: '🤩',
  wrong: '😔',
  streak3: '🔥',
  streak5: '🏆',
  streakBreak: '😱',
  minigame: '🎯',
  mgCorrect: '😎',
  mgWrong: '😅',
  mgTimeout: '⏰',
  win: '👑',
  lose: '💪',
  dance: '🕺',
};

export function pickNaraComment(key) {
  const pool = naraComments[key] || naraComments.correct;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function emitNara(event) {
  listeners.forEach((listener) => listener(event));
}

export function subscribeNara(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
