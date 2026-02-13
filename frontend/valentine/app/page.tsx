'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import PhotoAlbumLanding from './components/PhotoAlbumLanding';
import MemoryBook from './components/MemoryBook';
import LoveNotesWall from './components/LoveNotesWall';
import AlbumSection from './components/AlbumSection';
import VideoMemories from './components/VideoMemories';
import PersonalMessage from './components/PersonalMessage';
import FinalClosing from './components/FinalClosing';
import SectionTransition from './components/SectionTransition';
//import ComfortSection from './components/ComfortSection';
//import QRHeartGenerator from './components/QRHeartGenerator';
import { ThemeProvider, useTheme } from './components/ThemeContext';

function HomeContent() {
  const { theme, toggleTheme } = useTheme();
  const [showLanding, setShowLanding] = useState(true);

  const handleNext = () => {
    setShowLanding(false);
  };

  // Memoize floating emojis to avoid Math.random in render
  const floatingEmojis = useMemo(() => {
    const darkEmojis = ['✨', '⭐', '🌙', '💎', '🌟', '💫', '🌙'];
    const lightEmojis = ['💖', '💕', '🍫', '🍬', '🧸', '🌸', '💝', '🌹'];
    
    return [...Array(25)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      xOffset: Math.random() * 20 - 10,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      darkEmoji: darkEmojis[i % darkEmojis.length],
      lightEmoji: lightEmojis[i % lightEmojis.length]
    }));
  }, []);

  // Memoize golden accents for dark mode
  const goldAccents = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <main className="relative min-h-screen" style={{
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0f0f0f 100%)'
        : 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 25%, #f9a8d4 50%, #f472b6 75%, #fce7f3 100%)'
    }}>
      {/* Dark Mode Toggle Button */}
      {!showLanding && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={toggleTheme}
          className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 to-black text-yellow-400 hover:from-gray-800 hover:to-gray-900 border border-yellow-400/20'
              : 'bg-white text-gray-800 hover:bg-gray-50 border border-pink-200'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>
      )}

      {/* Floating Emojis */}
      {!showLanding && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {floatingEmojis.slice(0, theme === 'dark' ? 25 : 15).map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: emoji.left,
                top: emoji.top,
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, emoji.xOffset, 0],
                rotate: [0, theme === 'dark' ? 360 : 15, theme === 'dark' ? 0 : -15, 0],
                scale: [1, theme === 'dark' ? 1.3 : 1.1, 1],
              }}
              transition={{
                duration: theme === 'dark' ? emoji.duration + 1 : emoji.duration,
                repeat: Infinity,
                delay: emoji.delay,
                ease: 'easeInOut',
              }}
            >
              {theme === 'dark' ? emoji.darkEmoji : emoji.lightEmoji}
            </motion.div>
          ))}
        </div>
      )}

      {/* Dark Mode Golden Accents */}
      {theme === 'dark' && !showLanding && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
          {goldAccents.map((accent, i) => (
            <motion.div
              key={`gold-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: accent.left,
                top: accent.top,
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: accent.duration,
                repeat: Infinity,
                delay: accent.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {showLanding ? (
          <PhotoAlbumLanding key="landing" onComplete={handleNext} />
        ) : (
          <div key="content" className="smooth-scroll-section">
            <section className="snap-start" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)'
                : 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #fce7f3 100%)'
            }}>
              <SectionTransition delay={0.1}>
                <MemoryBook />
              </SectionTransition>
            </section>

            <section className="snap-start">
              <SectionTransition delay={0.15}>
                <AlbumSection />
              </SectionTransition>
            </section>

            <section className="snap-start" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
                : 'linear-gradient(135deg, #FFE4E1 0%, #FFF6EB 50%, #F0E6FF 100%)'
            }}>
              <SectionTransition delay={0.2}>
                <LoveNotesWall />
              </SectionTransition>
            </section>

            <section className="snap-start" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)'
                : 'linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 50%, #F8E8EE 100%)'
            }}>
              <SectionTransition delay={0.4}>
                <VideoMemories />
              </SectionTransition>
            </section>

            <section className="snap-start" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)'
                : '#FFF6EB'
            }}>
              <SectionTransition delay={0.6}>
                <PersonalMessage />
              </SectionTransition>
            </section>

            <section className="snap-start" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0f0f0f 100%)'
                : 'linear-gradient(135deg, #FFF6EB 0%, #F7E5D7 25%, #FFE4E1 50%, #F0E6FF 75%, #FFF6EB 100%)'
            }}>
              <SectionTransition delay={0.7}>
                <FinalClosing />
              </SectionTransition>
            </section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
