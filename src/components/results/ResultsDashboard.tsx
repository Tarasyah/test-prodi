'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, GraduationCap, ArrowRight, Printer, RefreshCcw, Sparkles, ShieldCheck, Globe } from 'lucide-react';
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
        scale: 4, // Ultra high quality
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `itb-swadharma-${userName.toLowerCase()}-future.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      captureEl.style.display = 'none';
    }
  };

  return (
    <div className="relative min-h-screen bg-mesh-animation overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Analisis Berhasil Selesai
          </div>
          <h1 className="text-5xl md:text-6xl font-headline font-bold">
            Hi {userName}, Ini Masa <span className="text-primary italic">Depanmu.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Algoritma kami mendeteksi potensi terkuatmu ada pada bidang <span className="text-white font-bold">{topMajor.name}</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 glass h-full border-white/5 flex flex-col group">
              {/* Background Glow */}
              <div 
                className="absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-30 transition-all duration-1000 group-hover:scale-110"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Rekomendasi Utama</p>
                    <h2 className="text-5xl font-headline font-bold text-white tracking-tight">{topMajor.name}</h2>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: topMajor.color }}
                  >
                    <GraduationCap className="w-8 h-8 text-background" />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-8xl font-headline font-bold text-primary">{topMajor.percentage}</span>
                    <span className="text-2xl font-bold text-primary/50">%</span>
                  </div>
                  <div className="h-16 w-px bg-white/10" />
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">
                    Tingkat Kecocokan<br />dengan Profil Minat
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                  <p className="text-xl text-white/90 leading-relaxed italic">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 no-print">
                  <Button 
                    size="lg" 
                    className="h-14 bg-primary text-background font-bold text-lg hover:scale-105 transition-transform px-8 rounded-2xl shadow-xl shadow-primary/20"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      Wujudkan Impianmu
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <div className="flex gap-3">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                      onClick={handleDownload}
                    >
                      <Download className="w-6 h-6" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-6 h-6" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white"
                      onClick={onRetake}
                    >
                      <RefreshCcw className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-white text-lg">S</div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase">Pendidikan Berkualitas</p>
                    <p className="text-sm font-headline font-bold text-white/80">ITB SWADHARMA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold tracking-widest uppercase">Versi Analisis</p>
                  <p className="text-sm font-bold text-white/80">2026.12.v1</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <Card className="glass border-white/5 overflow-hidden flex-1 rounded-[2.5rem]">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-headline font-bold">Analisis Komparatif</h3>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -20, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={24}>
                        {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex gap-4 items-center">
                    <Globe className="w-8 h-8 text-primary opacity-50" />
                    <p className="text-xs text-primary/80 leading-relaxed font-medium">
                      Kurikulum kami dirancang untuk memastikan kecocokan profilmu dengan kebutuhan industri global saat ini.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/10" />
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/40">Alternatif Karier</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.slice(1, 5).map((major) => (
              <div key={major.id} className="glass p-6 rounded-3xl border-white/5 hover:border-white/20 transition-all group cursor-default">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5" style={{ color: major.color }}>{major.percentage}%</span>
                </div>
                <h4 className="font-headline font-bold text-base text-white/90 group-hover:text-primary transition-colors">{major.name}</h4>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 no-print">
            <Button variant="ghost" className="text-white/40 hover:text-white" onClick={onRetake}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Mulai Ulang Tes
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Premium 4:5 Template for Download */}
      <div 
        ref={shareCardRef}
        style={{ 
          display: 'none', 
          width: '1080px', 
          height: '1350px',
          padding: '100px',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #020617 0%, #0a0a0a 100%)',
          color: 'white',
          position: 'fixed',
          left: '-5000px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: topMajor.color, borderRadius: '50%', filter: 'blur(150px)', opacity: 0.2 }} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent, rgba(0,0,0,0.8))', pointerEvents: 'none' }} />
        
        {/* Pattern Dots */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '80px', height: '80px', background: topMajor.color, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '900', color: '#020617', boxShadow: `0 20px 40px ${topMajor.color}33` }}>S</div>
              <div>
                <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '4px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '16px', opacity: 0.5, letterSpacing: '6px' }}>MAJOR MATCHING 2026</div>
              </div>
            </div>
            <div style={{ padding: '12px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: '20px', fontWeight: 'bold' }}>CERTIFIED RESULT</div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            <div>
              <div style={{ fontSize: '36px', opacity: 0.6, marginBottom: '16px', fontWeight: '500' }}>Hello {userName}, Your Ideal Future is...</div>
              <div style={{ fontSize: '110px', fontWeight: '900', lineHeight: 1, letterSpacing: '-2px', color: 'white' }}>
                {topMajor.name.split(' ').map((word, i) => (
                  <span key={i} style={{ display: 'block', color: i === 1 ? topMajor.color : 'white' }}>{word}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              <div style={{ fontSize: '180px', fontWeight: '900', color: topMajor.color, lineHeight: 1 }}>{topMajor.percentage}%</div>
              <div style={{ height: '140px', width: '4px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ fontSize: '28px', maxWidth: '300px', opacity: 0.8, lineHeight: 1.4, fontWeight: '600' }}>
                Compatibility score based on your personality & passion profile.
              </div>
            </div>

            <div style={{ padding: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '48px', border: `1px solid rgba(255,255,255,0.08)`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '30px', left: '30px', opacity: 0.2 }}><Sparkles size={40} /></div>
              <div style={{ fontSize: '32px', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                "{topMajor.description}"
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', opacity: 0.4, letterSpacing: '2px', marginBottom: '8px' }}>EXPLORE NOW</div>
              <div style={{ fontSize: '42px', fontWeight: '900' }}>pmb.swadharma.ac.id</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ opacity: 0.4, fontSize: '18px', fontWeight: 'bold' }}>ISSUE DATE: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: topMajor.color }}>© ITB SWADHARMA 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};