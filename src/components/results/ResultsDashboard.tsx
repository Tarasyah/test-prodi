'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, ShieldCheck, Globe, Zap, Heart, Star, LayoutGrid } from 'lucide-react';
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
        scale: 3,
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
    { icon: <Zap className="w-12 h-12" />, x: "8%", y: "15%", delay: 0 },
    { icon: <Star className="w-8 h-8" />, x: "88%", y: "12%", delay: 1.5 },
    { icon: <Heart className="w-6 h-6" />, x: "82%", y: "85%", delay: 3 },
    { icon: <Sparkles className="w-10 h-10" />, x: "12%", y: "78%", delay: 0.8 },
    { icon: <LayoutGrid className="w-8 h-8" />, x: "45%", y: "5%", delay: 2.2 },
    { icon: <Globe className="w-7 h-7" />, x: "92%", y: "45%", delay: 1.2 },
  ];

  return (
    <div className="relative min-h-screen bg-mesh-vibrant overflow-hidden transition-colors duration-1000">
      {/* Floating Decorative Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            y: [0, -40, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 20, -20, 0]
          }}
          transition={{ 
            duration: 8 + i, 
            repeat: Infinity, 
            delay: el.delay,
            ease: "easeInOut" 
          }}
          className="absolute z-0 text-primary/30 pointer-events-none"
          style={{ left: el.x, top: el.y }}
        >
          {el.icon}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 space-y-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full animate-border-rainbow text-primary text-sm font-black uppercase tracking-[0.4em] mb-4"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            AI Analytical Insight Ready
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-headline font-bold tracking-tighter leading-none text-white">
            Hi {userName}, <br />
            Takdir <span className="text-primary italic">Kariermu</span> Adalah:
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Analisis neural kami mendeteksi resonansi kognitif tertinggimu di bidang <span className="text-white font-black underline decoration-primary decoration-8 underline-offset-12">{topMajor.name}</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 h-full"
          >
            <div className="relative overflow-hidden rounded-[4rem] p-16 animate-border-rainbow h-full flex flex-col group shadow-primary/20 shadow-2xl">
              {/* Dynamic Glow Background */}
              <div 
                className="absolute -top-60 -right-60 w-[800px] h-[800px] blur-[200px] rounded-full opacity-40 transition-all duration-1000 group-hover:scale-125"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-12">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <p className="text-sm font-black tracking-[0.5em] text-primary uppercase">Elite Future Path</p>
                    <h2 className="text-7xl md:text-8xl font-headline font-bold text-white tracking-tighter">{topMajor.name}</h2>
                  </div>
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative"
                    style={{ backgroundColor: topMajor.color }}
                  >
                    <GraduationCap className="w-16 h-16 text-background z-10" />
                    <div className="absolute inset-0 rounded-[2.5rem] bg-white/30 blur-2xl animate-pulse" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="flex items-baseline gap-3">
                    <motion.span 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10rem] font-headline font-bold text-primary leading-none"
                    >
                      {topMajor.percentage}
                    </motion.span>
                    <span className="text-5xl font-bold text-primary/40">%</span>
                  </div>
                  <div className="h-32 w-px bg-white/10" />
                  <div className="space-y-2">
                    <p className="text-base text-white/60 font-black uppercase tracking-[0.3em]">Precision Match</p>
                    <p className="text-2xl text-muted-foreground font-medium leading-tight">
                      Sinkronisasi Profil <br />Era Industri 5.0
                    </p>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-10 rounded-[3rem] bg-white/[0.04] border border-white/10 relative overflow-hidden backdrop-blur-md"
                >
                  <p className="text-3xl text-white/90 leading-relaxed italic font-medium relative z-10">
                    "{topMajor.description}"
                  </p>
                  <div className="absolute top-6 left-6 text-primary/15 font-serif text-[12rem] leading-none pointer-events-none">"</div>
                </motion.div>

                <div className="pt-10 flex flex-wrap gap-8 no-print">
                  <Button 
                    size="lg" 
                    className="h-20 bg-primary text-background font-black text-2xl hover:scale-105 transition-all px-16 rounded-[2rem] shadow-2xl shadow-primary/40 group/btn"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-4 w-8 h-8 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-5">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-20 h-20 rounded-[1.8rem] border-white/10 bg-white/5 hover:bg-white/15 hover:border-primary/50 transition-all hover:scale-110"
                      onClick={handleDownload}
                      title="Unduh Hasil High-Res 4:5"
                    >
                      <Download className="w-8 h-8" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-20 h-20 rounded-[1.8rem] border-white/10 bg-white/5 hover:bg-white/15 hover:scale-110 transition-all"
                      onClick={() => window.print()}
                      title="Cetak Laporan PDF"
                    >
                      <Printer className="w-8 h-8" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="w-20 h-20 rounded-[1.8rem] bg-white/5 hover:bg-destructive/20 hover:text-destructive transition-all hover:scale-110"
                      onClick={onRetake}
                      title="Tes Ulang"
                    >
                      <RefreshCcw className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-12 border-t border-white/5 flex justify-between items-end text-white/30">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center font-black text-primary text-3xl border border-primary/20">S</div>
                  <div>
                    <p className="text-xs font-black tracking-[0.4em] uppercase mb-1">Official Results Authorized By</p>
                    <p className="text-2xl font-headline font-bold text-white/80 tracking-wide">ITB SWADHARMA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black tracking-[0.4em] uppercase mb-1">Blockchain ID</p>
                  <p className="text-2xl font-headline font-bold text-white/80 tracking-wide">SWD-26-{Math.random().toString(36).substring(5).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Alternates */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-10"
          >
            <Card className="animate-border-rainbow overflow-hidden flex-1 rounded-[4rem] p-6 shadow-2xl">
              <CardContent className="p-10 flex flex-col h-full space-y-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-headline font-bold">Market Analysis</h3>
                  <Zap className="w-8 h-8 text-primary animate-pulse" />
                </div>
                
                <div className="flex-1 min-h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -15, right: 50 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={150}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 800 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 16, 16, 0]} barSize={40}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-primary/15 border border-primary/30 flex gap-6 items-center">
                  <Globe className="w-12 h-12 text-primary shrink-0 animate-spin-slow" />
                  <p className="text-base text-white font-bold leading-relaxed">
                    Global Hybrid Curriculum 2026 siap mengantarkanmu ke panggung dunia.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Secondary Paths */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h3 className="text-sm font-black tracking-[0.8em] uppercase text-primary">Potential Pivot Paths</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.slice(1, 5).map((major, i) => (
              <motion.div 
                key={major.id} 
                whileHover={{ y: -15, scale: 1.05 }}
                className="glass p-10 rounded-[3rem] border-white/5 hover:animate-border-rainbow transition-all group cursor-default relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: major.color }} />
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-black px-4 py-1.5 rounded-full bg-white/5 border border-white/10" style={{ color: major.color }}>{major.percentage}%</span>
                </div>
                <h4 className="font-headline font-bold text-2xl text-white group-hover:text-primary transition-colors">{major.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center pt-16 no-print">
          <Button 
            variant="ghost" 
            size="lg"
            className="text-white/40 hover:text-white hover:bg-white/5 rounded-2xl h-16 px-10 transition-all hover:scale-105" 
            onClick={onRetake}
          >
            <RefreshCcw className="w-6 h-6 mr-4" />
            RESET ANALYTICS ENGINE
          </Button>
        </div>
      </div>

      {/* ULTRA PREMIUM 4:5 Template for Download - 1080x1350 */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '100px',
          flexDirection: 'column',
          background: '#020617',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif',
          overflow: 'hidden'
        }}
      >
        {/* Layered Background Design */}
        <div style={{ position: 'absolute', top: '-15%', right: '-15%', width: '1000px', height: '1000px', background: topMajor.color, borderRadius: '50%', filter: 'blur(250px)', opacity: 0.35 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '800px', height: '800px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(200px)', opacity: 0.2 }} />
        
        {/* Tech Grid Pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, border: '60px solid white' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10 }}>
          {/* Brand Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              <div style={{ width: '120px', height: '120px', background: topMajor.color, borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', fontWeight: '900', color: '#020617', boxShadow: `0 40px 80px ${topMajor.color}55` }}>S</div>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '8px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '22px', opacity: 0.6, letterSpacing: '14px', marginTop: '8px' }}>NEURAL ENGINE v26.0</div>
              </div>
            </div>
            <div style={{ padding: '24px 50px', borderRadius: '30px', border: `3px solid ${topMajor.color}`, background: 'rgba(255,255,255,0.05)', fontSize: '28px', fontWeight: '900', color: topMajor.color }}>CERTIFIED ANALYTICS</div>
          </div>

          {/* Main Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            <div>
              <div style={{ fontSize: '40px', opacity: 0.6, marginBottom: '24px', fontWeight: '500', letterSpacing: '4px' }}>INDIVIDUAL PATHWAY FOR:</div>
              <div style={{ fontSize: '70px', fontWeight: '900', color: 'white', textTransform: 'uppercase', marginBottom: '40px' }}>{userName}</div>
              <div style={{ fontSize: '140px', fontWeight: '900', lineHeight: 0.85, letterSpacing: '-6px' }}>
                {topMajor.name.split(' ').map((word, i) => (
                  <div key={i} style={{ color: i === 1 ? topMajor.color : 'white' }}>{word}</div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '80px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '60px', borderRadius: '60px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '240px', fontWeight: '900', color: topMajor.color, lineHeight: 0.7 }}>{topMajor.percentage}%</div>
              <div style={{ height: '180px', width: '8px', background: topMajor.color, borderRadius: '10px', opacity: 0.3 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '38px', fontWeight: '900', color: 'white', letterSpacing: '2px' }}>NEURAL MATCH SCORE</div>
                <div style={{ fontSize: '30px', maxWidth: '450px', opacity: 0.7, lineHeight: 1.4, fontWeight: '500' }}>
                  Sangat selaras dengan aspirasi digital dan profil kognitif masa depan kamu.
                </div>
              </div>
            </div>

            <div style={{ padding: '70px', background: `${topMajor.color}11`, borderRadius: '60px', border: `2px solid ${topMajor.color}33`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '30px', left: '30px', opacity: 0.2, color: topMajor.color }}><Sparkles size={80} /></div>
              <div style={{ fontSize: '40px', lineHeight: 1.5, textAlign: 'center', fontStyle: 'italic', color: 'rgba(255,255,255,0.95)', fontWeight: '600' }}>
                "{topMajor.description}"
              </div>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '60px', borderTop: '4px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: '900', opacity: 0.4, letterSpacing: '6px', marginBottom: '16px' }}>KLAIM MASA DEPANMU DI:</div>
              <div style={{ fontSize: '64px', fontWeight: '900', color: 'white' }}>pmb.swadharma.ac.id</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ opacity: 0.5, fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>DITERBITKAN: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: topMajor.color }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};