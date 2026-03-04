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
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-6xl mx-auto text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <img src="/logoitbs.webp" alt="Logo ITB Swadharma" className="w-24 h-24 object-contain drop-shadow-2xl" />
              <div className="p-2 px-6 rounded-full border border-white/10 bg-white/5 text-primary font-bold text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
                <Sparkles className="w-3 h-3" />
                Neural Engine 2026
              </div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tighter text-white">
                Rancang Masa <br /><span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
                Temukan program studi yang paling sinkron dengan potensi unikmu melalui analisis neural berbasis AI.
              </p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="animate-border-rainbow p-8 rounded-[2rem] w-full max-w-md space-y-6 relative overflow-hidden shadow-xl"
            >
              <div className="space-y-2 text-left">
                <Label htmlFor="name" className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] ml-1">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu..."
                  className="h-12 bg-white/[0.05] border-white/10 text-lg focus:border-primary/50 transition-all rounded-xl px-5"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-12 text-lg font-bold bg-primary text-background hover:bg-white hover:scale-[1.02] transition-all rounded-xl shadow-lg"
              >
                MULAI ANALISIS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 w-full max-w-3xl">
              {[
                { icon: <GraduationCap className="w-4 h-4" />, text: "Hybrid Learning" },
                { icon: <Zap className="w-4 h-4" />, text: "Next-Gen Tech" },
                { icon: <Globe className="w-4 h-4" />, text: "Global Reach" },
                { icon: <Shield className="w-4 h-4" />, text: "Certified IA" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground/60">
                  <div className="p-2.5 rounded-xl bg-white/5 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.text}</span>
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

      <footer className="relative z-10 py-8 text-center text-muted-foreground/30 text-[9px] font-black tracking-[0.4em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma. Neural Engine v26.0</p>
      </footer>
    </main>
  );
}
