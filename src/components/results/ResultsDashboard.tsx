'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, Zap, Heart, Star } from 'lucide-react';
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
            opacity: [0.1, 0.2, 0.1],
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 md:py-12 space-y-8">
        {/* Logo Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <img src="/logoitbs.webp" alt="Logo ITB Swadharma" className="w-16 h-16 object-contain" />
          <div className="space-y-1">
            <h3 className="text-sm font-black tracking-[0.4em] uppercase text-white">ITB Swadharma</h3>
            <p className="text-[10px] font-medium tracking-[0.2em] text-primary/60 uppercase">Neural Engine 2026</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4" />
            Analysis Complete
          </div>
          <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tighter leading-tight text-white max-w-4xl mx-auto">
            Hi {userName}, Masa <span className="text-primary italic">Depanmu</span> Di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[3rem] p-8 md:p-10 animate-border-rainbow h-full flex flex-col group shadow-2xl">
              <div 
                className="absolute -top-40 -right-40 w-[600px] h-[600px] blur-[150px] rounded-full opacity-20"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-white tracking-tighter">{topMajor.name}</h2>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{ backgroundColor: topMajor.color }}
                  >
                    <GraduationCap className="w-8 h-8 text-background" />
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl md:text-8xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                      <span className="text-2xl font-bold text-primary/40">%</span>
                    </div>
                    <span className="text-[10px] font-black text-primary/60 tracking-widest mt-2 uppercase">Skor Kecocokan</span>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Match Score</p>
                    <p className="text-base text-muted-foreground font-medium">Sinkronisasi Kognitif</p>
                  </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-white/[0.04] border border-white/10">
                  <p className="text-lg text-white/90 leading-relaxed font-medium">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 no-print">
                  <Button 
                    size="lg" 
                    className="h-14 bg-primary text-background font-bold text-lg hover:scale-[1.02] transition-all px-8 rounded-2xl group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-3">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-2xl border-white/10 bg-white/5"
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
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[3rem] p-4 shadow-xl">
              <CardContent className="p-4 flex flex-col h-full space-y-6">
                <h3 className="text-lg font-headline font-bold">Analisis Kecocokan</h3>
                
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
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Alternatives */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <h3 className="text-[10px] font-black tracking-[0.6em] uppercase text-primary">Alternatif Program</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.slice(1, 5).map((major) => (
              <div 
                key={major.id} 
                className="glass p-6 rounded-[2rem] border-white/5"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5" style={{ color: major.color }}>{major.percentage}%</span>
                </div>
                <h4 className="font-headline font-bold text-base text-white">{major.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4 no-print">
          <Button 
            variant="ghost" 
            className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl h-12 px-8 transition-all" 
            onClick={onRetake}
          >
            <RefreshCcw className="w-4 h-4 mr-3" />
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
          padding: '100px 80px',
          flexDirection: 'column',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '900px', height: '900px', background: topMajor.color, borderRadius: '50%', filter: 'blur(220px)', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <img src="/logoitbs.webp" alt="Logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '3px', marginBottom: '4px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '14px', opacity: 0.5, letterSpacing: '6px' }}>NEURAL ENGINE 2026</div>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '54px', 
              fontSize: '18px', 
              fontWeight: '900', 
              color: topMajor.color, 
              border: `2.5px solid ${topMajor.color}`, 
              padding: '0 35px', 
              borderRadius: '18px',
              backgroundColor: `${topMajor.color}11`
            }}>
              OFFICIAL RESULT
            </div>
          </div>

          {/* Potential Title */}
          <div style={{ marginTop: '80px' }}>
            <div style={{ fontSize: '28px', opacity: 0.6, marginBottom: '20px', fontWeight: '600', letterSpacing: '1px' }}>
              POTENSI MASA DEPAN {userName.toUpperCase()}:
            </div>
            <div style={{ fontSize: '110px', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-4px', color: 'white' }}>
              {topMajor.name}
            </div>
          </div>

          {/* Main Score Area */}
          <div style={{ display: 'flex', gap: '50px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '60px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.08)', margin: '40px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '350px' }}>
              <div style={{ fontSize: '200px', fontWeight: '900', color: topMajor.color, lineHeight: '0.8' }}>{topMajor.percentage}%</div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: topMajor.color, letterSpacing: '2.5px', marginTop: '30px' }}>SKOR KECOCOKAN TERTINGGI</div>
            </div>
            
            <div style={{ width: '2px', height: '220px', background: 'rgba(255,255,255,0.1)' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'white', opacity: 0.6, letterSpacing: '1px' }}>PERBANDINGAN PRODI LAIN:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {results.slice(1, 4).map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '130px', fontSize: '15px', fontWeight: '700', color: 'white' }}>{m.name}</div>
                    <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${m.percentage}%`, height: '100%', background: m.color }} />
                    </div>
                    <div style={{ width: '50px', fontSize: '15px', fontWeight: '900', color: m.color, textAlign: 'right' }}>{m.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div style={{ padding: '50px', background: `${topMajor.color}15`, borderRadius: '45px', border: `1px solid ${topMajor.color}33` }}>
            <div style={{ fontSize: '30px', lineHeight: '1.5', textAlign: 'center', fontStyle: 'italic', fontWeight: '500', color: 'white' }}>
              "{topMajor.description}"
            </div>
          </div>

          {/* Footer Area */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '60px', borderTop: '2px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ fontSize: '16px', opacity: 0.5, fontWeight: '700', letterSpacing: '1.5px' }}>SIAP MELANGKAH?</div>
              <div style={{ 
                background: 'white', 
                color: '#020617', 
                padding: '18px 45px', 
                borderRadius: '18px', 
                fontSize: '30px', 
                fontWeight: '900', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                boxShadow: `0 15px 40px ${topMajor.color}33`
              }}>
                DAFTAR SEKARANG <ArrowRight size={32} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: topMajor.color, marginBottom: '6px' }}>pmb.swadharma.ac.id</div>
              <div style={{ fontSize: '15px', opacity: 0.4, fontWeight: '600' }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
