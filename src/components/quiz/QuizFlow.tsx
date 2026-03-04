'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizFlowProps {
  onComplete: (answers: number[]) => void;
}

export const QuizFlow: React.FC<QuizFlowProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-end text-[8px] font-black text-primary uppercase tracking-[0.3em]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Phase {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
          </div>
          <span>{Math.round(progress)}% Sync</span>
        </div>
        <Progress value={progress} className="h-1 bg-white/10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="animate-border-rainbow p-5 md:p-6 rounded-[1.5rem] shadow-2xl bg-black/40 backdrop-blur-sm"
        >
          <div className="mb-5 text-center">
            <h2 className="text-lg md:text-xl font-headline font-bold mb-2 leading-tight text-white">
              {currentQuestion.text}
            </h2>
            <div className="h-0.5 w-10 bg-primary/40 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentQuestion.options.map((option, idx) => {
              const isLastOdd = currentQuestion.options.length % 2 !== 0 && idx === currentQuestion.options.length - 1;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group flex justify-between items-center relative overflow-hidden",
                    isLastOdd && "md:col-span-2"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] md:text-xs font-medium relative z-10 pr-3 leading-snug text-white/90">{option.text}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-primary relative z-10 shrink-0" />
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-start">
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                onClick={goBack}
                className="text-white/40 hover:text-white hover:bg-white/5 h-8 px-3 transition-all text-[8px] font-bold tracking-widest"
              >
                <ArrowLeft className="w-3 h-3 mr-1.5" />
                KEMBALI
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
