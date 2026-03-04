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
      link.download = `itb-swadharma-future-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      captureEl.style.display = 'none';
    }
  };

  return (
    <div className="relative min-h-screen bg-mesh-vibrant flex flex-col items-center justify-center py-4 overflow-y-auto overflow-x-hidden">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 space-y-4">
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <img 
            src="/logoitbs.webp" 
            alt="Logo ITB Swadharma" 
            className="w-14 h-14 object-contain" 
          />
          <div className="space-y-0.5">
            <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-white">ITB Swadharma</h3>
            <p className="text-[7px] font-medium tracking-[0.2em] text-primary/60 uppercase">Neural Engine 2026</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1"
        >
          <h1 className="text-xl md:text-2xl font-headline font-bold tracking-tighter leading-tight text-white max-w-xl mx-auto">
            Hi {userName}, Masa <span className="text-primary italic">Depanmu</span> Di:
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] p-6 animate-border-rainbow h-full flex flex-col group shadow-2xl items-center text-center">
              <div 
                className="absolute -top-40 -right-40 w-[400px] h-[400px] blur-[100px] rounded-full opacity-10"
                style={{ backgroundColor: topMajor.color }}
              />
              
              <div className="relative z-10 flex-1 space-y-4 w-full flex flex-col items-center justify-center">
                <div className="space-y-1">
                  <p className="text-[7px] font-black tracking-[0.4em] text-primary uppercase">Rekomendasi Utama</p>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tighter leading-tight">{topMajor.name}</h2>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-headline font-bold text-primary leading-none">{topMajor.percentage}</span>
                    <span className="text-lg font-bold text-primary/40">%</span>
                  </div>
                  <span className="text-[7px] font-black text-primary/60 tracking-widest mt-0.5 uppercase">Skor Kecocokan Tertinggi</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 max-w-sm">
                  <p className="text-xs text-white/90 leading-relaxed font-medium italic">
                    "{topMajor.description}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 no-print justify-center">
                  <Button 
                    size="sm" 
                    className="h-10 bg-primary text-background font-bold text-sm hover:scale-[1.02] transition-all px-5 rounded-lg group/btn shadow-xl"
                    asChild
                  >
                    <a href="https://pmb.swadharma.ac.id" target="_blank" rel="noopener noreferrer">
                      DAFTAR SEKARANG
                      <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-10 h-10 rounded-lg border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="w-10 h-10 rounded-lg border-white/10 bg-white/5"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-4 h-4" />
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
            <Card className="animate-border-rainbow overflow-hidden h-full rounded-[1.5rem] p-5 shadow-xl border-none bg-black/40 backdrop-blur-sm">
              <CardContent className="p-0 flex flex-col h-full space-y-3">
                <h3 className="text-sm font-headline font-bold text-center">Analisis Kecocokan</h3>
                
                <div className="flex-1 min-h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results} layout="vertical" margin={{ left: -30, right: 30 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={90}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 8, fontWeight: 700 }}
                      />
                      <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={12}>
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
                    className="text-white/40 hover:text-white hover:bg-white/5 rounded-lg h-8 px-3 transition-all text-[9px] font-bold" 
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

      {/* PREMIUM 4:5 Template for Download - Optimized & Centered */}
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
        <div style={{ position: 'absolute', top: '-15%', left: '0', right: '0', margin: 'auto', width: '1000px', height: '1000px', background: topMajor.color, borderRadius: '50%', filter: 'blur(250px)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 10, width: '100%', alignItems: 'center' }}>
          
          {/* Header Branding */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="/logoitbs.webp" alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '2px', marginBottom: '1px' }}>ITB SWADHARMA</div>
                <div style={{ fontSize: '11px', opacity: 0.5, letterSpacing: '4px' }}>NEURAL ENGINE 2026</div>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '46px', 
              fontSize: '13px', 
              fontWeight: '900', 
              color: topMajor.color, 
              border: `2px solid ${topMajor.color}44`, 
              padding: '0 25px', 
              borderRadius: '12px',
              backgroundColor: `${topMajor.color}11`
            }}>
              OFFICIAL RESULT
            </div>
          </div>

          {/* Headline - Centered */}
          <div style={{ marginTop: '50px' }}>
            <div style={{ fontSize: '22px', opacity: 0.6, marginBottom: '10px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
              POTENSI MASA DEPAN {userName}:
            </div>
            <div style={{ fontSize: '74px', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-2px', color: 'white' }}>
              {topMajor.name}
            </div>
          </div>

          {/* Visual: Score & Comparison */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '40px', 
            alignItems: 'center', 
            background: 'rgba(255,255,255,0.02)', 
            padding: '60px 50px', 
            borderRadius: '40px', 
            border: '1px solid rgba(255,255,255,0.06)',
            width: '100%',
            margin: '40px 0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <div style={{ fontSize: '160px', fontWeight: '900', color: topMajor.color, lineHeight: '0.8' }}>{topMajor.percentage}</div>
                <div style={{ fontSize: '40px', fontWeight: '900', color: topMajor.color, opacity: 0.4 }}>%</div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '900', color: topMajor.color, letterSpacing: '5px', marginTop: '25px', opacity: 0.8 }}>SKOR KECOCOKAN TERTINGGI</div>
            </div>
            
            <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            
            {/* Comparison Bar Charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '90%' }}>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'white', opacity: 0.3, letterSpacing: '2px' }}>PERBANDINGAN MINAT:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {results.slice(1, 4).map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '220px', fontSize: '15px', fontWeight: '700', color: 'white', textAlign: 'left', opacity: 0.7 }}>{m.name}</div>
                    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${m.percentage}%`, height: '100%', background: m.color }} />
                    </div>
                    <div style={{ width: '60px', fontSize: '15px', fontWeight: '900', color: m.color, textAlign: 'right' }}>{m.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Block */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ 
              background: 'white', 
              color: '#020617', 
              padding: '20px 50px', 
              borderRadius: '16px', 
              fontSize: '22px', 
              fontWeight: '900',
              boxShadow: `0 15px 35px ${topMajor.color}22`
            }}>
              DAFTAR SEKARANG
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: topMajor.color, marginBottom: '2px' }}>pmb.swadharma.ac.id</div>
              <div style={{ fontSize: '12px', opacity: 0.4, fontWeight: '600', letterSpacing: '1px' }}>© 2026 ITB SWADHARMA</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
