export function shareWhatsApp(result) {
  const message = [
    '🎯 *Narkotika Quest v3 - SMK N 1 Kongbeng*',
    '',
    `👤 Pemain: ${result.player_name}`,
    `🏫 Kelas: ${result.class_name}`,
    `🏅 Gelar: ${result.rank_label}`,
    `⭐ Skor: ${result.score} poin`,
    `📊 Akurasi: ${Math.round(result.accuracy)}%`,
    `🔥 Streak Terbaik: ${result.best_streak}`,
    `✅ Benar: ${result.correct_count}/${result.total_questions}`,
    '',
    '🚓 Generasi Siaga Narkotika dari Kaltim!',
    '#NarkotikaQuest #SMK1Kongbeng #SiagaNarkotika',
  ].join('\n');
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
