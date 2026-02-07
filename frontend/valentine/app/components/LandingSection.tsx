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
  type: string;
  trail: boolean;
}

const generateHearts = (): FloatingHeart[] => {
  const heartTypes = ['💕', '💖', '💗', '💓', '💘', '💝', '💞', '💟'];
  return Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 12 + Math.random() * 18,
    delay: Math.random() * 8,
    size: 16 + Math.random() * 40,
    opacity: 0.08 + Math.random() * 0.4,
    type: heartTypes[Math.floor(Math.random() * heartTypes.length)],
    trail: Math.random() > 0.7,
  }));
};

interface LandingSectionProps {
  onNext: () => void;
}

export default function LandingSection({ onNext }: LandingSectionProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [showSparkles, setShowSparkles] = useState(false);
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    setHearts(generateHearts());

    // Progressive text animation
    const timer1 = setTimeout(() => setTextPhase(1), 1000);
    const timer2 = setTimeout(() => setTextPhase(2), 3000);
    const timer3 = setTimeout(() => setTextPhase(3), 5500);
    const timer4 = setTimeout(() => setShowSparkles(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF6EB 0%, #F7E5D7 25%, #FFE4E1 50%, #FFF0F5 75%, #FFF6EB 100%)',
      }}
    >
      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.length > 0 && hearts.map((heart) => (
          <div key={heart.id}>
            <motion.div
              initial={{ y: '100vh', opacity: 0, scale: 0.3 }}
              animate={{
                y: '-100vh',
                opacity: [0, heart.opacity, heart.opacity, 0],
                scale: [0.3, 1, 1.4, 0.6],
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
              {heart.type}
            </motion.div>

            {/* Heart trail effect */}
            {heart.trail && (
              <motion.div
                initial={{ y: '100vh', opacity: 0, scale: 0.1 }}
                animate={{
                  y: '-100vh',
                  opacity: [0, heart.opacity * 0.5, 0],
                  scale: [0.1, 0.8, 0.2],
                }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay + 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: `calc(${heart.left} + 20px)`,
                  fontSize: `${heart.size * 0.6}px`,
                }}
                className="select-none pointer-events-none text-pink-200"
              >
                ✨
              </motion.div>
            )}
          </div>
        ))}

        {/* Romantic sparkles */}
        {showSparkles && [...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Central romantic glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-96 h-96 bg-gradient-radial from-pink-200/20 via-transparent to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Progressive romantic text reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl mb-4 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
            animate={textPhase >= 1 ? {
              textShadow: [
                '0 0 0px rgba(123, 30, 59, 0)',
                '0 0 20px rgba(123, 30, 59, 0.3)',
                '0 0 0px rgba(123, 30, 59, 0)'
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            My dearest gunnu 💕
          </motion.h1>

          {textPhase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-xl md:text-2xl text-[#4E342E] font-[var(--font-inter)] italic mb-6"
            >
              This isn&apos;t just a website...
            </motion.p>
          )}

          {textPhase >= 2 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-2xl md:text-4xl text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed mb-8"
            >
              It&apos;s my heart speaking to yours 💖
            </motion.p>
          )}

          {textPhase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="space-y-4"
            >
              <motion.p
                className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)]"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Every beat, every moment, every dream...
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                All for you, my love.
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced romantic button */}
        {textPhase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 2, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative"
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: '0 20px 40px rgba(123, 30, 59, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="relative px-12 py-6 bg-gradient-to-r from-[#F7C6D0] to-[#E6B566] text-[#7B1E3B] rounded-full text-xl font-[var(--font-playfair)] font-semibold shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden"
            >
              {/* Button sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-sm"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              <span className="relative z-10">Let me show you my heart 💕</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
              className="text-sm text-[#4E342E] font-[var(--font-inter)] mt-4 italic"
            >
              Take your time, my love... this is forever 💫
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
