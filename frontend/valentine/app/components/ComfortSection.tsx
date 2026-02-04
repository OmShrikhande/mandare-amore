'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ComfortSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [teddyClicked, setTeddyClicked] = useState(false);
  const [chocolateClicked, setChocolateClicked] = useState(false);

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-[#FFF6EB]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-4xl mb-16 text-[#7B1E3B] font-[var(--font-playfair)] text-center"
        >
          My GUNU, you&apos;re my sweetest comfort.
          <br />
          <span className="text-2xl md:text-3xl">Forever and always.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTeddyClicked(!teddyClicked)}
              className="cursor-pointer mb-6"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="60" r="30" fill="#8D6E63" />
                <circle cx="150" cy="60" r="30" fill="#8D6E63" />
                <ellipse cx="100" cy="100" rx="60" ry="70" fill="#A1887F" />
                <circle cx="85" cy="90" r="8" fill="#4E342E" />
                <circle cx="115" cy="90" r="8" fill="#4E342E" />
                <ellipse cx="100" cy="110" rx="15" ry="20" fill="#8D6E63" />
                <path
                  d="M 85 125 Q 100 135 115 125"
                  stroke="#4E342E"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="140" r="25" fill="#A1887F" />
                <circle cx="140" cy="140" r="25" fill="#A1887F" />
                <ellipse cx="100" cy="180" rx="20" ry="15" fill="#A1887F" />
                <ellipse cx="100" cy="195" rx="20" ry="15" fill="#A1887F" />
                <path
                  d="M 75 100 Q 70 105 75 110"
                  fill="#F7C6D0"
                  opacity="0.6"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                teddyClicked
                  ? { opacity: 1, height: 'auto' }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] text-center leading-relaxed bg-white/60 p-6 rounded-2xl">
                My GUNU, you make me feel so safe and loved — not because you try, but because you&apos;re wonderfully you.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChocolateClicked(!chocolateClicked)}
              className="cursor-pointer mb-6"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="40"
                  y="60"
                  width="120"
                  height="100"
                  rx="10"
                  fill="#5D4037"
                />
                <line x1="100" y1="60" x2="100" y2="160" stroke="#4E342E" strokeWidth="2" />
                <line x1="40" y1="110" x2="160" y2="110" stroke="#4E342E" strokeWidth="2" />
                <line x1="70" y1="60" x2="70" y2="160" stroke="#4E342E" strokeWidth="1" />
                <line x1="130" y1="60" x2="130" y2="160" stroke="#4E342E" strokeWidth="1" />
                <line x1="40" y1="85" x2="160" y2="85" stroke="#4E342E" strokeWidth="1" />
                <line x1="40" y1="135" x2="160" y2="135" stroke="#4E342E" strokeWidth="1" />
                {chocolateClicked && (
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    d="M 50 70 L 150 150 M 150 70 L 50 150"
                    stroke="#7B1E3B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                <path
                  d="M 60 40 Q 100 20 140 40"
                  fill="#8D6E63"
                  opacity="0.3"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                chocolateClicked
                  ? { opacity: 1, height: 'auto' }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="overflow-hidden"
            >
              <p className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] text-center leading-relaxed bg-white/60 p-6 rounded-2xl">
                My GUNU, you&apos;re sweeter than any chocolate. What I feel for you will last forever.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
