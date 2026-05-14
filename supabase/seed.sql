insert into game_settings (name) values ('default')
on conflict do nothing;

insert into chapters (title, description, emoji, order_number, is_active) values
('Mengenal Narkotika', 'Dasar pemahaman narkotika dan istilah narkoba.', '🧠', 1, true),
('Dampak & Hukum', 'Dampak kesehatan, sosial, ekonomi, dan hukum.', '⚖️', 2, true),
('Pencegahan & Penolakan', 'Cara menolak tekanan dan menjaga lingkungan sehat.', '🛡️', 3, true),
('Pelaporan ke Polisi', 'Langkah aman melapor dugaan narkotika.', '🚓', 4, true)
on conflict do nothing;

insert into questions (chapter_id, emoji, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, points, order_number)
select c.id, v.emoji, v.question_text, v.option_a, v.option_b, v.option_c, v.option_d, v.correct_option, v.explanation, 10, v.order_number
from (
  values
  (1, '💊', 'Apa pemahaman yang paling tepat tentang istilah narkotika dan narkoba?', 'Narkotika dan narkoba itu persis sama tanpa perbedaan', 'Narkotika adalah kelompok zat tertentu, sedangkan narkoba adalah istilah payung yang sering dipakai untuk narkotika, psikotropika, dan zat adiktif lain', 'Narkotika hanya berasal dari tanaman, narkoba hanya dari pabrik', 'Narkoba hanya sebutan untuk ganja dan sabu', 1, 'Materi ini menekankan narkotika sebagai fokus utama.', 1),
  (1, '🌿', 'Mengapa ganja berbahaya bila dipakai remaja walau sering disebut "alami"?', 'Karena rasanya pahit', 'Karena tetap termasuk narkotika dan bisa mengganggu perkembangan otak remaja', 'Karena hanya berbahaya bila dicampur kopi', 'Karena aman asal dipakai sedikit', 1, 'Label alami tidak membuatnya aman untuk otak remaja.', 2),
  (1, '🧪', 'Heroin termasuk jenis zat apa?', 'Narkotika opioid', 'Vitamin saraf', 'Minuman energi sintetis', 'Obat flu biasa', 0, 'Heroin adalah opioid yang menekan sistem saraf pusat.', 3),
  (1, '⚡', 'Sabu-sabu paling tepat digolongkan sebagai zat yang...', 'Merangsang sistem saraf dan memicu euforia kuat', 'Menenangkan otot seperti obat tidur', 'Mengobati kecemasan tanpa efek samping', 'Aman dipakai saat ujian agar fokus', 0, 'Sabu adalah stimulan kuat dan sangat berisiko.', 4),
  (2, '🧠', 'Bagian otak mana yang sangat terdampak sehingga pengguna sulit mengontrol keputusan?', 'Kulit kepala', 'Prefrontal cortex', 'Lobus telinga', 'Sumsum tulang', 1, 'Prefrontal cortex membantu menimbang risiko dan mengontrol dorongan.', 5),
  (2, '💉', 'Mengapa overdosis heroin atau opioid bisa membunuh cepat?', 'Karena membuat tubuh tertawa terus', 'Karena menghentikan sinyal pernapasan di otak', 'Karena langsung merontokkan tulang', 'Karena menjadikan darah manis', 1, 'Saat pusat napas ditekan, korban bisa berhenti bernapas dalam hitungan menit.', 6),
  (2, '⚖️', 'Seorang siswa tertangkap membawa ganja ke sekolah. Risiko terbesarnya adalah...', 'Hanya disuruh pulang lebih cepat', 'Tetap bisa berproses hukum dan merusak masa depan sekolahnya', 'Langsung bebas karena masih pelajar', 'Tidak ada konsekuensi jika jumlahnya kecil', 1, 'Status pelajar tidak membuat perbuatan itu otomatis aman.', 7),
  (2, '💸', 'Dampak sosial-ekonomi yang paling sering muncul pada penyalahgunaan narkotika adalah...', 'Nilai naik dan pergaulan makin sehat', 'Prestasi turun, relasi rusak, lalu muncul tekanan uang dan risiko kriminal', 'Tubuh makin kuat dan hemat uang', 'Tidak ada efek di keluarga', 1, 'Keluarga, sekolah, dan lingkungan ikut terkena efeknya.', 8),
  (3, '🛡️', 'Teman memaksa: "Coba sekali aja." Respons paling aman adalah...', 'Ikut sekali supaya tidak dibilang takut', 'Menolak tegas lalu menjauh dari situasi', 'Minta dikurangi dosisnya', 'Diam saja tapi tetap di tempat', 1, 'Jawaban singkat dan tegas lebih efektif daripada alasan panjang.', 9),
  (3, '🤝', 'Faktor protektif yang paling membantu remaja menolak narkotika adalah...', 'Punya uang banyak', 'Lingkungan positif dan komunikasi terbuka dengan keluarga/guru', 'Sering begadang bareng teman', 'Banyak followers media sosial', 1, 'Relasi yang sehat membantu remaja menghadapi tekanan.', 10),
  (3, '🚪', 'Kamu melihat teman membuka paket mencurigakan di toilet sekolah. Langkah awal terbaik adalah...', 'Mendekat dan memegang barangnya', 'Segera menjauh lalu lapor ke guru, satpam, atau wali kelas', 'Ikut mencoba agar tahu isinya', 'Diam saja supaya tidak ribut', 1, 'Tujuanmu adalah mengamankan diri dan mempercepat penanganan.', 11),
  (3, '🧩', 'Pernyataan mana yang paling benar tentang kalimat "sekali coba tidak apa-apa"?', 'Benar, kalau mental kuat pasti aman', 'Benar, asal bareng teman dekat', 'Salah, karena sekali coba pun bisa jadi pintu ketagihan atau overdosis', 'Benar, kalau tidak sering', 2, 'Banyak penyalahgunaan dimulai dari rasa ingin tahu sekali.', 12),
  (4, '📞', 'Jika ada dugaan transaksi atau ancaman terkait narkotika, nomor bantuan polisi yang paling tepat diingat adalah...', '119', '110', '112', '113', 1, 'Nomor 110 digunakan untuk layanan kepolisian.', 13),
  (4, '📍', 'Informasi apa yang paling membantu saat melapor ke polisi?', 'Cerita yang panjang tanpa inti', 'Komentar teman-teman di grup', 'Lokasi, waktu kejadian, ciri orang, kendaraan, dan apa yang terlihat', 'Jumlah followers yang melihat kejadian', 2, 'Laporan yang jelas dan ringkas membantu petugas bergerak cepat.', 14),
  (4, '🚫', 'Saat melihat dugaan transaksi narkotika dari jauh, apa yang tidak boleh dilakukan?', 'Menghadang pelaku sendirian demi terlihat berani', 'Menjauh ke tempat aman', 'Mencatat ciri penting dari jarak aman', 'Melapor ke orang dewasa atau polisi', 0, 'Konfrontasi sendirian sangat berbahaya.', 15),
  (4, '🧾', 'Setelah laporan diterima polisi, sikap paling tepat dari pelapor adalah...', 'Menyebar rumor ke media sosial', 'Mengubah-ubah cerita agar terdengar dramatis', 'Tetap jujur, siap memberi keterangan yang konsisten, dan tidak mengganggu proses', 'Mendatangi pelaku untuk minta klarifikasi sendiri', 2, 'Laporan yang baik didukung keterangan yang jujur dan konsisten.', 16)
) as v(chapter_order, emoji, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, order_number)
join chapters c on c.order_number = v.chapter_order
on conflict do nothing;

insert into mini_game_items (round_number, statement_text, correct_answer, explanation, order_number) values
(1, 'Narkotika golongan I aman dicoba sekali selama tidak tiap hari', 'mitos', 'Mitos berbahaya. Satu kali pemakaian pun bisa jadi awal ketagihan atau overdosis.', 1),
(1, 'Overdosis heroin atau opioid bisa menghentikan napas hanya dalam beberapa menit', 'fakta', 'Fakta darurat. Inilah alasan bantuan cepat sangat penting.', 2),
(1, 'Istilah narkoba sering dipakai sebagai istilah umum yang mencakup narkotika, psikotropika, dan zat adiktif lain', 'fakta', 'Fakta. Materi ini tetap memberi penekanan pada narkotika.', 3),
(1, 'Sabu-sabu adalah zat penenang yang membuat tubuh rileks seperti obat tidur', 'mitos', 'Mitos. Sabu justru stimulan kuat yang merusak sistem saraf.', 4),
(2, 'Kalau melihat dugaan transaksi narkotika, langkah paling aman adalah menjauh lalu lapor ke guru, orang tua, satpam, atau polisi', 'fakta', 'Fakta. Menjaga jarak lebih aman daripada bertindak sendiri.', 5),
(2, 'Supaya dianggap berani, pelapor sebaiknya menghadang pelaku sendiri sebelum polisi datang', 'mitos', 'Mitos berisiko. Pelapor bukan petugas lapangan.', 6),
(2, 'Saat melapor, detail seperti lokasi, waktu, ciri pelaku, dan kendaraan sangat membantu polisi', 'fakta', 'Fakta. Informasi spesifik membuat tindak lanjut lebih cepat.', 7),
(2, 'Sebelum melapor, video kejadian sebaiknya langsung diviralkan dulu agar ramai', 'mitos', 'Mitos. Yang utama adalah keselamatan dan laporan resmi.', 8)
on conflict do nothing;
