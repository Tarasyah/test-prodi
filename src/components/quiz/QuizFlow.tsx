
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '@/lib/major-matcher';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ArrowLeft } from 'lucide-react';

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
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span>Pertanyaan {currentIndex + 1} dari {QUIZ_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Selesai</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-headline font-bold mb-8 leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group flex justify-between items-center"
              >
                <span className="text-lg">{option.text}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-start">
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                onClick={goBack}
                className="text-muted-foreground hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
