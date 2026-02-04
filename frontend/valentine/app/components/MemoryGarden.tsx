'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Memory {
  id: number;
  title: string;
  reflection: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'The Unguarded Smile',
    reflection: 'You smiled without realizing it, and something in me settled into place.',
  },
  {
    id: 2,
    title: 'Ordinary Magic',
    reflection: 'Nothing special happened, and yet it meant everything.',
  },
  {
    id: 3,
    title: 'Quiet Presence',
    reflection: 'You were just there, being yourself, and the world felt softer.',
  },
  {
    id: 4,
    title: 'The Way You Listen',
    reflection: 'Not waiting to speak. Just hearing me. Really hearing me.',
  },
  {
    id: 5,
    title: 'Small Gestures',
    reflection: 'The little things you do that you think go unnoticed. They don\'t.',
  },
  {
    id: 6,
    title: 'Comfortable Silence',
    reflection: 'We didn\'t need to fill the space. It was enough just to share it.',
  },
];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(123, 30, 59, 0.1)' }}
      className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-md transition-all duration-500"
    >
      <h3 className="text-2xl md:text-3xl mb-4 text-[#7B1E3B] font-[var(--font-playfair)]">
        🌸 {memory.title}
      </h3>
      <p className="text-base md:text-lg text-[#4E342E] font-[var(--font-inter)] leading-relaxed">
        {memory.reflection}
      </p>
    </motion.div>
  );
}

export default function MemoryGarden() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-[#FFF6EB]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-4xl mb-16 text-[#7B1E3B] font-[var(--font-playfair)] text-center leading-relaxed"
        >
          Some moments stay with me longer than they should.
          <br />
          <span className="text-2xl md:text-3xl">These are a few of them.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
