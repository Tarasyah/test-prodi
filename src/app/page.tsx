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
    
    // Snappy analysis delay
    setTimeout(() => {
      setAppState('results');
    }, 1500);
  };

  const handleRetake = () => {
    setAppState('intro');
    setResults([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Background for Intro */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${appState === 'intro' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-6xl mx-auto text-center space-y-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-3 px-6 rounded-full border border-white/10 bg-white/5 text-primary font-bold text-xs tracking-[0.3em] uppercase flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4" />
              ITB Swadharma Neural Engine 2026
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tighter text-white">
                Rancang Masa <br /><span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                Temukan program studi yang paling sinkron dengan potensi unik dan ambisimu melalui analisis neural berbasis AI.
              </p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="animate-border-rainbow p-10 rounded-[2.5rem] w-full max-w-md space-y-8 relative overflow-hidden shadow-xl"
            >
              <div className="space-y-3 text-left">
                <Label htmlFor="name" className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu..."
                  className="h-14 bg-white/[0.05] border-white/10 text-xl focus:border-primary/50 transition-all rounded-xl px-6"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-14 text-xl font-bold bg-primary text-background hover:bg-white hover:scale-[1.02] transition-all rounded-xl shadow-lg"
              >
                MULAI ANALISIS
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 w-full max-w-4xl">
              {[
                { icon: <GraduationCap className="w-5 h-5" />, text: "Hybrid Curriculum" },
                { icon: <Zap className="w-5 h-5" />, text: "Next-Gen Industry" },
                { icon: <Globe className="w-5 h-5" />, text: "Global Connector" },
                { icon: <Shield className="w-5 h-5" />, text: "IA-Accredited" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 text-muted-foreground/60">
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
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
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

      <footer className="relative z-10 py-12 text-center text-muted-foreground/30 text-[10px] font-black tracking-[0.4em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma. Neural Engine v26.0</p>
      </footer>
    </main>
  );
}