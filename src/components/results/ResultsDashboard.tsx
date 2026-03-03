'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultItem {
  id: MajorId;
  name: string;
  percentage: number;
  color: string;
  description: string;
}

interface ResultsDashboardProps {
  userName: string;
  results: ResultItem[];
  onRetake: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ userName, results, onRetake }) => {
  const topMajor = results[0];
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    
    // Temporarily show the capture-only div
    const captureEl = shareCardRef.current;
    captureEl.style.display = 'flex';
    
    const canvas = await html2canvas(captureEl, {
      backgroundColor: '#0a0a0a',
      scale: 3, // High quality
      useCORS: true,
      logging: false,
    });
    
    captureEl.style.display = 'none';

    const link = document.createElement('a');
    link.download = `itb-swadharma-${userName.toLowerCase()}-match.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  // Background Animation Colors
  const backgroundColors = [
    'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
    'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(245, 158, 11, 0.1))',
    'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Gradient Background */}
      <motion.div 
        animate={{ 
          background: backgroundColors,
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "linear" 
        }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Hasil Analisis <span className="text-primary">{userName}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Berdasarkan minat dan bakatmu, berikut adalah program studi yang paling sesuai untuk masa depanmu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl p-8 glass h-full border-primary/30 flex flex-col">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <GraduationCap className="w-32 h-32" />
              </div>
              
              <div className="relative z-10 flex-1 space-y-8">
                <div className="space-y-2">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase">Rekomendasi Utama</span>
                  <h2 className="text-4xl font-headline font-bold text-white">{topMajor.name}</h2>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-7xl font-headline font-bold text-primary">{topMajor.percentage}%</span>
                  <span className="text-xl text-muted-foreground mb-3">Kecocokan</span>
                </div>

                <p className="text-lg text-white/80 leading-relaxed border-l-4 border-primary pl-6 py-2">
                  {topMajor.description}
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 no-print">
                  <Button 
                    size="lg" 
                    className="bg-primary text-background font-bold text-lg hover:bg-primary/90 flex-1"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      Daftar Sekarang
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={handleDownload} title="Unduh Hasil">
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={handlePrint} title="Cetak Hasil">
                      <Printer className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" onClick={onRetake} title="Tes Ulang">
                      <RefreshCcw className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-background text-xs">S</div>
                  <span className="font-headline font-bold tracking-tight">ITB SWADHARMA</span>
                </div>
                <span className="text-xs text-muted-foreground italic">Update 2026 AI Engine</span>
              </div>
            </div>
          </motion.div>

          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="glass border-none overflow-hidden h-full flex flex-col">
              <CardContent className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-headline font-bold mb-8">Statistik Kecocokan</h3>
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={results} 
                      layout="vertical"
                      margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'white', fontSize: 12 }}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="glass p-2 px-3 border-white/20 rounded-lg">
                                <p className="text-sm font-bold">{payload[0].value}% Match</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="percentage" 
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      >
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-4">
                  <p className="text-sm text-muted-foreground italic">
                    Setiap program studi memiliki kurikulum yang dirancang untuk mendukung minat spesifikmu.
                  </p>
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary no-print" onClick={onRetake}>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Coba Tes Lagi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Other Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-12"
        >
          <h3 className="text-2xl font-headline font-bold mb-6 text-center">Pilihan Menarik Lainnya</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.slice(1, 5).map((major) => (
              <div key={major.id} className="glass p-5 rounded-xl border-white/5 hover:border-primary/30 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: major.color }}>{major.percentage}% Match</span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1">{major.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{major.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hidden 4:5 Template for Capture */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '80px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
          color: 'white',
          position: 'fixed',
          left: '-2000px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ margin: 'auto' }}>S</span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>ITB SWADHARMA</div>
              <div style={{ fontSize: '14px', opacity: 0.6 }}>MAJOR MATCHING ANALYSIS</div>
            </div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>2026 EDITION</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ fontSize: '32px', opacity: 0.7 }}>Hello, {userName}! My Future is...</div>
          <div style={{ fontSize: '96px', fontWeight: '800', lineHeight: 1.1, color: topMajor.color }}>
            {topMajor.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ fontSize: '120px', fontWeight: '800', color: 'white' }}>{topMajor.percentage}%</div>
            <div style={{ fontSize: '24px', maxWidth: '300px', opacity: 0.8 }}>Match Similarity with your Interest Profile</div>
          </div>
          <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '32px', border: `2px solid ${topMajor.color}33`, fontSize: '28px', lineHeight: 1.5 }}>
            "{topMajor.description}"
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>JOIN US NOW</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>pmb.swadharma.ac.id</div>
          </div>
          <div style={{ opacity: 0.5, fontSize: '16px', textAlign: 'right' }}>
            Generated on {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  );
};
