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
    }, 0);
  };

  const handleRetake = () => {
    setAppState('intro');
    setResults([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Mesh Background */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${appState === 'intro' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 flex flex-col items-center justify-center w-full max-w-md md:max-w-2xl text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <img 
                src="/img/logoitbs.webp" 
                alt="Logo ITB Swadharma" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl" 
              />
              <div className="p-1.5 px-4 rounded-full border border-white/10 bg-white/5 text-primary font-bold text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                ADMISSION 2026
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-headline font-bold leading-tight tracking-tighter text-white">
                Rancang Masa <span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-md md:max-w-lg mx-auto leading-relaxed">
                Temukan program studi yang paling sesuai dengan potensi unikmu melalui analisis cerdas berbasis AI.
              </p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="animate-border-rainbow p-5 rounded-[1.5rem] w-full max-w-xs md:max-w-sm space-y-4 relative overflow-hidden shadow-2xl"
            >
              <div className="space-y-2 text-left">
                <Label htmlFor="name" className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] ml-1">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu..."
                  className="h-11 bg-white/[0.05] border-white/10 text-sm focus:border-primary/50 transition-all rounded-xl px-4"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-11 text-sm font-bold bg-primary text-background hover:bg-white hover:scale-[1.02] transition-all rounded-xl shadow-lg"
              >
                MULAI ANALISIS
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10 w-full max-w-lg">
              {[
                { icon: <GraduationCap className="w-4 h-4" />, text: "Hybrid" },
                { icon: <Zap className="w-4 h-4" />, text: "Next-Gen" },
                { icon: <Globe className="w-4 h-4" />, text: "Global" },
                { icon: <Shield className="w-4 h-4" />, text: "Certified" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground/60">
                  <div className="p-2 rounded-lg bg-white/5 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.1em]">{item.text}</span>
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
            className="relative z-10 w-full flex items-center justify-center"
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
            className="relative z-10 w-full h-full overflow-hidden"
          >
            <ResultsDashboard userName={userName} results={results} onRetake={handleRetake} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-4 left-0 right-0 z-10 text-center text-muted-foreground/40 text-[9px] font-black tracking-[0.3em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma.</p>
      </footer>
    </main>
  );
}
