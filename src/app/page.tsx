
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
import { GraduationCap, ArrowRight, Zap, Globe, Shield } from 'lucide-react';

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
    
    // Simulate complex analysis
    setTimeout(() => {
      setAppState('results');
    }, 5000);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 max-w-4xl mx-auto text-center space-y-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-3 px-6 rounded-full glass border-primary/30 text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              ITB Swadharma Tech-Powered Matcher
            </motion.div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tight text-white">
                Temukan Masa Depanmu di <span className="text-primary">ITB Swadharma</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Gunakan algoritma cerdas kami untuk menemukan program studi yang paling cocok dengan minat dan kepribadianmu.
              </p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-3xl w-full max-w-md space-y-6"
            >
              <div className="space-y-2 text-left">
                <Label htmlFor="name" className="text-white/60 ml-1">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan namamu..."
                  className="h-12 bg-white/5 border-white/10 text-lg focus:border-primary/50 transition-all rounded-xl"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                />
              </div>
              <Button 
                onClick={startQuiz}
                disabled={!userName.trim()}
                className="w-full h-12 text-lg font-bold bg-primary text-background hover:bg-primary/90 transition-all rounded-xl"
              >
                Mulai Analisis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
              {[
                { icon: <GraduationCap />, text: "Kurikulum Modern" },
                { icon: <Zap />, text: "Berbasis Industri" },
                { icon: <Globe />, text: "Global Network" },
                { icon: <Shield />, text: "Terakreditasi" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="p-2 rounded-lg bg-white/5 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">{item.text}</span>
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
            <ResultsDashboard userName={userName} results={results} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      {appState !== 'loading' && (
        <footer className="relative z-10 py-12 text-center text-muted-foreground/40 text-sm no-print">
          <p>© 2024 Institut Teknologi dan Bisnis Swadharma. All Rights Reserved.</p>
        </footer>
      )}
    </main>
  );
}
