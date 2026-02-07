'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Memory {
  id: number;
  title: string;
  reflection: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'gunnu\'s Magical Smile',
    reflection: 'Your smile lights up my world, gunnu. It\'s the most beautiful thing I\'ve ever seen.',
  },
  {
    id: 2,
    title: 'Your Unique Spirit',
    reflection: 'gunnu, you\'re so wonderfully unique. Every moment with you feels like discovering a new treasure.',
  },
  {
    id: 3,
    title: 'Your Gentle Presence',
    reflection: 'Just being near you, my gunnu, makes everything feel peaceful and right.',
  },
  {
    id: 4,
    title: 'How You Truly Listen',
    reflection: 'You listen with your whole heart, gunnu. It makes me feel so deeply understood.',
  },
  {
    id: 5,
    title: 'Your Thoughtful Gestures',
    reflection: 'Every little thing you do shows how much you care, my beautiful gunnu.',
  },
  {
    id: 6,
    title: 'Our Perfect Harmony',
    reflection: 'With you, gunnu, silence isn\'t empty - it\'s filled with our connection.',
  },
];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{
        duration: 1.2,
        delay: index * 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(123, 30, 59, 0.15)',
        y: -10
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-br from-white/80 to-[#F7C6D0]/30 backdrop-blur-sm p-8 rounded-3xl shadow-lg transition-all duration-700 cursor-pointer relative overflow-hidden"
    >
      {/* Floating hearts animation on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [20, -20, -40]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
            >
              {['💕', '💖', '💗', '💓', '💘'][i]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Sparkle effects */}
      <motion.div
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 right-4 text-2xl"
      >
        ✨
      </motion.div>

      <motion.h3
        className="text-2xl md:text-3xl mb-4 text-[#7B1E3B] font-[var(--font-playfair)] relative z-10"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        🌸 {memory.title}
      </motion.h3>

      <motion.p
        className="text-base md:text-lg text-[#4E342E] font-[var(--font-inter)] leading-relaxed relative z-10"
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {memory.reflection}
      </motion.p>

      {/* Romantic border animation */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-[#F7C6D0]/50"
        animate={isHovered ? {
          borderColor: ['rgba(247, 198, 208, 0.5)', 'rgba(230, 107, 134, 0.8)', 'rgba(247, 198, 208, 0.5)']
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function MemoryGarden() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#FFF6EB] via-[#F7E5D7] to-[#FFE4E1] relative overflow-hidden">
      {/* Floating romantic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              y: [0, -100, -200]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            {['🌸', '💕', '✨', '🌹', '💖', '🌷'][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl mb-6 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💕 My Dearest gunnu 💕
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            This Valentine&apos;s Day is our once-in-a-lifetime moment
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-[#7B1E3B] font-[var(--font-playfair)] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Where every memory becomes a treasure, every smile a keepsake ✨
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:gap-16">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
