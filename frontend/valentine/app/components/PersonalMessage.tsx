'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from './ThemeContext';

export default function PersonalMessage() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen py-20 px-6 md:px-12 flex items-center justify-center"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)'
          : '#FFF6EB'
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          className={`text-xl md:text-2xl mb-12 font-(--font-playfair) italic ${
            theme === 'dark' ? 'text-white' : 'text-[#7B1E3B]'
          }`}
        >
          My butki, just me speaking from my heart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl"
        >
          <video
            controls
            className="w-full rounded-2xl mb-6 shadow-lg"
            poster="/media/photos/together-1.jpg"
          >
            <source src="/personal-message.mp4" type="video/mp4" />
            <source src="/personal-message.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-left"
          >
            <p className="text-lg md:text-xl text-[#4E342E] font-(--font-inter) leading-relaxed mb-4">
              My beautiful butki, I don&apos;t say this enough, but loving you feels like the most peaceful joy. And that gentle calm means more
              to me than any excitement ever could.
            </p>
            <p className="text-lg md:text-xl text-[#4E342E] font-(--font-inter) leading-relaxed">
              I don&apos;t need grand gestures, my butki. I just need you, exactly as you are - wonderfully unique and perfectly you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
