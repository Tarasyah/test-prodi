export type MajorId = 'ti' | 'si' | 'mn' | 'ak' | 'bd';

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
    description: 'Menjadi arsitek masa depan melalui pengembangan perangkat lunak, AI, dan keamanan siber kelas dunia.',
    color: '#3b82f6', // Bright Blue
    accent: '#1e40af',
  },
  si: {
    id: 'si',
    name: 'Sistem Informasi',
    description: 'Mengintegrasikan teknologi informasi dengan strategi bisnis global untuk efisiensi maksimal.',
    color: '#06b6d4', // Vibrant Cyan
    accent: '#0891b2',
  },
  mn: {
    id: 'mn',
    name: 'Manajemen',
    description: 'Membentuk pemimpin masa depan dengan kemampuan manajemen strategis dan kepemimpinan visioner.',
    color: '#8b5cf6', // Electric Purple
    accent: '#6d28d9',
  },
  ak: {
    id: 'ak',
    name: 'Akuntansi',
    description: 'Keahlian finansial yang mendalam untuk integritas pelaporan keuangan dan audit profesional.',
    color: '#f59e0b', // Glowing Amber
    accent: '#d97706',
  },
  bd: {
    id: 'bd',
    name: 'Bisnis Digital',
    description: 'Menguasai ekosistem e-commerce dan strategi pemasaran digital untuk revolusi industri 4.0.',
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
    text: "Apa yang paling membuatmu tertarik saat melihat teknologi baru?",
    options: [
      { text: "Kode dan algoritma yang menjalankannya", weights: { ti: 5, si: 2 } },
      { text: "Manfaat ekonominya bagi perusahaan", weights: { mn: 4, bd: 4 } },
      { text: "Keakuratan data transaksinya", weights: { ak: 5 } }
    ]
  },
  {
    id: 2,
    text: "Pilih aktivitas luang yang paling kamu sukai:",
    options: [
      { text: "Mencoba software atau gadget baru", weights: { ti: 5, si: 3 } },
      { text: "Memimpin kelompok dalam sebuah kegiatan", weights: { mn: 5, bd: 2 } },
      { text: "Menabung dan merencanakan keuangan", weights: { ak: 5 } }
    ]
  },
  {
    id: 3,
    text: "Dalam tim proyek, kamu lebih suka menjadi orang yang...",
    options: [
      { text: "Membangun sistem atau platform", weights: { ti: 5, si: 3 } },
      { text: "Menentukan arah dan strategi tim", weights: { mn: 5, bd: 3 } },
      { text: "Mengelola anggaran dan detail biaya", weights: { ak: 5 } }
    ]
  },
  {
    id: 4,
    text: "Saat menghadapi masalah rumit, pendekatanmu adalah...",
    options: [
      { text: "Mencari data numerik dan bukti logis", weights: { ak: 5, si: 4 } },
      { text: "Mencari peluang inovasi baru", weights: { bd: 5, mn: 4 } },
      { text: "Membangun solusi teknis yang efisien", weights: { ti: 5 } }
    ]
  },
  {
    id: 5,
    text: "Prestasi apa yang paling membanggakan bagimu?",
    options: [
      { text: "Menyelesaikan tantangan logika yang sulit", weights: { ti: 5 } },
      { text: "Membantu sebuah bisnis berkembang pesat", weights: { bd: 5, mn: 4 } },
      { text: "Menjaga keteraturan dan akurasi tinggi", weights: { ak: 5, si: 2 } }
    ]
  },
  {
    id: 6,
    text: "Teknologi masa depan mana yang paling menantang?",
    options: [
      { text: "Kecerdasan Buatan dan Robotika", weights: { ti: 5 } },
      { text: "Manajemen Global dan Startup", weights: { mn: 5, bd: 3 } },
      { text: "Audit Digital dan Blockchain", weights: { ak: 5, si: 3 } }
    ]
  },
  {
    id: 7,
    text: "Apa pandanganmu tentang data di era sekarang?",
    options: [
      { text: "Bahan baku untuk membangun AI", weights: { ti: 5 } },
      { text: "Aset berharga untuk strategi perusahaan", weights: { si: 5, mn: 4 } },
      { text: "Bukti finansial yang harus dipertanggungjawabkan", weights: { ak: 5 } }
    ]
  },
  {
    id: 8,
    text: "Manakah nilai yang paling kamu junjung tinggi?",
    options: [
      { text: "Kecepatan dan Inovasi", weights: { bd: 5, ti: 3 } },
      { text: "Kejujuran dan Akurasi", weights: { ak: 5, mn: 2 } },
      { text: "Efisiensi dan Konektivitas", weights: { si: 5, ti: 2 } }
    ]
  },
  {
    id: 9,
    text: "Jika melihat toko online yang sukses, apa yang kamu analisis?",
    options: [
      { text: "Keamanan payment gateway-nya", weights: { ti: 5, ak: 2 } },
      { text: "User experience dan platform-nya", weights: { si: 5, bd: 3 } },
      { text: "Strategi branding dan marketingnya", weights: { bd: 5, mn: 3 } }
    ]
  },
  {
    id: 10,
    text: "Cita-citamu di masa depan adalah...",
    options: [
      { text: "Insinyur Software atau Data Scientist", weights: { ti: 5 } },
      { text: "CEO atau Digital Entrepreneur", weights: { bd: 5, mn: 5 } },
      { text: "Auditor atau Manajer Keuangan", weights: { ak: 5 } }
    ]
  }
];

export const calculateResults = (answers: number[]) => {
  const scores: Record<MajorId, number> = { ti: 0, si: 0, mn: 0, ak: 0, bd: 0 };
  
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