'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCcw, ArrowRight, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

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
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (downloadRef.current) {
      const canvas = await html2canvas(downloadRef.current, {
        scale: 2,
        backgroundColor: '#020617',
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `Hasil-Matcher-${userName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    className="border-white/20 hover:bg-white/5 text-[10px] font-bold rounded-lg h-8"
                  >
                    <Download className="w-3 h-3 mr-2" />
                    SIMPAN
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
                    <BarChart data={results} layout="vertical" margin={{ left: -10, right: 30, top: 10, bottom: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={90}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700 }}
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

      {/* Hidden Download Template (4:5 Aspect Ratio) */}
      <div className="fixed left-[-9999px] top-0 no-print">
        <div 
          ref={downloadRef}
          style={{ width: '1080px', height: '1350px' }}
          className="bg-slate-950 flex flex-col p-16 relative overflow-hidden text-center"
        >
          {/* Graphic Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/15 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Header */}
          <div className="relative z-10 flex justify-between items-center mb-16 px-4">
            <div className="flex items-center gap-6 text-left">
              <img src="/img/logoitbs.webp" alt="Logo" className="w-24 h-24 object-contain" />
              <div>
                <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">ITB SWADHARMA</h4>
                <p className="text-sm font-bold text-primary tracking-[0.3em] uppercase">Major Matcher Report</p>
              </div>
            </div>
            <div className="bg-primary/10 border border-primary/30 px-8 py-3 rounded-full flex items-center justify-center">
              <span className="text-sm font-black text-primary tracking-widest uppercase">OFFICIAL RESULT</span>
            </div>
          </div>

          {/* User & Title */}
          <div className="relative z-10 mt-10">
            <h5 className="text-xl font-black text-white/40 tracking-[0.5em] mb-4 uppercase">POTENSI MASA DEPAN {userName.toUpperCase()}:</h5>
            <h1 className="text-8xl font-black text-white leading-none tracking-tighter uppercase mb-8 max-w-[900px] mx-auto">
              {topMajor.name}
            </h1>
          </div>

          {/* Score Section */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1">
            <div className="relative">
               <div className="absolute inset-0 bg-primary blur-[60px] opacity-20" />
               <div className="relative flex items-baseline gap-2">
                 <span className="text-[16rem] font-black text-primary leading-none">{topMajor.percentage}</span>
                 <span className="text-7xl font-black text-primary/50">%</span>
               </div>
            </div>
            <p className="text-xl font-black text-primary/60 tracking-[0.4em] uppercase -mt-4">SKOR KECOCOKAN TERTINGGI</p>
            
            {/* Comparison Mini Chart */}
            <div className="mt-16 w-full max-w-xl space-y-6">
               {results.slice(1, 4).map((res, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between text-sm font-black text-white/60 uppercase tracking-widest">
                     <span>{res.name}</span>
                     <span>{res.percentage}%</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-white/20" style={{ width: `${res.percentage}%` }} />
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="relative z-10 mt-auto flex justify-between items-end border-t border-white/10 pt-12">
            <div className="text-left space-y-4">
              <div className="bg-white text-slate-950 px-10 py-5 rounded-2xl inline-block shadow-2xl">
                <span className="text-xl font-black tracking-widest">DAFTAR SEKARANG</span>
              </div>
              <p className="text-sm font-bold text-white/30 tracking-[0.2em] ml-2">pmb.swadharma.ac.id</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-white/20 tracking-[0.2em] uppercase max-w-[250px]">
                HASIL ANALISIS RESMI INSTITUT TEKNOLOGI DAN BISNIS SWADHARMA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
