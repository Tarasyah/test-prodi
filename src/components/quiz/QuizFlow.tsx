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

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-end text-xs font-black text-primary uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Phase {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
          </div>
          <span>{Math.round(progress)}% Sync</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="animate-border-rainbow p-6 md:p-10 rounded-[2rem] shadow-2xl bg-black/40 backdrop-blur-sm"
        >
          <div className="mb-8 text-center">
            <h2 className="text-xl md:text-3xl font-headline font-bold mb-3 leading-tight text-white">
              {currentQuestion.text}
            </h2>
            <div className="h-1 w-12 bg-primary/40 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isLastOdd = currentQuestion.options.length % 2 !== 0 && idx === currentQuestion.options.length - 1;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group flex justify-between items-center relative overflow-hidden",
                    isLastOdd && "md:col-span-2"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm md:text-base font-medium relative z-10 pr-4 leading-snug text-white/90">{option.text}</span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-primary relative z-10 shrink-0" />
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-start">
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                onClick={goBack}
                className="text-white/50 hover:text-white hover:bg-white/5 h-10 px-4 transition-all text-xs font-bold tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                KEMBALI
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
