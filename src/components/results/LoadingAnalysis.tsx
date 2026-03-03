
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, Database, BarChart3 } from 'lucide-react';

export const LoadingAnalysis: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "Mengumpulkan data respons...", icon: <Database className="w-6 h-6" /> },
    { text: "Menganalisis profil psikometrik...", icon: <Search className="w-6 h-6" /> },
    { text: "Menghitung bobot program studi...", icon: <Cpu className="w-6 h-6" /> },
    { text: "Menyiapkan rekomendasi personal...", icon: <BarChart3 className="w-6 h-6" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-6 text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-4 border-primary border-r-4 border-r-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-b-4 border-secondary border-l-4 border-l-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={step}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-primary"
          >
            {steps[step].icon}
          </motion.div>
        </div>
      </div>

      <h2 className="text-3xl font-headline font-bold mb-4 tracking-tight">
        Menganalisis Minatmu
      </h2>
      
      <div className="h-8 overflow-hidden">
        <motion.p
          key={step}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-muted-foreground text-lg"
        >
          {steps[step].text}
        </motion.p>
      </div>

      <div className="mt-12 w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
};
