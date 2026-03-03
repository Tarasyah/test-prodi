
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId, Major } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, Share2 } from 'lucide-react';
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
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ userName, results }) => {
  const topMajor = results[0];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#121418',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = `itb-swadharma-result-${userName.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 space-y-12">
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
        {/* Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div ref={cardRef} className="relative overflow-hidden rounded-3xl p-8 glass h-full border-primary/30 flex flex-col">
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
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-background text-xs">S</div>
                <span className="font-headline font-bold tracking-tight">ITB SWADHARMA</span>
              </div>
              <span className="text-xs text-muted-foreground italic">Powered by Major Matcher AI</span>
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
                  * Angka di atas menunjukkan persentase relevansi antara preferensi pribadimu dengan kurikulum program studi di ITB Swadharma.
                </p>
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
                <span className="text-xs font-bold text-muted-foreground uppercase">{major.percentage}% Match</span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">{major.name}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{major.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
