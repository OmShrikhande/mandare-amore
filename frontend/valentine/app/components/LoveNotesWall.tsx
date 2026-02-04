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
    text: 'You make ordinary days feel intentional',
    rotation: -2,
    color: '#FFF9C4',
  },
  {
    id: 2,
    text: 'Being with you feels like exhaling',
    rotation: 3,
    color: '#F8BBD0',
  },
  {
    id: 3,
    text: "You don't try to be special, you just are",
    rotation: -4,
    color: '#E1BEE7',
  },
  {
    id: 4,
    text: "You feel like home in a way I can't explain",
    rotation: 2,
    color: '#FFCCBC',
  },
  {
    id: 5,
    text: 'Your presence calms something in me',
    rotation: -3,
    color: '#C5E1A5',
  },
  {
    id: 6,
    text: "I notice the small things you don't think matter. They do.",
    rotation: 4,
    color: '#B3E5FC',
  },
  {
    id: 7,
    text: 'You make me want to be more present',
    rotation: -1,
    color: '#FFECB3',
  },
  {
    id: 8,
    text: "I'm grateful for every moment, even the quiet ones",
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
      initial={{ opacity: 0, y: -50, rotate: 0 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: note.rotation }
          : { opacity: 0, y: -50, rotate: 0 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        backgroundColor: note.color,
      }}
      className="p-6 rounded-lg shadow-lg cursor-pointer transition-shadow duration-300"
    >
      <p className="text-lg md:text-xl font-[var(--font-caveat)] text-[#4E342E] leading-relaxed">
        {note.text}
      </p>
    </motion.div>
  );
}

export default function LoveNotesWall() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-[#FFF6EB]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-4xl mb-16 text-[#7B1E3B] font-[var(--font-playfair)] text-center"
        >
          Things I don&apos;t always say out loud,
          <br />
          but feel often.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <StickyNote key={note.id} note={note} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
