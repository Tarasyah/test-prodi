export type MajorId = 'ti' | 'si' | 'mn' | 'ak' | 'bd';

export interface Major {
  id: MajorId;
  name: string;
  description: string;
  color: string;
}

export const MAJORS: Record<MajorId, Major> = {
  ti: {
    id: 'ti',
    name: 'Teknik Informatika',
    description: 'Fokus pada pengembangan perangkat lunak, algoritma, dan keamanan siber.',
    color: '#3b82f6', // Modern Blue
  },
  si: {
    id: 'si',
    name: 'Sistem Informasi',
    description: 'Jembatan antara teknologi dan bisnis untuk mengelola data strategis.',
    color: '#06b6d4', // Cyan
  },
  mn: {
    id: 'mn',
    name: 'Manajemen',
    description: 'Mempelajari pengelolaan organisasi, strategi bisnis, dan kepemimpinan.',
    color: '#8b5cf6', // Violet
  },
  ak: {
    id: 'ak',
    name: 'Akuntansi',
    description: 'Keahlian dalam pelaporan keuangan, audit, dan perpajakan perusahaan.',
    color: '#f59e0b', // Amber
  },
  bd: {
    id: 'bd',
    name: 'Bisnis Digital',
    description: 'Menggabungkan strategi bisnis dengan teknologi pemasaran digital modern.',
    color: '#10b981', // Emerald
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
    text: "Manakah yang lebih menarik bagimu saat menggunakan aplikasi baru?",
    options: [
      { text: "Memahami logika di balik fitur-fiturnya", weights: { ti: 5, si: 3 } },
      { text: "Melihat bagaimana aplikasi itu membantu bisnis", weights: { mn: 4, bd: 4 } },
      { text: "Memastikan data keuangannya aman", weights: { ak: 5 } }
    ]
  },
  {
    id: 2,
    text: "Apa hobi yang paling menggambarkan dirimu?",
    options: [
      { text: "Memecahkan teka-teki rumit", weights: { ti: 5, ak: 2 } },
      { text: "Merencanakan acara atau proyek", weights: { mn: 5, si: 3 } },
      { text: "Menganalisis tren pasar atau media sosial", weights: { bd: 5, si: 2 } }
    ]
  },
  {
    id: 3,
    text: "Jika kamu mendirikan perusahaan, peran apa yang kamu pilih?",
    options: [
      { text: "Chief Technology Officer (CTO)", weights: { ti: 5, si: 3 } },
      { text: "Chief Executive Officer (CEO)", weights: { mn: 5, bd: 3 } },
      { text: "Chief Financial Officer (CFO)", weights: { ak: 5 } }
    ]
  },
  {
    id: 4,
    text: "Bagaimana caramu mengambil keputusan?",
    options: [
      { text: "Berdasarkan data dan statistik akurat", weights: { ak: 5, si: 4 } },
      { text: "Berdasarkan visi dan intuisi bisnis", weights: { mn: 5, bd: 4 } },
      { text: "Berdasarkan efisiensi teknis sistem", weights: { ti: 5 } }
    ]
  },
  {
    id: 5,
    text: "Apa yang membuatmu merasa puas setelah bekerja?",
    options: [
      { text: "Berhasil memperbaiki bug atau sistem error", weights: { ti: 5 } },
      { text: "Berhasil menyeimbangkan pembukuan keuangan", weights: { ak: 5 } },
      { text: "Berhasil meningkatkan penjualan digital", weights: { bd: 5, mn: 3 } }
    ]
  },
  {
    id: 6,
    text: "Manakah tantangan yang paling ingin kamu hadapi?",
    options: [
      { text: "Membangun kecerdasan buatan (AI)", weights: { ti: 5, si: 2 } },
      { text: "Mengelola tim besar untuk satu tujuan", weights: { mn: 5, si: 3 } },
      { text: "Menemukan pola dalam laporan keuangan", weights: { ak: 5 } }
    ]
  },
  {
    id: 7,
    text: "Bagaimana pendapatmu tentang 'Data'?",
    options: [
      { text: "Data adalah infrastruktur yang harus dibangun", weights: { ti: 5 } },
      { text: "Data adalah informasi strategis untuk manajemen", weights: { si: 5, mn: 3 } },
      { text: "Data adalah bukti transaksi yang valid", weights: { ak: 5 } }
    ]
  },
  {
    id: 8,
    text: "Pilihlah salah satu kata kunci yang paling mewakilimu:",
    options: [
      { text: "Inovasi", weights: { bd: 5, ti: 3 } },
      { text: "Integritas", weights: { ak: 5, mn: 2 } },
      { text: "Integrasi", weights: { si: 5, ti: 2 } }
    ]
  },
  {
    id: 9,
    text: "Apa yang kamu lakukan saat melihat proses yang lambat?",
    options: [
      { text: "Mencari cara otomatisasi lewat kode", weights: { ti: 5 } },
      { text: "Menata ulang alur kerja tim", weights: { mn: 5, si: 4 } },
      { text: "Mengevaluasi pengeluaran biayanya", weights: { ak: 5 } }
    ]
  },
  {
    id: 10,
    text: "Di mana kamu melihat dirimu 5 tahun ke depan?",
    options: [
      { text: "Menjadi Lead Developer di Tech Giant", weights: { ti: 5 } },
      { text: "Memiliki Startup Digital yang sukses", weights: { bd: 5, mn: 3 } },
      { text: "Menjadi Akuntan Publik atau Konsultan Pajak", weights: { ak: 5 } }
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
    description: MAJORS[id as MajorId].description
  })).sort((a, b) => b.percentage - a.percentage);

  return results;
};
