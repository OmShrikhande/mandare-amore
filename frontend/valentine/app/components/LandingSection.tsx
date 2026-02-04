'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingHeart {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const generateHearts = (): FloatingHeart[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 10,
    size: 20 + Math.random() * 30,
    opacity: 0.1 + Math.random() * 0.3,
  }));
};

interface LandingSectionProps {
  onNext: () => void;
}

export default function LandingSection({ onNext }: LandingSectionProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    setHearts(generateHearts());
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#FFF6EB]"
    >
      {hearts.length > 0 && hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: {
              duration: heart.duration,
              times: [0, 0.1, 0.9, 1],
            },
          }}
          style={{
            position: 'absolute',
            left: heart.left,
            fontSize: `${heart.size}px`,
          }}
          className="select-none pointer-events-none"
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-5xl mb-8 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
        >
          This isn&apos;t a website.
          <br />
          It&apos;s a small piece of how I feel about you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-lg md:text-xl mb-12 text-[#4E342E] font-[var(--font-inter)]"
        >
          Take your time.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 3.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-10 py-4 bg-[#F7C6D0] text-[#7B1E3B] rounded-full text-lg font-[var(--font-inter)] font-medium shadow-lg hover:shadow-xl transition-shadow duration-500"
        >
          Come closer ❤️
        </motion.button>
      </div>
    </motion.section>
  );
}
