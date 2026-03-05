'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Printer, RefreshCcw, ArrowRight } from 'lucide-react';

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
    <div className="relative min-h-screen bg-mesh-vibrant flex flex-col items-center justify-center py-4 md:py-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <img 
            src="/img/logoitbs.webp" 
            alt="Logo ITB Swadharma" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain" 
          />
          <h3 className="text-sm font-headline font-bold tracking-[0.2em] uppercase text-white">ITB Swadharma</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1"
        >
          <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-white">
            Hai {userName}, Kamu <span className="text-primary italic">Cocok</span> di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] p-6 md:p-8 animate-border-rainbow h-full flex flex-col group shadow-2xl items-center text-center">
              <div 
                className="absolute -top-40 -right-40 w-[500px] h-[500px] blur-[120px] rounded-full opacity-15"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-5 w-full flex flex-col items-center justify-center">
                <div className="space-y-1">
                  <p className="text-xs font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight leading-none">{topMajor.name}</h2>
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl md:text-7xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                    <span className="text-2xl font-bold text-primary/50">%</span>
                  </div>
                  <span className="text-[10px] font-black text-primary/60 tracking-widest uppercase">Skor Kecocokan</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 max-w-md">
                  <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium italic">
                    {`“${topMajor.description}”`}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-3 no-print justify-center">
                  <Button 
                    size="lg" 
                    className="h-11 bg-primary text-background font-bold text-sm hover:scale-[1.02] transition-all px-6 rounded-lg group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-11 h-11 rounded-lg border-white/10 bg-white/5"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[1.75rem] p-6 md:p-8 shadow-xl border-none bg-black/40 backdrop-blur-sm">
              <CardContent className="p-0 flex flex-col h-full space-y-4">
                <h3 className="text-base font-headline font-bold text-center">Analisis Minat</h3>
                
                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -20, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={16}>
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
                    className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg h-9 px-4 transition-all text-xs font-bold" 
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
