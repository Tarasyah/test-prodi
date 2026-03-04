export type MajorId = 'ti' | 'si' | 'sd' | 'ak' | 'bd';

export interface Major {
  id: MajorId;
  name: string;
  description: string;
  color: string;
  accent: string;
}

export const MAJORS: Record<MajorId, Major> = {
  ti: {
    id: 'ti',
    name: 'Teknik Informatika',
    description: 'Arsitek masa depan! Kamu akan mahir merancang perangkat lunak, mengembangkan AI, dan menjaga keamanan siber kelas dunia.',
    color: '#3b82f6', // Bright Blue
    accent: '#1e40af',
  },
  si: {
    id: 'si',
    name: 'Sistem Informasi',
    description: 'Sang inovator! Kamu akan menjadi jembatan yang mengintegrasikan teknologi informasi canggih dengan strategi bisnis yang efisien.',
    color: '#06b6d4', // Vibrant Cyan
    accent: '#0891b2',
  },
  sd: {
    id: 'sd',
    name: 'Sains Data',
    description: 'Detektif masa kini! Kamu akan mengolah big data menjadi wawasan berharga untuk memprediksi tren dan memecahkan masalah kompleks.',
    color: '#8b5cf6', // Electric Purple
    accent: '#6d28d9',
  },
  ak: {
    id: 'ak',
    name: 'Akuntansi',
    description: 'Pilar kepercayaan! Kamu akan memiliki keahlian finansial mendalam untuk menjaga integritas pelaporan keuangan dan audit profesional.',
    color: '#f59e0b', // Glowing Amber
    accent: '#d97706',
  },
  bd: {
    id: 'bd',
    name: 'Bisnis Digital',
    description: 'Pionir industri 4.0! Kamu siap menguasai ekosistem e-commerce, startup, dan strategi pemasaran digital yang revolusioner.',
    color: '#10b981', // Neon Emerald
    accent: '#059669',
  },
};

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    weights: Partial<Record<MajorId, number>>;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Bagaimana kondisi meja belajarmu atau kamar idealmu?",
    options: [
      { text: "Minimalis, hanya ada barang yang sedang dipakai biar fokus.", weights: { si: 5, ti: 2 } },
      { text: "Kelihatan berantakan buat orang lain, tapi aku tahu persis letak tiap barang.", weights: { sd: 5, ti: 3 } },
      { text: "Super rapi, semua barang punya tempat dan labelnya masing-masing.", weights: { ak: 5 } },
      { text: "Penuh dekorasi, dinamis, dan posisinya sering aku ubah-ubah biar nggak bosan.", weights: { bd: 5 } }
    ]
  },
  {
    id: 2,
    text: "Saat main game 'board game' (monopoli/werewolf) atau 'video game' baru, kamu biasanya...",
    options: [
      { text: "Baca buku panduan atau tutorialnya sampai paham betul sebelum main.", weights: { ak: 4, ti: 4 } },
      { text: "Langsung main aja, nanti juga paham triknya sambil jalan.", weights: { bd: 5, si: 2 } },
      { text: "Mengamati pola main lawan buat nyari kelemahan mereka.", weights: { sd: 5, bd: 2 } },
      { text: "Mastiin semua teman ngerti aturannya biar permainannya seru dan adil.", weights: { si: 5, ak: 2 } }
    ]
  },
  {
    id: 3,
    text: "Kalau kamu dikasih tugas kelompok dadakan, peran apa yang otomatis kamu ambil?",
    options: [
      { text: "Tukang cari bahan dan riset informasi paling lengkap.", weights: { sd: 5, ti: 2 } },
      { text: "Tukang ngatur jadwal, bagi tugas, dan ngerapiin format akhirnya.", weights: { si: 5, ak: 3 } },
      { text: "Tukang presentasi yang jago ngomong dan ngeyakinin dosen.", weights: { bd: 5 } },
      { text: "Eksekutor yang kerja di balik layar, asal jelas instruksinya apa.", weights: { ti: 5, ak: 2 } }
    ]
  },
  {
    id: 4,
    text: "Apa hal yang paling bikin kamu cepat 'bad mood'?",
    options: [
      { text: "Kerja dua kali gara-gara sistem atau aturannya nggak jelas.", weights: { si: 5, ti: 3 } },
      { text: "Orang yang ngambil keputusan cuma pakai insting tanpa bukti.", weights: { sd: 5, ak: 3 } },
      { text: "Hitungan yang nggak 'balance' atau ada detail kecil yang kelewat.", weights: { ak: 5 } },
      { text: "Birokrasi yang kaku dan nggak ngasih ruang buat kreativitas.", weights: { bd: 5, si: 2 } }
    ]
  },
  {
    id: 5,
    text: "Saat mau beli barang mahal (misal: HP atau laptop), proses berpikirmu adalah...",
    options: [
      { text: "Bandingin spesifikasi detailnya, nonton 10 video 'review' berbeda.", weights: { ti: 5, sd: 3 } },
      { text: "Cari tahu promo, 'cashback', atau nilai jual kembalinya nanti.", weights: { bd: 5, ak: 3 } },
      { text: "Bikin tabel perbandingan plus-minus di otak (atau di catatan).", weights: { ak: 5, sd: 2 } },
      { text: "Milih yang ekosistemnya paling nyambung sama gadgetku yang lain.", weights: { si: 5 } }
    ]
  },
  {
    id: 6,
    text: "Pilih kekuatan super (superpower) yang paling kamu inginkan:",
    options: [
      { text: "Bisa baca pikiran orang lain biar tahu apa yang mereka mau.", weights: { bd: 5 } },
      { text: "Bisa melihat persentase probabilitas masa depan dari setiap pilihan.", weights: { sd: 5, si: 2 } },
      { text: "Bisa mengendalikan dan ngobrol sama mesin atau elektronik.", weights: { ti: 5 } },
      { text: "Bisa menghentikan waktu sebentar buat ngerapiin segala kekacauan.", weights: { ak: 5, si: 2 } }
    ]
  },
  {
    id: 7,
    text: "Gaya kamu saat berdebat atau beda pendapat dengan teman:",
    options: [
      { text: "Ngasih fakta, angka, atau bukti kuat yang nggak bisa dibantah.", weights: { sd: 5, ak: 2 } },
      { text: "Nyari celah logika dari omongan dia yang nggak masuk akal.", weights: { ti: 5 } },
      { text: "Mencari jalan tengah biar kedua pihak sama-sama untung ('win-win').", weights: { si: 5, bd: 2 } },
      { text: "Pakai pesona, rayuan, dan pendekatan emosional biar dia luluh.", weights: { bd: 5 } }
    ]
  },
  {
    id: 8,
    text: "Saat menghadapi masalah atau jalan buntu, kamu biasanya...",
    options: [
      { text: "Mundur sebentar, menyendiri, lalu membongkar masalahnya dari nol.", weights: { ti: 5 } },
      { text: "Nanya pendapat orang lain atau cari referensi 'case' yang mirip.", weights: { si: 5, bd: 2 } },
      { text: "Mengecek ulang semua langkah sebelumnya, pasti ada pola yang terlewat.", weights: { sd: 5, ak: 2 } },
      { text: "Fokus ke rencana cadangan ('Plan B') dan meminimalisir kerugian.", weights: { ak: 5, bd: 2 } }
    ]
  },
  {
    id: 9,
    text: "Genre tontonan (film/series) favoritmu biasanya yang seperti apa?",
    options: [
      { text: "Misteri / Detektif yang bikin mikir keras nebak 'plot twist'.", weights: { sd: 5, ti: 2 } },
      { text: "Sci-Fi / Masa depan dengan teknologi-teknologi yang mindblowing.", weights: { ti: 5, si: 2 } },
      { text: "Kisah nyata tentang membangun kerajaan bisnis atau intrik perusahaan.", weights: { bd: 5, mn: 2 } }, // mn is replaced by sd in previous code, but mapped here for logic
      { text: "Dokumenter sejarah, biografi, atau sesuatu yang terstruktur rapi.", weights: { ak: 5 } }
    ]
  },
  {
    id: 10,
    text: "Kalau kamu dikasih 'budget' tak terbatas untuk liburan, kamu bakal...",
    options: [
      { text: "Bikin rute perjalanan yang super efisien biar semua tempat wisata kekunjungi.", weights: { si: 5, ti: 2 } },
      { text: "Nyobain pengalaman-pengalaman baru yang eksklusif dan 'trendsetter' banget.", weights: { bd: 5 } },
      { text: "Tetap mencatat pengeluaran harian dan cari penawaran nilai terbaik.", weights: { ak: 5 } },
      { text: "Eksplorasi tempat tersembunyi yang jarang didatangi turis biasa.", weights: { sd: 5 } }
    ]
  }
];

export const calculateResults = (answers: number[]) => {
  const scores: Record<MajorId, number> = { ti: 0, si: 0, sd: 0, ak: 0, bd: 0 };
  
  answers.forEach((optionIndex, questionIndex) => {
    const weights = QUIZ_QUESTIONS[questionIndex].options[optionIndex].weights;
    Object.entries(weights).forEach(([majorId, value]) => {
      scores[majorId as MajorId] += value || 0;
    });
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  const results = Object.entries(scores).map(([id, score]) => ({
    id: id as MajorId,
    name: MAJORS[id as MajorId].name,
    percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0,
    color: MAJORS[id as MajorId].color,
    accent: MAJORS[id as MajorId].accent,
    description: MAJORS[id as MajorId].description
  })).sort((a, b) => b.percentage - a.percentage);

  return results;
};