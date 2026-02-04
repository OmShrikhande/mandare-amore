'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PersonalMessage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen py-20 px-6 md:px-12 bg-[#FFF6EB] flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-xl md:text-2xl mb-12 text-[#7B1E3B] font-[var(--font-playfair)] italic"
        >
          My GUNU, just me speaking from my heart.
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
            poster="/video-poster.jpg"
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
            <p className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed mb-4">
              My beautiful GUNU, I don&apos;t say this enough, but loving you feels like the most peaceful joy. And that gentle calm means more
              to me than any excitement ever could.
            </p>
            <p className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed">
              I don&apos;t need grand gestures, my GUNU. I just need you, exactly as you are - wonderfully unique and perfectly you.
            </p>
          </motion.div>

          <div className="mt-8 p-4 bg-[#F7C6D0]/30 rounded-xl border-2 border-dashed border-[#F7C6D0]">
            <p className="text-sm text-[#7B1E3B] font-[var(--font-inter)]">
              <strong>Note:</strong> Place your video file as{' '}
              <code className="bg-[#4E342E]/10 px-2 py-1 rounded">
                /public/personal-message.mp4
              </code>{' '}
              <br />
              (or .webm format). You can also add a poster image as{' '}
              <code className="bg-[#4E342E]/10 px-2 py-1 rounded">/public/video-poster.jpg</code>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
