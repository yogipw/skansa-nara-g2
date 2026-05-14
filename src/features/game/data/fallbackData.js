export const fallbackChapters = [
  { id: 'chapter-1', title: 'Mengenal Narkotika', emoji: '🧠', order_number: 1, className: 'ch1', is_active: true },
  { id: 'chapter-2', title: 'Dampak & Hukum', emoji: '⚖️', order_number: 2, className: 'ch2', is_active: true },
  { id: 'chapter-3', title: 'Pencegahan & Penolakan', emoji: '🛡️', order_number: 3, className: 'ch3', is_active: true },
  { id: 'chapter-4', title: 'Pelaporan ke Polisi', emoji: '🚓', order_number: 4, className: 'ch4', is_active: true },
];

export const fallbackSettings = {
  questions_per_chapter: 4,
  max_chapters_per_game: 4,
  randomize_questions: false,
  randomize_options: false,
  points_correct: 10,
  points_wrong: 0,
  streak_bonus_enabled: true,
  streak_bonus_every: 3,
  streak_bonus_points: 5,
  mini_game_enabled: true,
  mini_game_interval: 4,
  mini_game_points: 5,
};

export const fallbackFacts = [
  {
    emoji: '🧬',
    title: 'Narkotika Bisa Mengubah Otak Remaja',
    stat: '8 poin IQ',
    stat_context: 'bisa hilang permanen bila dipakai saat remaja',
    body: 'Narkotika seperti ganja dan sabu dapat mengganggu perkembangan otak yang belum matang. Pada usia sekolah, kerusakannya bisa memukul memori, konsentrasi, dan kontrol diri untuk jangka panjang.',
    color: '#9B59FF',
  },
  {
    emoji: '🧪',
    title: 'Narkotika Golongan I Bukan Bahan Coba-Coba',
    stat: 'Golongan I',
    stat_context: 'berisiko sangat tinggi disalahgunakan',
    body: 'Heroin, kokain, dan ganja termasuk contoh narkotika golongan I. Zat ini diawasi sangat ketat karena potensi ketergantungan dan kerusakannya tinggi.',
    color: '#FF6B9D',
  },
  {
    emoji: '⏱️',
    title: 'Overdosis Bisa Terjadi Dalam Hitungan Menit',
    stat: '3-5 menit',
    stat_context: 'napas bisa berhenti pada overdosis opioid',
    body: 'Heroin dan opioid lain menekan pusat pernapasan di batang otak. Saat overdosis, korban bisa kehilangan kesadaran dan berhenti napas sangat cepat.',
    color: '#FF4757',
  },
  {
    emoji: '🗂️',
    title: 'Narkoba Adalah Istilah Payung',
    stat: '3 kelompok',
    stat_context: 'narkotika, psikotropika, dan zat adiktif lainnya',
    body: 'Narkoba sering dipakai sebagai istilah umum. Materi ini memberi penekanan pada narkotika agar pemahaman siswa lebih tajam.',
    color: '#FF8C42',
  },
  {
    emoji: '📄',
    title: 'Sekali Membawa Bisa Masuk Masalah Hukum',
    stat: 'UU 35/2009',
    stat_context: 'penyalahgunaan narkotika punya konsekuensi hukum',
    body: 'Menyimpan, membawa, membeli, atau menjadi perantara narkotika dapat menjerat pelaku dengan proses hukum dan merusak masa depan.',
    color: '#4ECDC4',
  },
  {
    emoji: '📢',
    title: 'Lapor Cepat Bisa Selamatkan Nyawa',
    stat: '110',
    stat_context: 'nomor bantuan polisi yang mudah diingat',
    body: 'Kalau melihat dugaan penyalahgunaan atau peredaran narkotika, tindakan paling aman adalah menjauh dan lapor ke orang dewasa atau polisi.',
    color: '#6BCB77',
  },
];

export const fallbackTips = [
  {
    icon: '🗣️',
    title: 'Teman menawarkan: "Coba deh sekali aja, enak!"',
    subtitle: 'Skenario paling umum yang terjadi di kehidupan nyata',
    response: '"Nggak, gue nggak mau sentuh narkotika. Gue cabut ya."',
    body: 'Jawab singkat, tegas, dan langsung jaga jarak. Menolak cepat itu tanda kontrol diri, bukan takut.',
  },
  {
    icon: '😤',
    title: 'Ditantang: "Ih pengecut, takut doang!"',
    subtitle: 'Tekanan sosial lewat ejekan dan gengsi',
    response: '"Yang berani itu yang bisa jaga otak dan masa depannya."',
    body: 'Balikkan tekanannya. Orang yang benar-benar berani tidak perlu membuktikan diri dengan zat berbahaya.',
  },
  {
    icon: '🏃',
    title: 'Situasi makin gawat, ada yang mulai buka paket mencurigakan',
    subtitle: 'Kamu berada dekat dugaan penggunaan atau transaksi',
    response: 'Tinggalkan tempat, cari orang dewasa tepercaya, lalu laporkan lokasi dan situasinya.',
    body: 'Utamakan keselamatan. Jangan pegang barang, jangan ikut merekam terlalu dekat, dan jangan coba jadi pahlawan sendirian.',
  },
  {
    icon: '📞',
    title: 'Teman panik karena ada yang overdosis atau kecanduan berat',
    subtitle: 'Kondisi darurat yang butuh penanganan cepat',
    response: 'Hubungi bantuan darurat, panggil guru/orang tua, dan minta polisi melalui 110 bila ada unsur pidana.',
    body: 'Fokusmu adalah selamatkan orangnya, amankan lokasi, dan libatkan orang dewasa.',
  },
  {
    icon: '📝',
    title: 'Cara pelaporan yang aman ke polisi',
    subtitle: 'Supaya laporanmu jelas dan tidak membahayakan diri',
    response: 'Catat lokasi, waktu, ciri orang, kendaraan, dan arah kabur.',
    body: 'Sampaikan fakta inti dan jangan sebar video ke media sosial sebelum proses aman.',
  },
];

const questionRows = [
  [1, '💊', 'Apa pemahaman yang paling tepat tentang istilah narkotika dan narkoba?', ['Narkotika dan narkoba itu persis sama tanpa perbedaan', 'Narkotika adalah kelompok zat tertentu, sedangkan narkoba adalah istilah payung yang sering dipakai untuk narkotika, psikotropika, dan zat adiktif lain', 'Narkotika hanya berasal dari tanaman, narkoba hanya dari pabrik', 'Narkoba hanya sebutan untuk ganja dan sabu'], 1, 'Materi ini menekankan narkotika sebagai fokus utama.'],
  [1, '🌿', 'Mengapa ganja berbahaya bila dipakai remaja walau sering disebut "alami"?', ['Karena rasanya pahit', 'Karena tetap termasuk narkotika dan bisa mengganggu perkembangan otak remaja', 'Karena hanya berbahaya bila dicampur kopi', 'Karena aman asal dipakai sedikit'], 1, 'Label alami tidak membuatnya aman untuk otak remaja.'],
  [1, '🧪', 'Heroin termasuk jenis zat apa?', ['Narkotika opioid', 'Vitamin saraf', 'Minuman energi sintetis', 'Obat flu biasa'], 0, 'Heroin adalah opioid yang menekan sistem saraf pusat.'],
  [1, '⚡', 'Sabu-sabu paling tepat digolongkan sebagai zat yang...', ['Merangsang sistem saraf dan memicu euforia kuat', 'Menenangkan otot seperti obat tidur', 'Mengobati kecemasan tanpa efek samping', 'Aman dipakai saat ujian agar fokus'], 0, 'Sabu adalah stimulan kuat dan sangat berisiko.'],
  [2, '🧠', 'Bagian otak mana yang sangat terdampak sehingga pengguna sulit mengontrol keputusan?', ['Kulit kepala', 'Prefrontal cortex', 'Lobus telinga', 'Sumsum tulang'], 1, 'Prefrontal cortex membantu menimbang risiko dan mengontrol dorongan.'],
  [2, '💉', 'Mengapa overdosis heroin atau opioid bisa membunuh cepat?', ['Karena membuat tubuh tertawa terus', 'Karena menghentikan sinyal pernapasan di otak', 'Karena langsung merontokkan tulang', 'Karena menjadikan darah manis'], 1, 'Saat pusat napas ditekan, korban bisa berhenti bernapas dalam hitungan menit.'],
  [2, '⚖️', 'Seorang siswa tertangkap membawa ganja ke sekolah. Risiko terbesarnya adalah...', ['Hanya disuruh pulang lebih cepat', 'Tetap bisa berproses hukum dan merusak masa depan sekolahnya', 'Langsung bebas karena masih pelajar', 'Tidak ada konsekuensi jika jumlahnya kecil'], 1, 'Status pelajar tidak membuat perbuatan itu otomatis aman.'],
  [2, '💸', 'Dampak sosial-ekonomi yang paling sering muncul pada penyalahgunaan narkotika adalah...', ['Nilai naik dan pergaulan makin sehat', 'Prestasi turun, relasi rusak, lalu muncul tekanan uang dan risiko kriminal', 'Tubuh makin kuat dan hemat uang', 'Tidak ada efek di keluarga'], 1, 'Keluarga, sekolah, dan lingkungan ikut terkena efeknya.'],
  [3, '🛡️', 'Teman memaksa: "Coba sekali aja." Respons paling aman adalah...', ['Ikut sekali supaya tidak dibilang takut', 'Menolak tegas lalu menjauh dari situasi', 'Minta dikurangi dosisnya', 'Diam saja tapi tetap di tempat'], 1, 'Jawaban singkat dan tegas lebih efektif daripada alasan panjang.'],
  [3, '🤝', 'Faktor protektif yang paling membantu remaja menolak narkotika adalah...', ['Punya uang banyak', 'Lingkungan positif dan komunikasi terbuka dengan keluarga/guru', 'Sering begadang bareng teman', 'Banyak followers media sosial'], 1, 'Relasi yang sehat membantu remaja menghadapi tekanan.'],
  [3, '🚪', 'Kamu melihat teman membuka paket mencurigakan di toilet sekolah. Langkah awal terbaik adalah...', ['Mendekat dan memegang barangnya', 'Segera menjauh lalu lapor ke guru, satpam, atau wali kelas', 'Ikut mencoba agar tahu isinya', 'Diam saja supaya tidak ribut'], 1, 'Tujuanmu adalah mengamankan diri dan mempercepat penanganan.'],
  [3, '🧩', 'Pernyataan mana yang paling benar tentang kalimat "sekali coba tidak apa-apa"?', ['Benar, kalau mental kuat pasti aman', 'Benar, asal bareng teman dekat', 'Salah, karena sekali coba pun bisa jadi pintu ketagihan atau overdosis', 'Benar, kalau tidak sering'], 2, 'Banyak penyalahgunaan dimulai dari rasa ingin tahu sekali.'],
  [4, '📞', 'Jika ada dugaan transaksi atau ancaman terkait narkotika, nomor bantuan polisi yang paling tepat diingat adalah...', ['119', '110', '112', '113'], 1, 'Nomor 110 digunakan untuk layanan kepolisian.'],
  [4, '📍', 'Informasi apa yang paling membantu saat melapor ke polisi?', ['Cerita yang panjang tanpa inti', 'Komentar teman-teman di grup', 'Lokasi, waktu kejadian, ciri orang, kendaraan, dan apa yang terlihat', 'Jumlah followers yang melihat kejadian'], 2, 'Laporan yang jelas dan ringkas membantu petugas bergerak cepat.'],
  [4, '🚫', 'Saat melihat dugaan transaksi narkotika dari jauh, apa yang tidak boleh dilakukan?', ['Menghadang pelaku sendirian demi terlihat berani', 'Menjauh ke tempat aman', 'Mencatat ciri penting dari jarak aman', 'Melapor ke orang dewasa atau polisi'], 0, 'Konfrontasi sendirian sangat berbahaya.'],
  [4, '🧾', 'Setelah laporan diterima polisi, sikap paling tepat dari pelapor adalah...', ['Menyebar rumor ke media sosial', 'Mengubah-ubah cerita agar terdengar dramatis', 'Tetap jujur, siap memberi keterangan yang konsisten, dan tidak mengganggu proses', 'Mendatangi pelaku untuk minta klarifikasi sendiri'], 2, 'Laporan yang baik didukung keterangan yang jujur dan konsisten.'],
];

export const fallbackQuestions = questionRows.map(([chapter, emoji, text, options, correct, explanation], index) => ({
  id: `question-${index + 1}`,
  chapter_id: `chapter-${chapter}`,
  emoji,
  question_text: text,
  option_a: options[0],
  option_b: options[1],
  option_c: options[2],
  option_d: options[3],
  correct_option: correct,
  explanation,
  difficulty: 'normal',
  points: 10,
  order_number: index + 1,
  is_active: true,
  chapter: fallbackChapters[chapter - 1],
}));

export const fallbackMiniGameItems = [
  ['Narkotika golongan I aman dicoba sekali selama tidak tiap hari', 'mitos', 'Mitos berbahaya. Satu kali pemakaian pun bisa jadi awal ketagihan atau overdosis.', 1],
  ['Overdosis heroin atau opioid bisa menghentikan napas hanya dalam beberapa menit', 'fakta', 'Fakta darurat. Inilah alasan bantuan cepat sangat penting.', 1],
  ['Istilah narkoba sering dipakai sebagai istilah umum yang mencakup narkotika, psikotropika, dan zat adiktif lain', 'fakta', 'Fakta. Materi ini tetap memberi penekanan pada narkotika.', 1],
  ['Sabu-sabu adalah zat penenang yang membuat tubuh rileks seperti obat tidur', 'mitos', 'Mitos. Sabu justru stimulan kuat yang merusak sistem saraf.', 1],
  ['Kalau melihat dugaan transaksi narkotika, langkah paling aman adalah menjauh lalu lapor ke guru, orang tua, satpam, atau polisi', 'fakta', 'Fakta. Menjaga jarak lebih aman daripada bertindak sendiri.', 2],
  ['Supaya dianggap berani, pelapor sebaiknya menghadang pelaku sendiri sebelum polisi datang', 'mitos', 'Mitos berisiko. Pelapor bukan petugas lapangan.', 2],
  ['Saat melapor, detail seperti lokasi, waktu, ciri pelaku, dan kendaraan sangat membantu polisi', 'fakta', 'Fakta. Informasi spesifik membuat tindak lanjut lebih cepat.', 2],
  ['Sebelum melapor, video kejadian sebaiknya langsung diviralkan dulu agar ramai', 'mitos', 'Mitos. Yang utama adalah keselamatan dan laporan resmi.', 2],
].map(([statement_text, correct_answer, explanation, round_number], index) => ({
  id: `mini-${index + 1}`,
  statement_text,
  correct_answer,
  explanation,
  round_number,
  order_number: index + 1,
  is_active: true,
}));

export const fallbackQuotes = [
  '"Masa depan kuat dimulai dari paham bahaya narkotika." 🌟',
  '"Berani menolak narkotika adalah bentuk menjaga diri." 💪',
  '"Ilmu yang benar bisa menyelamatkan keputusanmu." 🚀',
  '"Otakmu terlalu berharga untuk dirusak zat terlarang." 🧠',
];

export const fallbackRanks = [
  { min: 90, icon: '👑', label: 'LEGENDA', sub: 'Siaga Narkotika Tingkat Tertinggi!', badgeStart: '#FFE066', badgeEnd: '#FF8C42', badgeGlow: 'rgba(255, 184, 77, 0.38)' },
  { min: 75, icon: '🏆', label: 'GARDA', sub: 'Pelindung Anti-Narkotika!', badgeStart: '#6BCB77', badgeEnd: '#2FAE66', badgeGlow: 'rgba(47, 174, 102, 0.28)' },
  { min: 60, icon: '⭐', label: 'PEJUANG', sub: 'Pemahamanmu sudah kuat!', badgeStart: '#9B59FF', badgeEnd: '#6F42E8', badgeGlow: 'rgba(111, 66, 232, 0.28)' },
  { min: 40, icon: '📚', label: 'SIAGA', sub: 'Tinggal selangkah lagi makin tajam!', badgeStart: '#FFB45C', badgeEnd: '#FF8C42', badgeGlow: 'rgba(255, 140, 66, 0.28)' },
  { min: 0, icon: '💪', label: 'PEMULA BERANI', sub: 'Langkah awal yang sangat berarti!', badgeStart: '#FF6B7A', badgeEnd: '#FF4757', badgeGlow: 'rgba(255, 71, 87, 0.28)' },
];
