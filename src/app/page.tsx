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
    <main className="min-h-screen relative overflow-hidden bg-background flex flex-col items-center justify-center p-4">
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
            className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <img 
                src="/logoitbs.webp" 
                alt="Logo ITB Swadharma" 
                className="w-14 h-14 object-contain drop-shadow-xl" 
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="p-1 px-3 rounded-full border border-white/10 bg-white/5 text-primary font-bold text-[8px] tracking-[0.3em] uppercase flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                ADMISSION 2026
              </div>
            </motion.div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-4xl font-headline font-bold leading-tight tracking-tighter text-white">
                Rancang Masa <span className="text-primary italic">Depanmu.</span>
              </h1>
              <p className="text-[11px] md:text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Temukan program studi yang paling sesuai dengan potensi unikmu melalui analisis cerdas berbasis AI.
              </p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="animate-border-rainbow p-4 rounded-[1.25rem] w-full max-w-[280px] space-y-3 relative overflow-hidden shadow-xl"
            >
              <div className="space-y-1 text-left">
                <Label htmlFor="name" className="text-white/40 text-[7px] font-black uppercase tracking-[0.3em] ml-1">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Ketik namamu..."
                  className="h-9 bg-white/[0.05] border-white/10 text-xs focus:border-primary/50 transition-all rounded-lg px-3"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-9 text-xs font-bold bg-primary text-background hover:bg-white hover:scale-[1.02] transition-all rounded-lg shadow-lg"
              >
                MULAI ANALISIS
                <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10 w-full max-w-md">
              {[
                { icon: <GraduationCap className="w-3 h-3" />, text: "Hybrid" },
                { icon: <Zap className="w-3 h-3" />, text: "Next-Gen" },
                { icon: <Globe className="w-3 h-3" />, text: "Global" },
                { icon: <Shield className="w-3 h-3" />, text: "Certified" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 text-muted-foreground/60">
                  <div className="p-1.5 rounded-lg bg-white/5 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-[6px] font-black uppercase tracking-[0.1em]">{item.text}</span>
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

      <footer className="fixed bottom-2 left-0 right-0 z-10 text-center text-muted-foreground/30 text-[6px] font-black tracking-[0.3em] uppercase no-print">
        <p>© 2026 Institut Teknologi dan Bisnis Swadharma.</p>
      </footer>
    </main>
  );
}
