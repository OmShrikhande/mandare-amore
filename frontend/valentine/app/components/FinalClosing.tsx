'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface SlowHeart {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
}

const generateSlowHearts = (): SlowHeart[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 25 + Math.random() * 15,
    delay: Math.random() * 20,
    size: 20 + Math.random() * 20,
  }));
};

export default function FinalClosing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-300px' });
  const [hearts] = useState<SlowHeart[]>(generateSlowHearts());

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 3, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FFF6EB 0%, #F7E5D7 100%)',
      }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 0.15, 0.15, 0],
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

      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-2xl md:text-4xl mb-8 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
        >
          There&apos;s nothing I&apos;m asking for.
          <br />
          No expectations. No promises needed.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 2.5, delay: 2.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-xl md:text-3xl mb-12 text-[#4E342E] font-[var(--font-inter)] leading-relaxed"
        >
          I just wanted you to know —
          <br />
          you are deeply loved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, delay: 4.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-5xl text-[#7B1E3B] font-[var(--font-playfair)] italic"
        >
          Always.
        </motion.p>
      </div>
    </motion.section>
  );
}
