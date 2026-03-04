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
    text: "Kalau lagi buka aplikasi atau game baru yang keren banget, hal pertama yang bikin kamu penasaran adalah...",
    options: [
      { text: "Gimana ya cara orang nulis kode programnya sampai bisa selancar ini?", weights: { ti: 5, sd: 2 } },
      { text: "Wah, fitur-fiturnya gampang dipakai dan ngebantu banget nih!", weights: { si: 5, bd: 2 } },
      { text: "Keren, dari mana ya aplikasi ini dapat data dan bisa seakurat ini?", weights: { sd: 5, ti: 2 } },
      { text: "Gimana strategi mereka jualan dan narik banyak banget pengguna?", weights: { bd: 5, si: 2 } },
      { text: "Gimana ya cara aplikasi ini ngatur keuangannya biar tetap untung?", weights: { ak: 5 } }
    ]
  },
  {
    id: 2,
    text: "Bayangkan kamu ada di kepanitiaan event sekolah/kampus. Kamu paling suka kebagian tugas apa?",
    options: [
      { text: "Ngurusin website, sistem pendaftaran, atau hal-hal berbau IT.", weights: { ti: 5, si: 3 } },
      { text: "Mastiin komunikasi antara divisi IT dan lapangan berjalan lancar.", weights: { si: 5, bd: 2 } },
      { text: "Menganalisis data peserta buat tahu tren dan target promosi.", weights: { sd: 5, si: 2 } },
      { text: "Jadi bendahara dong! Ngatur budget, catat pengeluaran, dan pastiin uang aman.", weights: { ak: 5 } },
      { text: "Tim promosi dan kreatif! Mikirin cara bikin event-nya viral di sosmed.", weights: { bd: 5 } }
    ]
  },
  {
    id: 3,
    text: "Pas dengar kata 'Data', apa yang langsung terlintas di pikiranmu?",
    options: [
      { text: "Sesuatu yang harus diamankan dan diproses pakai bahasa pemrograman.", weights: { ti: 4, sd: 3 } },
      { text: "Informasi yang bisa diolah buat bikin keputusan organisasi yang lebih baik.", weights: { si: 4, bd: 3 } },
      { text: "Kumpulan angka raksasa yang bisa memprediksi masa depan kalau dianalisis.", weights: { sd: 5, ti: 2 } },
      { text: "Laporan keuangan, neraca, dan angka-angka yang harus 'balance'.", weights: { ak: 5 } },
      { text: "Aset penting buat bikin iklan yang tertarget dan strategi marketing jitu.", weights: { bd: 5, sd: 2 } }
    ]
  },
  {
    id: 4,
    text: "Teman-temanmu sering mengenal kamu sebagai orang yang...",
    options: [
      { text: "Si Paling Tekno: Sering dimintain tolong urusan gadget atau software.", weights: { ti: 5, si: 2 } },
      { text: "Si Paling Solutif: Pintar cari cara paling efisien buat nyelesaiin tugas kelompok.", weights: { si: 5, bd: 2 } },
      { text: "Si Paling Kritis: Gampang nemuin pola dan nggak gampang ketipu hoax.", weights: { sd: 5, ak: 2 } },
      { text: "Si Paling Teliti: Catatannya rapi, presisi, dan ingat banget soal detail.", weights: { ak: 5 } },
      { text: "Si Paling Up-to-date: Tahu tren terbaru dan jago banget ngomong/promosi.", weights: { bd: 5 } }
    ]
  },
  {
    id: 5,
    text: "Kalau disuruh memilih bacaan ringan di waktu luang, topik apa yang kamu pilih?",
    options: [
      { text: "Inovasi Kecerdasan Buatan (AI) dan Algoritma Masa Depan.", weights: { ti: 5, sd: 4 } },
      { text: "Rahasia Perusahaan Besar Menyelaraskan Teknologi dengan Kebutuhan Pasar.", weights: { si: 5, bd: 3 } },
      { text: "Seni Merapikan Keuangan dan Tips Investasi Pemula.", weights: { ak: 5 } },
      { text: "Kisah Sukses Startup dan Trik Jualan Laris Manis di Era Digital.", weights: { bd: 5, si: 2 } }
    ]
  },
  {
    id: 6,
    text: "Menurutmu, apa tantangan terbesar di dunia modern saat ini?",
    options: [
      { text: "Ancaman hacker dan pentingnya membangun sistem keamanan yang kuat.", weights: { ti: 5 } },
      { text: "Susahnya bikin teknologi yang benar-benar bisa dipakai mudah sama orang awam.", weights: { si: 5 } },
      { text: "Banyaknya data (big data) yang berserakan tapi belum dimanfaatkan maksimal.", weights: { sd: 5 } },
      { text: "Menjaga kejujuran dan transparansi dalam laporan keuangan.", weights: { ak: 5 } },
      { text: "Persaingan bisnis yang super ketat dan berubah tiap detik di internet.", weights: { bd: 5 } }
    ]
  },
  {
    id: 7,
    text: "Cara belajar yang paling asik dan masuk buat kamu adalah...",
    options: [
      { text: "Praktik langsung nyoba ngetik kode atau ngoprek sesuatu sampai bisa.", weights: { ti: 5 } },
      { text: "Bikin mind-map atau diagram biar kelihatan gambaran besarnya (big picture).", weights: { si: 5, sd: 2 } },
      { text: "Mencari pola dari kumpulan contoh kasus atau data historis.", weights: { sd: 5, ak: 2 } },
      { text: "Mengerjakan hitungan dengan runut, sistematis, dan sesuai aturan yang pasti.", weights: { ak: 5 } },
      { text: "Diskusi dan bedah kasus nyata tentang tren bisnis yang lagi viral.", weights: { bd: 5 } }
    ]
  },
  {
    id: 8,
    text: "Jika kamu punya perusahaan, masalah apa yang akan langsung kamu turun tangan memperbaikinya?",
    options: [
      { text: "Aplikasi atau website perusahaan yang sering error dan lemot.", weights: { ti: 5, si: 2 } },
      { text: "Sistem operasional karyawan yang masih manual dan berantakan.", weights: { si: 5, sd: 2 } },
      { text: "Keputusan penting yang diambil tanpa melihat data survei pasar.", weights: { sd: 5, si: 2 } },
      { text: "Pembukuan keuangan yang bocor atau tidak seimbang.", weights: { ak: 5 } },
      { text: "Penjualan yang menurun tajam gara-gara strategi marketing kurang oke.", weights: { bd: 5 } }
    ]
  },
  {
    id: 9,
    text: "Jika kamu menemukan sebuah teka-teki atau masalah yang rumit, pendekatan utamamu adalah:",
    options: [
      { text: "Membongkar sistemnya untuk melihat di mana letak kerusakannya.", weights: { ti: 5 } },
      { text: "Mengevaluasi alur kerjanya dan mencari cara menyederhanakannya.", weights: { si: 5 } },
      { text: "Mengumpulkan semua fakta dan angka yang ada dulu, baru ambil kesimpulan.", weights: { sd: 5, ak: 3 } },
      { text: "Membuat catatan sistematis untuk memastikan tidak ada detail yang terlewat.", weights: { ak: 5 } },
      { text: "Melihatnya sebagai tantangan untuk mencari celah atau ide baru.", weights: { bd: 5 } }
    ]
  },
  {
    id: 10,
    text: "Pekerjaan impianmu di masa depan akan membuatmu merasa sukses jika...",
    options: [
      { text: "Bisa menciptakan teknologi/software canggih yang dipakai jutaan orang.", weights: { ti: 5 } },
      { text: "Bisa meminim transformasi digital di sebuah perusahaan multinasional.", weights: { si: 5, bd: 2 } },
      { text: "Bisa memecahkan misteri besar menggunakan kekuatan AI dan data.", weights: { sd: 5, ti: 2 } },
      { text: "Bisa menjadi ahli keuangan terpercaya dengan integritas tinggi.", weights: { ak: 5 } },
      { text: "Bisa membangun startup atau bisnis digital sendiri yang terus berkembang.", weights: { bd: 5 } }
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