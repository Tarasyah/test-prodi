'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizFlow } from '@/components/quiz/QuizFlow';
import { LoadingAnalysis } from '@/components/results/LoadingAnalysis';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { calculateResults } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowRight, Zap, Globe, Shield, Sparkles } from 'lucide-react';

type AppState = 'intro' | 'quiz' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [userName, setUserName] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const startQuiz = () => {
    if (userName.trim()) {
      setAppState('quiz');
    }
  };

  const onQuizComplete = (answers: number[]) => {
    setAppState('loading');
    const calculated = calculateResults(answers);
    setResults(calculated);
    
    // Simulate deep analysis
    setTimeout(() => {
      setAppState('results');
    }, 4500);
  };

  const handleRetake = () => {
    setAppState('intro');
    setResults([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Background for Intro */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${appState === 'intro' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-6xl mx-auto text-center space-y-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 px-8 rounded-full animate-border-rainbow text-primary font-bold text-sm tracking-[0.4em] uppercase flex items-center gap-4 shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              ITB Swadharma Neural Engine 2026
            </motion.div>

            <div className="space-y-8">
              <h1 className="text-7xl md:text-9xl font-headline font-bold leading-none tracking-tighter text-white">
                Rancang Masa <br /><span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                Temukan program studi yang paling sinkron dengan potensi unik dan ambisimu melalui analisis neural berbasis AI masa depan.
              </p>
            </div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="animate-border-rainbow p-12 rounded-[3.5rem] w-full max-w-md space-y-10 relative overflow-hidden shadow-2xl shadow-primary/20"
            >
              <div className="space-y-4 text-left">
                <Label htmlFor="name" className="text-white/40 text-xs font-black uppercase tracking-[0.4em] ml-2">Nama Lengkap Eksplorer</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu di sini..."
                  className="h-16 bg-white/[0.05] border-white/10 text-2xl focus:border-primary/50 transition-all rounded-2xl px-8"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-16 text-2xl font-black bg-primary text-background hover:bg-white hover:scale-105 transition-all rounded-2xl shadow-2xl shadow-primary/30"
              >
                MULAI ANALISIS
                <ArrowRight className="ml-3 w-8 h-8" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-20 border-t border-white/10 w-full">
              {[
                { icon: <GraduationCap />, text: "Hybrid Curriculum" },
                { icon: <Zap />, text: "Next-Gen Industry" },
                { icon: <Globe />, text: "Global Connector" },
                { icon: <Shield />, text: "IA-Accredited" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 text-muted-foreground/60 hover:text-white transition-all group">
                  <div className="p-4 rounded-3xl bg-white/5 text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {appState === 'quiz' && (
          <motion.div 
            key="quiz" 
            initial={{ opacity: 0, scale: 1.05 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <QuizFlow onComplete={onQuizComplete} />
          </motion.div>
        )}

        {appState === 'loading' && (
          <LoadingAnalysis key="loading" />
        )}

        {appState === 'results' && (
          <motion.div 
            key="results" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <ResultsDashboard userName={userName} results={results} onRetake={handleRetake} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Footer Branding */}
      <footer className="relative z-10 py-16 text-center text-muted-foreground/30 text-xs font-black tracking-[0.6em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma. Neural Engine v26.0</p>
      </footer>
    </main>
  );
}