'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, Zap, Star } from 'lucide-react';
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
      link.download = `itb-swadharma-future-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      captureEl.style.display = 'none';
    }
  };

  return (
    <div className="relative min-h-screen bg-mesh-vibrant overflow-hidden flex flex-col items-center">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <img src="/logoitbs.webp" alt="Logo ITB Swadharma" className="w-16 h-16 object-contain" />
          <div className="space-y-0.5">
            <h3 className="text-[12px] font-black tracking-[0.4em] uppercase text-white">ITB Swadharma</h3>
            <p className="text-[9px] font-medium tracking-[0.2em] text-primary/60 uppercase">Neural Engine 2026</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl md:text-4xl font-headline font-bold tracking-tighter leading-tight text-white max-w-4xl mx-auto">
            Hi {userName}, Masa <span className="text-primary italic">Depanmu</span> Di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 animate-border-rainbow h-full flex flex-col group shadow-2xl items-center text-center">
              <div 
                className="absolute -top-40 -right-40 w-[500px] h-[500px] blur-[120px] rounded-full opacity-20"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-6 w-full flex flex-col items-center justify-center">
                <div className="space-y-3">
                  <p className="text-[9px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                  <h2 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter leading-tight">{topMajor.name}</h2>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl md:text-8xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                    <span className="text-2xl font-bold text-primary/40">%</span>
                  </div>
                  <span className="text-[9px] font-black text-primary/60 tracking-widest mt-2 uppercase">Skor Kecocokan Tertinggi</span>
                </div>

                <div className="p-6 rounded-[1.5rem] bg-white/[0.04] border border-white/10 max-w-xl">
                  <p className="text-lg text-white/90 leading-relaxed font-medium italic">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-3 no-print justify-center">
                  <Button 
                    size="lg" 
                    className="h-14 bg-primary text-background font-bold text-lg hover:scale-[1.02] transition-all px-8 rounded-xl group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-xl border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-xl border-white/10 bg-white/5"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-4"
          >
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[2.5rem] p-6 shadow-xl border-none bg-black/40 backdrop-blur-sm">
              <CardContent className="p-0 flex flex-col h-full space-y-6">
                <h3 className="text-lg font-headline font-bold text-center">Analisis Kecocokan</h3>
                
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -30, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={20}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl h-12 px-6 transition-all text-sm font-bold" 
                    onClick={onRetake}
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    COBA LAGI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* PREMIUM 4:5 Template for Download - Optimized Layout */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '80px 70px',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-15%', left: '0', right: '0', margin: 'auto', width: '1000px', height: '1000px', background: topMajor.color, borderRadius: '50%', filter: 'blur(250px)', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10, width: '100%' }}>
          {/* Header Branding */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="/logoitbs.webp" alt="Logo" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '3px', marginBottom: '2px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '13px', opacity: 0.5, letterSpacing: '5px' }}>NEURAL ENGINE 2026</div>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '50px', 
              fontSize: '15px', 
              fontWeight: '900', 
              color: topMajor.color, 
              border: `2px solid ${topMajor.color}`, 
              padding: '0 30px', 
              borderRadius: '15px',
              backgroundColor: `${topMajor.color}11`
            }}>
              OFFICIAL RESULT
            </div>
          </div>

          {/* Persona & Result Headline */}
          <div style={{ marginTop: '40px' }}>
            <div style={{ fontSize: '26px', opacity: 0.6, marginBottom: '15px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              POTENSI MASA DEPAN {userName}:
            </div>
            <div style={{ fontSize: '86px', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-3px', color: 'white' }}>
              {topMajor.name}
            </div>
          </div>

          {/* Main Visual: Score & Comparison */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '30px', 
            alignItems: 'center', 
            background: 'rgba(255,255,255,0.03)', 
            padding: '50px', 
            borderRadius: '40px', 
            border: '1px solid rgba(255,255,255,0.08)',
            margin: '30px 0' 
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{ fontSize: '180px', fontWeight: '900', color: topMajor.color, lineHeight: '0.8' }}>{topMajor.percentage}</div>
                <div style={{ fontSize: '50px', fontWeight: '900', color: topMajor.color, opacity: 0.5 }}>%</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: topMajor.color, letterSpacing: '4px', marginTop: '20px' }}>SKOR KECOCOKAN TERTINGGI</div>
            </div>
            
            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            
            {/* Comparison Mini Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', opacity: 0.4, letterSpacing: '2px', textAlign: 'center' }}>PERBANDINGAN MINAT LAIN:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {results.slice(1, 4).map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <div style={{ width: '200px', fontSize: '16px', fontWeight: '700', color: 'white', textAlign: 'left', opacity: 0.8 }}>{m.name}</div>
                    <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${m.percentage}%`, height: '100%', background: m.color }} />
                    </div>
                    <div style={{ width: '70px', fontSize: '16px', fontWeight: '900', color: m.color, textAlign: 'right' }}>{m.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div style={{ padding: '40px', background: `${topMajor.color}15`, borderRadius: '35px', border: `1px solid ${topMajor.color}22` }}>
            <div style={{ fontSize: '28px', lineHeight: '1.4', textAlign: 'center', fontStyle: 'italic', fontWeight: '500', color: 'white' }}>
              "{topMajor.description}"
            </div>
          </div>

          {/* Footer CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ 
              background: 'white', 
              color: '#020617', 
              padding: '18px 45px', 
              borderRadius: '16px', 
              fontSize: '24px', 
              fontWeight: '900', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              boxShadow: `0 15px 40px ${topMajor.color}33`
            }}>
              DAFTAR SEKARANG
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: topMajor.color, marginBottom: '4px' }}>pmb.swadharma.ac.id</div>
              <div style={{ fontSize: '14px', opacity: 0.4, fontWeight: '600' }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
