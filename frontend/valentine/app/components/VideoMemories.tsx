'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from './ThemeContext';

interface Photo {
  src: string;
  title: string;
  alt?: string;
}

const photos: Photo[] = [
  { src: '/media/photos/her-1.jpg', title: 'Beautiful You', alt: 'Her smile' },
  { src: '/media/photos/together-1.jpg', title: 'Our Moments', alt: 'Us together' },
  { src: '/media/photos/her-2.jpg', title: 'Sweetest Smile', alt: 'Her smile 2' },
  { src: '/media/photos/together-2.jpg', title: 'Us Together', alt: 'Holding hands' },
  { src: '/media/photos/her-3.jpg', title: 'Graceful', alt: 'Graceful portrait' },
  { src: '/media/photos/together-3.jpg', title: 'Holding Hands', alt: 'Holding hands close' },
  { src: '/media/photos/her-4.jpg', title: 'Stunning', alt: 'Stunning portrait' },
  { src: '/media/photos/together-4.jpg', title: 'Pure Joy', alt: 'Laughing together' },
  { src: '/media/photos/loved one.jpg', title: 'My Loved One', alt: 'Loved one' },
  { src: '/media/photos/kissing.jpg', title: 'Sweet Kisses', alt: 'Kissing' },
  { src: '/media/photos/sleeping.jpg', title: 'Peaceful Sleep', alt: 'Sleeping' },
  { src: '/media/photos/teasing.jpg', title: 'Playful Teasing', alt: 'Teasing' },
  { src: '/media/photos/walking.jpg', title: 'Walking Together', alt: 'Walking' },
  { src: '/media/photos/her-5.jpg', title: 'Radiant', alt: 'Her radiance' },
  { src: '/media/photos/together-5.jpg', title: 'Soulmates', alt: 'Together forever' },
  { src: '/media/photos/her-6.jpg', title: 'Angelic', alt: 'Angelic look' },
];

export default function VideoMemories() {
  const { theme } = useTheme();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  const [modalOpen, setModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  const [floatingAccents] = useState(() => {
    return [...Array(10)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${10 + Math.random() * 70}%`,
      duration: 8 + i,
      delay: i * 0.4,
      emoji: ['💕', '🌸', '✨', '🌹', '💖', '🌷', '🌺', '💗', '💓', '💫'][i % 10]
    }));
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModalOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openPhoto(p: Photo) {
    setActivePhoto(p);
    setModalOpen(true);
  }

  return (
    <section
      className="min-h-screen py-16 px-6 md:px-12 relative overflow-hidden"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)'
            : 'linear-gradient(135deg, #FFEFF2 0%, #FFF6F9 50%, #FDF0F4 100%)'
      }}
    >
      {/* floating accents */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingAccents.map((accent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.35, 0], scale: [0, 1, 0] }}
            transition={{ duration: accent.duration, delay: accent.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute text-2xl"
            style={{ left: accent.left, top: accent.top }}
          >
            {accent.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-12"
        >
          <motion.h2
            className={`text-3xl md:text-4xl mb-4 font-(--font-playfair) leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#7B1E3B]'
            }`}
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💕 Our Cherished Moments 💕
          </motion.h2>

          <motion.p
            className={`text-lg md:text-xl font-(--font-inter) mb-6 ${theme === 'dark' ? 'text-white/80' : 'text-[#4E342E]'}`}
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Photos that tell the story of us ✨
          </motion.p>

          <div className="mx-auto max-w-xl">
            <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#6B4550]'}`}>
              Tap any photo to open a larger view. Made with love.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => openPhoto(p)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg group bg-linear-to-br from-pink-50 to-purple-50"
            >
              <div className="w-full h-full relative">
                <img src={p.src} alt={p.alt || p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full text-left">
                    <div className="text-white font-medium text-sm drop-shadow">{p.title}</div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* modal */}
        {modalOpen && activePhoto && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="relative z-50 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl bg-white">
              <button aria-label="Close" onClick={() => setModalOpen(false)} className="absolute top-3 right-3 z-50 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                ✕
              </button>
              <div className="w-full bg-black">
                <img src={activePhoto.src} alt={activePhoto.alt || activePhoto.title} className="w-full h-[60vh] md:h-[70vh] object-contain bg-black" />
              </div>
              <div className="p-4 bg-white">
                <div className="text-lg font-(--font-playfair) text-center text-[#7B1E3B]">{activePhoto.title}</div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}