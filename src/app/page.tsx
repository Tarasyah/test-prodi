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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-5xl mx-auto text-center space-y-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-3 px-6 rounded-full glass border-primary/30 text-primary font-bold text-xs tracking-[0.3em] uppercase flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4" />
              ITB Swadharma AI Major Engine
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-headline font-bold leading-none tracking-tighter text-white">
                Rancang Masa <span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                Temukan program studi yang paling sinkron dengan potensi unik dan ambisimu melalui analisis psikometrik berbasis AI.
              </p>
            </div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass p-10 rounded-[2.5rem] w-full max-w-md space-y-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              
              <div className="space-y-3 text-left">
                <Label htmlFor="name" className="text-white/40 text-xs font-bold uppercase tracking-widest ml-1">Nama Lengkap Kamu</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu di sini..."
                  className="h-14 bg-white/[0.03] border-white/10 text-xl focus:border-primary/50 transition-all rounded-2xl px-6"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-14 text-xl font-bold bg-primary text-background hover:bg-white hover:scale-[1.02] transition-all rounded-2xl shadow-2xl shadow-primary/20"
              >
                Mulai Analisis
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-white/5 w-full">
              {[
                { icon: <GraduationCap />, text: "Modern Curriculum" },
                { icon: <Zap />, text: "Industry Ready" },
                { icon: <Globe />, text: "Global Network" },
                { icon: <Shield />, text: "Accredited" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-white transition-colors">
                  <div className="p-3 rounded-2xl bg-white/5 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.text}</span>
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
      <footer className="relative z-10 py-12 text-center text-muted-foreground/30 text-[10px] font-bold tracking-[0.4em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma. Powered by Next-AI Engine.</p>
      </footer>
    </main>
  );
}