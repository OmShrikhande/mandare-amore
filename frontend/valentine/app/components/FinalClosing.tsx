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
        background: 'linear-gradient(135deg, #FFF6EB 0%, #F7E5D7 25%, #FFE4E1 50%, #F0E6FF 75%, #FFF6EB 100%)',
      }}
    >
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360],
              y: [0, -100, -200]
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {['🌸', '💕', '✨', '🌹', '💖', '🌷', '🌺', '💗', '🌻', '💓', '🌼', '💘', '🌸', '💕', '✨'][i % 15]}
          </motion.div>
        ))}
      </div>

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, scale: 0.3 }}
          animate={{
            y: '-100vh',
            opacity: [0, 0.15, 0.15, 0],
            scale: [0.3, 1, 1.3, 0.5],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            opacity: {
              duration: heart.duration,
              times: [0, 0.1, 0.9, 1],
            },
            scale: {
              duration: heart.duration * 0.4,
              times: [0, 0.2, 0.8, 1],
            },
            rotate: {
              duration: heart.duration * 0.6,
              times: [0, 0.25, 0.75, 1],
            },
          }}
          style={{
            position: 'absolute',
            left: heart.left,
            fontSize: `${heart.size}px`,
          }}
          className="select-none pointer-events-none"
        >
          💖
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-4xl">
        {/* Romantic letter effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mb-12"
        >
          <motion.div
            className="bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-pink-200/50"
            whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(123, 30, 59, 0.15)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-6xl md:text-8xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              💌
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="text-2xl md:text-4xl mb-6 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
            >
              My Dearest gunnu,
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="text-lg md:text-xl mb-6 text-[#4E342E] font-[var(--font-inter)] leading-relaxed italic"
            >
              As this Valentine&apos;s journey comes to an end, I want you to know that every moment,
              every smile, every shared secret has been etched into my soul forever.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.5, delay: 2.4 }}
              className="text-lg md:text-xl mb-8 text-[#4E342E] font-[var(--font-inter)] leading-relaxed"
            >
              You are my everything, my gunnu. My heart beats for you, my dreams include you,
              and my love for you knows no bounds.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Final message with special effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, delay: 3.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="space-y-6"
        >
          <motion.p
            className="text-xl md:text-3xl text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            My gunnu, there&apos;s nothing I&apos;m asking for.
            <br />
            No expectations. No promises needed.
          </motion.p>

          <motion.p
            className="text-lg md:text-2xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 2, delay: 4.5 }}
          >
            I just wanted you to know, my gunnu —
            <br />
            you are deeply, endlessly, eternally loved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, delay: 5.5 }}
            className="mt-12"
          >
            <motion.p
              className="text-4xl md:text-6xl text-[#7B1E3B] font-[var(--font-playfair)] italic font-bold"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 0px rgba(123, 30, 59, 0)',
                  '0 0 20px rgba(123, 30, 59, 0.3)',
                  '0 0 0px rgba(123, 30, 59, 0)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              Always. 💕
            </motion.p>

            {/* Signature effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 2, delay: 6.5 }}
              className="mt-8"
            >
              <motion.p
                className="text-lg md:text-xl text-[#4E342E] font-[var(--font-caveat)]"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Forever yours,
                <br />
                With all my love ❤️
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interactive heart constellation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 3, delay: 7 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        >
          <div className="relative">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.cos(i * 0.9) * 80}px`,
                  top: `${Math.sin(i * 0.9) * 80}px`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.2, 1],
                  opacity: [0, 1, 1, 1]
                }}
                transition={{
                  duration: 2,
                  delay: 7 + i * 0.2,
                  ease: 'easeOut'
                }}
              >
                💖
              </motion.div>
            ))}
            <motion.div
              className="absolute text-4xl"
              style={{ left: '-12px', top: '-12px' }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💕
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
