'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SectionTransition({ children, delay = 0 }: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 30,
        scale: 0.98
      }}
      transition={{
        duration: 1.0,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative"
    >
      {/* Romantic floating hearts */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`
              }}
              initial={{
                scale: 0,
                opacity: 0,
                y: 10
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.7, 0],
                y: [10, -20, -50],
                rotate: [0, 90, 180]
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                delay: Math.random() * 1.2,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              {['💕', '💖', '💗', '💓', '💘', '💕'][i % 6]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Soft romantic shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-transparent to-purple-50/40 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={isInView ? {
          opacity: [0, 0.2, 0]
        } : { opacity: 0 }}
        transition={{
          duration: 2.5,
          delay: delay + 0.5,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{
          filter: 'brightness(0.95) saturate(0.9)'
        }}
        animate={isInView ? {
          filter: 'brightness(1) saturate(1)'
        } : {
          filter: 'brightness(0.95) saturate(0.9)'
        }}
        transition={{
          duration: 1.2,
          delay: delay + 0.3,
          ease: 'easeOut'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}