'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MajorId } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Download, Printer, RefreshCcw, ArrowRight, Loader2 } from 'lucide-react';
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
  const otherMajors = results.slice(1, 4);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!shareCardRef.current || isDownloading) return;

    setIsDownloading(true);
    const captureEl = shareCardRef.current;
    captureEl.style.display = 'flex';

    try {
      const canvas = await html2canvas(captureEl, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `hasil-analisis-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      captureEl.style.display = 'none';
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-mesh-vibrant flex flex-col items-center justify-center py-4 md:py-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header Logo */}
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
          <h3 className="text-sm font-black tracking-[0.3em] uppercase text-white">ITB Swadharma</h3>
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
                      className="w-11 h-11 rounded-lg border-white/10 bg-white/5 hover:border-primary/50"
                      onClick={handleDownload}
                      disabled={isDownloading}
                    >
                      {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    </Button>
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

      {/* --- SHARE CARD TEMPLATE --- */}
      <div 
        ref={shareCardRef}
        style={{
          display: 'none', // Initially hidden
          width: '1080px', 
          height: '1350px',
          flexDirection: 'column',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'fixed', // Use fixed for off-screen rendering
          left: '-9999px', // Position it way off-screen
          top: '0',
          background: 'radial-gradient(circle at 50% 50%, #101935, #020617)',
        }}
      >
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1200px',
          height: '1200px',
          transform: 'translate(-50%, -50%)',
          background: topMajor.color,
          borderRadius: '50%',
          filter: 'blur(400px)',
          opacity: 0.15,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 80px', position: 'relative', zIndex: 1, height: '100%' }}>

          {/* 1. Header */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="/img/logoitbs.webp" alt="Logo ITBS" style={{ width: '90px', height: '90px' }} />
              <div>
                <p style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '1px', margin: 0 }}>ITB SWADHARMA</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: '700', letterSpacing: '3px', margin: 0 }}>NEURAL ENGINE 2026</p>
              </div>
            </div>
            <img src="/img/logoitbs.webp" alt="Logo ITBS" style={{ width: '90px', height: '90px' }} />
          </header>

          {/* 2. Main Content Area */}
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: '60px', width: '100%' }}>
            {/* Left Side: Score & Quote */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: '80px', paddingBottom: '150px' }}>
              <div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '26px', fontWeight: '700', letterSpacing: '2px' }}>POTENSI MASA DEPAN {userName.toUpperCase()}:</p>
                <p style={{ margin: 0, color: 'white', fontSize: '84px', fontWeight: '900', lineHeight: 1.1 }}>{topMajor.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '60px' }}>
                  <span style={{ fontSize: '180px', fontWeight: '900', color: topMajor.color, lineHeight: 0.8 }}>{topMajor.percentage}</span>
                  <span style={{ fontSize: '60px', fontWeight: '800', color: topMajor.color, opacity: 0.6 }}>%</span>
                </div>
                <p style={{ margin: 0, color: topMajor.color, opacity: 0.8, fontSize: '18px', fontWeight: '800', letterSpacing: '4px' }}>SKOR KECOCOKAN TERTINGGI</p>
              </div>

              <div style={{ border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '32px',backdropFilter: 'blur(10px)' }}>
                <p style={{ margin: 0, color: 'white', fontSize: '32px', fontWeight: '600', lineHeight: 1.5, fontStyle: 'italic', textAlign: 'center' }}>
                  {`“${topMajor.description}”`}
                </p>
              </div>
            </div>

            {/* Right Side: Comparison */}
            <div style={{ width: '380px', height: '600px', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', borderRadius: '40px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <p style={{ margin: 0, paddingBottom: '10px', color: 'white', fontSize: '22px', fontWeight: '800', letterSpacing: '1px', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>PERBANDINGAN PRODI LAIN:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                  {otherMajors.map(major => (
                    <div key={major.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: '700' }}>{major.name}</span>
                        <span style={{ color: major.color, fontSize: '18px', fontWeight: '800' }}>{major.percentage}%</span>
                      </div>
                      <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', width: '100%' }}>
                        <div style={{ width: `${major.percentage}%`, height: '100%', background: major.color, borderRadius: '6px' }} />
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* 3. Footer */}
          <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'absolute', bottom: '60px', left: 0, padding: '0 80px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontWeight: '700', letterSpacing: '2px' }}>SIAP MELANGKAH?</p>
              <div style={{ marginTop: '10px', backgroundColor: 'white', color: '#020617', padding: '20px 40px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '28px', fontWeight: '900' }}>DAFTAR SEKARANG</span>
                <span style={{ fontSize: '28px', fontWeight: '900' }}>→</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: 'white' }}>pmb.swadharma.ac.id</p>
              <p style={{ margin: '5px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>© ITB SWADHARMA 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
