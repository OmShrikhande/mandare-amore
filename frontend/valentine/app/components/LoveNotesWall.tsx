'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Note {
  id: number;
  text: string;
  rotation: number;
  color: string;
}

const notes: Note[] = [
  {
    id: 1,
    text: 'My gunnu, you make every day feel like a beautiful adventure',
    rotation: -2,
    color: '#FFF9C4',
  },
  {
    id: 2,
    text: 'Being with you, gunnu, feels like coming home to paradise',
    rotation: 3,
    color: '#F8BBD0',
  },
  {
    id: 3,
    text: "gunnu, you're so wonderfully unique - that's your magic",
    rotation: -4,
    color: '#E1BEE7',
  },
  {
    id: 4,
    text: "My heart finds peace in your gentle presence, gunnu",
    rotation: 2,
    color: '#FFCCBC',
  },
  {
    id: 5,
    text: 'gunnu, your smile could light up the darkest night',
    rotation: -3,
    color: '#C5E1A5',
  },
  {
    id: 6,
    text: "Every moment with you feels like a precious gift, my gunnu",
    rotation: 4,
    color: '#B3E5FC',
  },
  {
    id: 7,
    text: 'gunnu, you inspire me to be the best version of myself',
    rotation: -1,
    color: '#FFECB3',
  },
  {
    id: 8,
    text: "I'm endlessly grateful for your love, my beautiful gunnu",
    rotation: 2,
    color: '#F8BBD0',
  },
];

function StickyNote({ note, index }: { note: Note; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50, rotate: 0, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: note.rotation, scale: 1 }
          : { opacity: 0, y: -50, rotate: 0, scale: 0.8 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 10,
        y: -5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: note.color,
      }}
      className="p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-500 relative overflow-hidden"
    >
      {/* Valentine's sparkle effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              className="absolute text-lg"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Heart decoration */}
      <motion.div
        className="absolute top-2 right-2 text-lg"
        animate={isHovered ? {
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        💕
      </motion.div>

      <motion.p
        className="text-lg md:text-xl font-[var(--font-caveat)] text-[#4E342E] leading-relaxed relative z-10"
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {note.text}
      </motion.p>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-transparent"
        animate={isHovered ? {
          borderColor: ['transparent', 'rgba(123, 30, 59, 0.3)', 'transparent']
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function LoveNotesWall() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#FFE4E1] via-[#FFF6EB] to-[#F0E6FF] relative overflow-hidden">
      {/* Valentine's themed floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 360],
              y: [0, -150, -300]
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${10 + Math.random() * 70}%`
            }}
          >
            {['💌', '💕', '💖', '💗', '💓', '💘', '🌹', '🌸', '🌷', '✨'][i % 10]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            💌 Love Notes for My gunnu 💌
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Every note is a piece of my heart, written just for you
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-[#7B1E3B] font-[var(--font-playfair)] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            This Valentine&apos;s magic happens only once ✨
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <StickyNote key={note.id} note={note} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
