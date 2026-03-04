'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, Globe, Zap, Heart, Star } from 'lucide-react';
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

  const floatingElements = [
    { icon: <Zap className="w-10 h-10" />, x: "8%", y: "15%", delay: 0 },
    { icon: <Star className="w-6 h-6" />, x: "88%", y: "12%", delay: 1.5 },
    { icon: <Heart className="w-5 h-5" />, x: "82%", y: "85%", delay: 3 },
    { icon: <Sparkles className="w-8 h-8" />, x: "12%", y: "78%", delay: 0.8 },
  ];

  return (
    <div className="relative min-h-screen bg-mesh-vibrant overflow-hidden">
      {/* Floating Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 10 + i, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "easeInOut" 
          }}
          className="absolute z-0 text-primary/20 pointer-events-none will-change-transform"
          style={{ left: el.x, top: el.y }}
        >
          {el.icon}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-12 md:space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4" />
            Analysis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter leading-tight text-white max-w-4xl mx-auto">
            Hi {userName}, <br />
            Masa <span className="text-primary italic">Depanmu</span> Di Bidang:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[3rem] p-8 md:p-12 animate-border-rainbow h-full flex flex-col group shadow-2xl">
              <div 
                className="absolute -top-40 -right-40 w-[600px] h-[600px] blur-[150px] rounded-full opacity-30 transition-all duration-1000"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                    <h2 className="text-5xl md:text-6xl font-headline font-bold text-white tracking-tighter">{topMajor.name}</h2>
                  </div>
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{ backgroundColor: topMajor.color }}
                  >
                    <GraduationCap className="w-10 h-10 text-background" />
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-8xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                      <span className="text-3xl font-bold text-primary/40">%</span>
                    </div>
                    <span className="text-[10px] font-black text-primary/60 tracking-widest mt-2 uppercase">Skor Kecocokan Tertinggi</span>
                  </div>
                  <div className="h-20 w-px bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Match Score</p>
                    <p className="text-lg text-muted-foreground font-medium">Sinkronisasi Kognitif</p>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/[0.04] border border-white/10">
                  <p className="text-xl text-white/90 leading-relaxed font-medium">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap gap-4 no-print">
                  <Button 
                    size="lg" 
                    className="h-16 bg-primary text-background font-bold text-lg hover:scale-[1.02] transition-all px-10 rounded-2xl group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-3">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-16 h-16 rounded-2xl border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                    >
                      <Download className="w-6 h-6" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-16 h-16 rounded-2xl border-white/10 bg-white/5"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-6 h-6" />
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
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[3rem] p-6 shadow-xl">
              <CardContent className="p-6 flex flex-col h-full space-y-8">
                <h3 className="text-xl font-headline font-bold">Analisis Kecocokan</h3>
                
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -20, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={100}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={24}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex gap-4 items-center">
                  <Globe className="w-8 h-8 text-primary shrink-0" />
                  <p className="text-xs text-white/80 font-bold leading-relaxed">
                    Kurikulum Hybrid 2026 siap mengantarkanmu ke kancah global.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pivot Paths */}
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-primary">Alternatif Program</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {results.slice(1, 5).map((major) => (
              <div 
                key={major.id} 
                className="glass p-8 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all cursor-default"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5" style={{ color: major.color }}>{major.percentage}%</span>
                </div>
                <h4 className="font-headline font-bold text-lg text-white">{major.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8 no-print">
          <Button 
            variant="ghost" 
            className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl h-14 px-8 transition-all" 
            onClick={onRetake}
          >
            <RefreshCcw className="w-5 h-5 mr-3" />
            COBA LAGI
          </Button>
        </div>
      </div>

      {/* PREMIUM 4:5 Template for Download */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '80px',
          flexDirection: 'column',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '800px', height: '800px', background: topMajor.color, borderRadius: '50%', filter: 'blur(200px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <img src="/logoitbs.webp" alt="ITB Swadharma" style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '4px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '16px', opacity: 0.5, letterSpacing: '8px' }}>NEURAL ENGINE 2026</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', fontSize: '20px', fontWeight: '900', color: topMajor.color, border: `2px solid ${topMajor.color}`, padding: '0 30px', borderRadius: '20px' }}>OFFICIAL RESULT</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '-20px' }}>
            <div>
              <div style={{ fontSize: '32px', opacity: 0.6, marginBottom: '16px', fontWeight: '500' }}>POTENSI MASA DEPAN {userName.toUpperCase()}:</div>
              <div style={{ fontSize: '100px', fontWeight: '900', lineHeight: 1, letterSpacing: '-4px', color: 'white' }}>
                {topMajor.name}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '60px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '180px', fontWeight: '900', color: topMajor.color, lineHeight: 0.8 }}>{topMajor.percentage}%</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: topMajor.color, letterSpacing: '2px', marginTop: '15px' }}>SKOR KECOCOKAN TERTINGGI</div>
              </div>
              <div style={{ width: '2px', height: '150px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'white', opacity: 0.6 }}>PERBANDINGAN PRODI LAIN:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {results.slice(1, 4).map((m) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '120px', fontSize: '14px', fontWeight: '700', color: 'white' }}>{m.name}</div>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${m.percentage}%`, height: '100%', background: m.color }} />
                      </div>
                      <div style={{ width: '40px', fontSize: '14px', fontWeight: '900', color: m.color }}>{m.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '50px', background: `${topMajor.color}11`, borderRadius: '40px', border: `1px solid ${topMajor.color}33` }}>
              <div style={{ fontSize: '32px', lineHeight: 1.5, textAlign: 'center', fontStyle: 'italic', fontWeight: '500', color: 'white' }}>
                "{topMajor.description}"
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '18px', opacity: 0.4, fontWeight: '700' }}>SIAP MELANGKAH?</div>
              <div style={{ background: 'white', color: '#020617', padding: '15px 40px', borderRadius: '15px', fontSize: '32px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '15px' }}>
                DAFTAR SEKARANG <ArrowRight size={32} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: topMajor.color, marginBottom: '5px' }}>pmb.swadharma.ac.id</div>
              <div style={{ fontSize: '16px', opacity: 0.4 }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};