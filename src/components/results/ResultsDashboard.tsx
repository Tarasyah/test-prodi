'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Download, Printer, RefreshCcw, ArrowRight } from 'lucide-react';
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
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    
    const captureEl = shareCardRef.current;
    captureEl.style.display = 'flex';
    
    try {
      const canvas = await html2canvas(captureEl, {
        backgroundColor: '#020617',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `itb-swadharma-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      captureEl.style.display = 'none';
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-2rem)] bg-mesh-vibrant flex flex-col items-center justify-center py-2 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 space-y-3">
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <img 
            src="/logoitbs.webp" 
            alt="Logo ITB Swadharma" 
            className="w-12 h-12 object-contain" 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <h3 className="text-[9px] font-black tracking-[0.3em] uppercase text-white">ITB Swadharma</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-0.5"
        >
          <h1 className="text-lg md:text-xl font-headline font-bold tracking-tight text-white">
            Hai {userName}, Kamu <span className="text-primary italic">Cocok</span> di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.25rem] p-5 animate-border-rainbow h-full flex flex-col group shadow-2xl items-center text-center">
              <div 
                className="absolute -top-40 -right-40 w-[400px] h-[400px] blur-[100px] rounded-full opacity-10"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-3 w-full flex flex-col items-center justify-center">
                <div className="space-y-0.5">
                  <p className="text-[7px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                  <h2 className="text-xl md:text-2xl font-headline font-bold text-white tracking-tight leading-none">{topMajor.name}</h2>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-4xl md:text-5xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                    <span className="text-sm font-bold text-primary/40">%</span>
                  </div>
                  <span className="text-[6px] font-black text-primary/60 tracking-widest uppercase">Skor Kecocokan</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 max-w-sm">
                  <p className="text-[10px] md:text-xs text-white/90 leading-relaxed font-medium italic">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 no-print justify-center">
                  <Button 
                    size="sm" 
                    className="h-8 bg-primary text-background font-bold text-[10px] hover:scale-[1.02] transition-all px-4 rounded-lg group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-1.5 w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-1.5">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-8 h-8 rounded-lg border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-8 h-8 rounded-lg border-white/10 bg-white/5"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-3.5 h-3.5" />
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
            className="md:col-span-5"
          >
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[1.25rem] p-4 shadow-xl border-none bg-black/40 backdrop-blur-sm">
              <CardContent className="p-0 flex flex-col h-full space-y-2">
                <h3 className="text-xs font-headline font-bold text-center">Analisis Minat</h3>
                
                <div className="flex-1 min-h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -35, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={90}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 7, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={10}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center pt-1">
                  <Button 
                    variant="ghost" 
                    className="text-white/40 hover:text-white hover:bg-white/5 rounded-lg h-7 px-3 transition-all text-[8px] font-bold" 
                    onClick={onRetake}
                  >
                    <RefreshCcw className="w-2.5 h-2.5 mr-1.5" />
                    COBA LAGI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* PREMIUM 4:5 Template for Download - Optimized & Centered */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '80px',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', width: '800px', height: '800px', background: topMajor.color, borderRadius: '50%', filter: 'blur(300px)', opacity: 0.1 }} />
        
        {/* Header Logo & Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="/logoitbs.webp" alt="Logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '2px' }}>ITB SWADHARMA</div>
            </div>
          </div>
          <div style={{ 
            backgroundColor: `${topMajor.color}22`, 
            border: `2px solid ${topMajor.color}88`, 
            color: topMajor.color, 
            padding: '12px 30px', 
            borderRadius: '16px', 
            fontSize: '16px', 
            fontWeight: '900',
            letterSpacing: '2px'
          }}>
            OFFICIAL RESULT
          </div>
        </div>

        {/* Headline */}
        <div style={{ marginTop: '140px', position: 'relative', zIndex: 10 }}>
          <div style={{ fontSize: '28px', opacity: 0.6, fontWeight: '700', marginBottom: '20px', letterSpacing: '4px' }}>
            POTENSI MASA DEPAN {userName.toUpperCase()}:
          </div>
          <div style={{ fontSize: '100px', fontWeight: '900', color: 'white', lineHeight: '1.1', textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            {topMajor.name.toUpperCase()}
          </div>
        </div>

        {/* Score Circle */}
        <div style={{ marginTop: '80px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: '240px', fontWeight: '900', color: topMajor.color, lineHeight: '0.8' }}>{topMajor.percentage}</div>
            <div style={{ fontSize: '60px', fontWeight: '900', color: topMajor.color, opacity: 0.5 }}>%</div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: topMajor.color, letterSpacing: '8px', marginTop: '20px' }}>
            SKOR KECOCOKAN TERTINGGI
          </div>
        </div>

        {/* Comparison Charts */}
        <div style={{ marginTop: '100px', width: '100%', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '80%' }}>
            {results.slice(1, 4).map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div style={{ width: '250px', fontSize: '20px', fontWeight: '700', opacity: 0.6, textAlign: 'left' }}>{m.name}</div>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${m.percentage}%`, height: '100%', backgroundColor: m.color }} />
                </div>
                <div style={{ width: '80px', fontSize: '22px', fontWeight: '900', color: m.color, textAlign: 'right' }}>{m.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ position: 'absolute', bottom: '80px', width: 'calc(100% - 160px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ 
            backgroundColor: 'white', 
            color: '#020617', 
            padding: '24px 60px', 
            borderRadius: '20px', 
            fontSize: '28px', 
            fontWeight: '900',
            boxShadow: '0 20px 50px rgba(255,255,255,0.1)'
          }}>
            DAFTAR SEKARANG
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: topMajor.color }}>pmb.swadharma.ac.id</div>
            <div style={{ fontSize: '14px', opacity: 0.4, marginTop: '5px' }}>© 2026 ITB SWADHARMA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
