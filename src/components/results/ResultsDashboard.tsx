'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCcw, ArrowRight } from 'lucide-react';

interface ResultItem {
  id: MajorId;
  name: string;
  percentage: number;
  color: string;
  accent: string;
  description: string;
}

interface ResultsDashboardProps {
  userName: string;
  results: ResultItem[];
  onRetake: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ userName, results, onRetake }) => {
  const topMajor = results[0];

  return (
    <div className="relative min-h-full flex flex-col items-center justify-center py-2 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 space-y-4">
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <img 
            src="/img/logoitbs.webp" 
            alt="Logo ITB Swadharma" 
            className="w-12 h-12 md:w-14 md:h-14 object-contain" 
          />
          <h3 className="text-[9px] font-headline font-bold tracking-[0.2em] uppercase text-primary">ITB Swadharma</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-lg md:text-xl font-headline font-bold tracking-tight text-white">
            Hai {userName}, Kamu <span className="text-primary italic">Cocok</span> di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] p-6 md:p-8 animate-border-rainbow h-full flex flex-col items-center text-center shadow-2xl bg-black/40 backdrop-blur-sm">
              <div 
                className="absolute -top-40 -right-40 w-[400px] h-[400px] blur-[100px] rounded-full opacity-10"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-3 w-full">
                <div className="space-y-1">
                  <p className="text-[8px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                  <h2 className="text-xl md:text-2xl font-headline font-bold text-white tracking-tight leading-none uppercase">{topMajor.name}</h2>
                </div>

                <div className="flex flex-col items-center py-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                    <span className="text-lg font-bold text-primary/50">%</span>
                  </div>
                  <span className="text-[7px] font-black text-primary/60 tracking-widest uppercase">Skor Kecocokan</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 max-w-xs">
                  <p className="text-[10px] md:text-xs text-white/90 leading-relaxed font-medium italic">
                    {`“${topMajor.description}”`}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 no-print justify-center">
                  <Button 
                    size="sm" 
                    className="bg-primary text-background font-bold text-[10px] hover:scale-[1.02] transition-all px-4 rounded-lg group shadow-lg"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-5"
          >
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[1.5rem] p-5 shadow-xl border-none bg-black/40 backdrop-blur-sm">
              <CardContent className="p-0 flex flex-col h-full space-y-3">
                <h3 className="text-[10px] font-headline font-bold text-center text-white/80 uppercase tracking-widest">Analisis Minat</h3>
                
                <div className="flex-1 min-h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: 0, right: 30, top: 10, bottom: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={110}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700 }}
                        tickFormatter={(value) => value.replace('Teknik Informatika', 'T. Informatika')}
                      />
                      <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={10}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center pt-2">
                  <Button 
                    variant="ghost" 
                    className="text-white/40 hover:text-white hover:bg-white/5 rounded-lg h-7 px-3 transition-all text-[9px] font-bold" 
                    onClick={onRetake}
                  >
                    <RefreshCcw className="w-3 h-3 mr-2" />
                    COBA LAGI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
