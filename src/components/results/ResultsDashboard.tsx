'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, ShieldCheck, Globe, Zap, Heart, Star } from 'lucide-react';
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
        scale: 3, // High resolution for social media
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
    { icon: <Zap className="w-8 h-8" />, x: "10%", y: "20%", delay: 0 },
    { icon: <Star className="w-6 h-6" />, x: "85%", y: "15%", delay: 1 },
    { icon: <Heart className="w-5 h-5" />, x: "75%", y: "80%", delay: 2 },
    { icon: <Sparkles className="w-7 h-7" />, x: "15%", y: "75%", delay: 0.5 },
  ];

  return (
    <div className="relative min-h-screen bg-mesh-vibrant overflow-hidden">
      {/* Floating Decorative Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "easeInOut" 
          }}
          className="absolute z-0 text-primary/20 pointer-events-none"
          style={{ left: el.x, top: el.y }}
        >
          {el.icon}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-primary/30 text-primary text-sm font-black uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Analysis Engine Complete
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
            Hi {userName}, <br />
            Masa <span className="text-primary italic">Depanmu</span> Adalah:
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Algoritma AI kami telah memetakan jalur karirmu. Potensi terkuatmu bersinar di bidang <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-8">{topMajor.name}</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 h-full"
          >
            <div className="relative overflow-hidden rounded-[3rem] p-12 glass h-full border-white/10 flex flex-col group">
              {/* Dynamic Glow Background */}
              <div 
                className="absolute -top-40 -right-40 w-[600px] h-[600px] blur-[160px] rounded-full opacity-40 transition-all duration-1000 group-hover:scale-125"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-xs font-black tracking-[0.4em] text-primary uppercase">Main Future Path</p>
                    <h2 className="text-6xl md:text-7xl font-headline font-bold text-white tracking-tighter">{topMajor.name}</h2>
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl relative"
                    style={{ backgroundColor: topMajor.color }}
                  >
                    <GraduationCap className="w-12 h-12 text-background z-10" />
                    <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl animate-pulse" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-9xl font-headline font-bold text-primary"
                    >
                      {topMajor.percentage}
                    </motion.span>
                    <span className="text-4xl font-bold text-primary/40">%</span>
                  </div>
                  <div className="h-24 w-px bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-sm text-white/60 font-black uppercase tracking-[0.2em]">Match Score</p>
                    <p className="text-lg text-muted-foreground font-medium leading-tight">
                      Kecocokan Profil <br />Psikometrik Digital
                    </p>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-8 rounded-[2rem] bg-white/[0.04] border border-white/10 relative overflow-hidden"
                >
                  <p className="text-2xl text-white/90 leading-relaxed italic font-medium relative z-10">
                    "{topMajor.description}"
                  </p>
                  <div className="absolute top-4 left-4 text-primary/10 font-serif text-8xl leading-none">"</div>
                </motion.div>

                <div className="pt-6 flex flex-wrap gap-6 no-print">
                  <Button 
                    size="lg" 
                    className="h-16 bg-primary text-background font-black text-xl hover:scale-105 transition-all px-12 rounded-2xl shadow-2xl shadow-primary/30"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-3 w-7 h-7" />
                    </a>
                  </Button>
                  <div className="flex gap-4">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-16 h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/30"
                      onClick={handleDownload}
                      title="Unduh Hasil 4:5"
                    >
                      <Download className="w-7 h-7" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-16 h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/15"
                      onClick={() => window.print()}
                      title="Cetak Laporan"
                    >
                      <Printer className="w-7 h-7" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      onClick={onRetake}
                      title="Tes Ulang"
                    >
                      <RefreshCcw className="w-7 h-7" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 flex justify-between items-end text-white/30">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-2xl border border-primary/20">S</div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1">Official Results From</p>
                    <p className="text-xl font-headline font-bold text-white/80 tracking-wide">ITB SWADHARMA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1">Analysis ID</p>
                  <p className="text-xl font-headline font-bold text-white/80 tracking-wide">SWD-2026-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Alternates */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <Card className="glass border-white/10 overflow-hidden flex-1 rounded-[3rem] p-4">
              <CardContent className="p-8 flex flex-col h-full space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-headline font-bold">Data Analysis</h3>
                  <Zap className="w-6 h-6 text-primary animate-pulse" />
                </div>
                
                <div className="flex-1 min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -10, right: 40 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={130}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 12, 12, 0]} barSize={32}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-[2rem] bg-primary/10 border border-primary/20 flex gap-5 items-center">
                  <Globe className="w-10 h-10 text-primary shrink-0" />
                  <p className="text-sm text-primary-foreground font-bold leading-relaxed">
                    Kurikulum 2026 kami memastikan kamu siap bersaing di level internasional.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Career Alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-white/10" />
            <h3 className="text-xs font-black tracking-[0.5em] uppercase text-primary">Secondary Career Paths</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.slice(1, 5).map((major, i) => (
              <motion.div 
                key={major.id} 
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group cursor-default relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: major.color }} />
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-white/5 border border-white/10" style={{ color: major.color }}>{major.percentage}% Match</span>
                </div>
                <h4 className="font-headline font-bold text-xl text-white group-hover:text-primary transition-colors">{major.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center pt-12 no-print">
          <Button 
            variant="ghost" 
            size="lg"
            className="text-white/40 hover:text-white hover:bg-white/5 rounded-2xl h-14 px-8" 
            onClick={onRetake}
          >
            <RefreshCcw className="w-5 h-5 mr-3" />
            Ulangi Analisis dari Awal
          </Button>
        </div>
      </div>

      {/* PREMIUM 4:5 Template for Download - 1080x1350 */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '120px',
          flexDirection: 'column',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        {/* Layered Background Design */}
        <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '800px', height: '800px', background: topMajor.color, borderRadius: '50%', filter: 'blur(200px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(180px)', opacity: 0.15 }} />
        
        {/* Tech Grid Pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '60px 60px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Brand Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ width: '100px', height: '100px', background: topMajor.color, borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '900', color: '#020617', boxShadow: `0 30px 60px ${topMajor.color}44` }}>S</div>
              <div>
                <div style={{ fontSize: '38px', fontWeight: '800', letterSpacing: '6px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '18px', opacity: 0.6, letterSpacing: '10px' }}>FUTURE ENGINE v2.0</div>
              </div>
            </div>
            <div style={{ padding: '20px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', fontSize: '24px', fontWeight: '900', color: topMajor.color }}>2026 CERTIFIED</div>
          </div>

          {/* Main Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            <div>
              <div style={{ fontSize: '42px', opacity: 0.7, marginBottom: '24px', fontWeight: '500', letterSpacing: '2px' }}>Personal Analysis for <span style={{ color: 'white', fontWeight: '900' }}>{userName}</span></div>
              <div style={{ fontSize: '120px', fontWeight: '900', lineHeight: 0.9, letterSpacing: '-4px' }}>
                {topMajor.name.split(' ').map((word, i) => (
                  <span key={i} style={{ display: 'block', color: i === 1 ? topMajor.color : 'white' }}>{word}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
              <div style={{ fontSize: '240px', fontWeight: '900', color: topMajor.color, lineHeight: 0.8 }}>{topMajor.percentage}%</div>
              <div style={{ height: '200px', width: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>PSYCHOMETRIC MATCH</div>
                <div style={{ fontSize: '28px', maxWidth: '380px', opacity: 0.7, lineHeight: 1.4, fontWeight: '500' }}>
                  Sangat cocok dengan aspirasi dan profil kognitif digital kamu.
                </div>
              </div>
            </div>

            <div style={{ padding: '80px', background: 'rgba(255,255,255,0.04)', borderRadius: '64px', border: `2px solid rgba(255,255,255,0.1)`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '40px', left: '40px', opacity: 0.3, color: topMajor.color }}><Sparkles size={60} /></div>
              <div style={{ fontSize: '36px', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic', color: 'rgba(255,255,255,0.95)', fontWeight: '500' }}>
                "{topMajor.description}"
              </div>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '60px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '900', opacity: 0.5, letterSpacing: '4px', marginBottom: '12px' }}>TEMUKAN MASA DEPANMU</div>
              <div style={{ fontSize: '56px', fontWeight: '900', color: 'white' }}>pmb.swadharma.ac.id</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ opacity: 0.5, fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>DITERBITKAN: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: topMajor.color }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};