'use client';

import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  emoji: string;
  mood?: string;
  image: string;
}

const diaryEntries: DiaryEntry[] = [
  {
    id: 1,
    title: "The Day We Met",
    content: "Dear Diary,\n\nToday was the most magical day of my life. I met butki for the first time, and it felt like the universe had finally aligned. Her smile could light up the darkest room, and her laughter is like music to my soul. I knew from that very first moment that she was someone special.\n\nI can't stop thinking about her eyes - so full of warmth and kindness. Every conversation we had felt natural, like we'd known each other forever. I'm falling for her, and it feels wonderful.\n\nLove,\nYour devoted admirer",
    emoji: "✨",
    mood: "Excited",
    image: "/media/photos/her-1.jpg"
  },
  {
    id: 2,
    title: "Sweet Conversations",
    content: "Dear Diary,\n\nWe talked for hours today. butki has the most beautiful mind - her thoughts are so deep and her dreams so inspiring. She told me about her hopes for the future, and I could see myself being part of that future.\n\nHer voice is so gentle and caring. When she laughs, it makes my heart skip a beat. I love how she listens intently and makes me feel truly heard.\n\nEvery moment with her feels like a treasure. I can't wait to create more memories together.\n\nWith all my love",
    emoji: "💬",
    mood: "Happy",
    image: "/media/photos/together-1.jpg"
  },
  {
    id: 3,
    title: "Her Beautiful Soul",
    content: "Dear Diary,\n\nToday I saw butki's kindness in action. She helped someone in need without a second thought, and it reminded me why I fell for her. Beyond her stunning beauty lies a soul so pure and gentle.\n\nShe makes the world a better place just by being in it. Her compassion, her warmth, her genuine care for others - these are the qualities that make her extraordinary.\n\nI'm so grateful to have found someone with such a beautiful heart. She inspires me to be a better person every day.\n\nForever yours",
    emoji: "💕",
    mood: "Grateful",
    image: "/media/photos/her-2.jpg"
  },
  {
    id: 4,
    title: "Our Shared Dreams",
    content: "Dear Diary,\n\nWe talked about our future today, and it filled me with so much joy. butki dreams of traveling the world, learning new things, and making a positive impact. I can see myself right there beside her.\n\nEvery moment with her feels like the beginning of forever. Our dreams align in beautiful ways, and I can't wait to build our future together.\n\nShe makes me believe in soulmates and destiny. With butki, anything feels possible.\n\nDreaming of tomorrow,\nYour hopeful romantic",
    emoji: "🌟",
    mood: "Hopeful",
    image: "/media/photos/together-2.jpg"
  },
  {
    id: 5,
    title: "Her Gentle Touch",
    content: "Dear Diary,\n\nToday butki showed me her gentle side. The way she cares for others, the kindness in her eyes, the warmth of her presence - these are the things that make her truly extraordinary.\n\nHer touch is so gentle, her words so kind. She has this amazing ability to make everyone around her feel special and loved.\n\nI feel so lucky to be on the receiving end of her care. She makes me feel cherished and valued in ways I never thought possible.\n\nWith a heart full of love",
    emoji: "🤗",
    mood: "Loved",
    image: "/media/photos/her-3.jpg"
  },
  {
    id: 6,
    title: "Forever My Love",
    content: "Dear Diary,\n\nMy heart beats for butki. Every day I fall more in love with who she is and who we can be together. She brings out the best in me and makes me want to be a better person.\n\nHer smile, her laugh, her kindness, her dreams - everything about her is perfect to me. I can't imagine my life without her now.\n\nThis is just the beginning of our beautiful story. I promise to love her with all my heart, every single day.\n\nForever and always,\nHer devoted love",
    emoji: "💖",
    mood: "In Love",
    image: "/media/photos/together-3.jpg"
  }
];

// Paper Clip Component
const PaperClip = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute w-6 h-12 z-30 pointer-events-none ${className}`}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <div className="absolute inset-0 border-2 border-slate-400 rounded-full shadow-sm" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30%, 20% 30%, 20% 80%, 80% 80%, 80% 20%, 0% 20%)' }} />
    <div className="absolute inset-0.5 border-2 border-slate-300 rounded-full" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40%, 30% 40%, 30% 70%, 70% 70%, 70% 30%, 0% 30%)' }} />
  </motion.div>
);

export default function MemoryBook() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  // Motion values for drag interaction
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-300, 0, 300], [-25, -4.6, 5]);

  // Handle drag start
  const handleDragStart = () => {
    if (isPageTurning || !isOpen) return;
    setIsDragging(true);
  };

  // Handle drag end with realistic page turning
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 100;
    const velocity = info.velocity.x;

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 && currentPage > 0) {
        // Swipe Right -> Previous Page
        setTurnDirection('prev');
        setIsPageTurning(true);
        setTimeout(() => {
          setCurrentPage(prev => prev - 1);
          setIsPageTurning(false);
          setTurnDirection(null);
        }, 1000);
      } else if (info.offset.x < 0 && currentPage < diaryEntries.length - 1) {
        // Swipe Left -> Next Page
        setTurnDirection('next');
        setIsPageTurning(true);
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setIsPageTurning(false);
          setTurnDirection(null);
        }, 1000);
      }
    }
    // Animate x back to 0 smoothly instead of setting it
    x.set(0);
  };

  const nextPage = () => {
    if (currentPage < diaryEntries.length - 1 && !isPageTurning && isOpen) {
      setTurnDirection('next');
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 1000);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isPageTurning && isOpen) {
      setTurnDirection('prev');
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 1000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden relative z-999"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0f0f0f 100%)'
          : 'linear-gradient(135deg, #FFE4E1 0%, #FFF6EB 50%, #F0E6FF 100%)',
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >

        <motion.h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-serif italic ${
            theme === 'dark' ? 'text-white' : 'text-pink-800'
          }`}
          style={{
            fontFamily: '"Dancing Script", cursive',
            textShadow: theme === 'dark'
              ? '3px 3px 6px rgba(0, 0, 0, 0.8)'
              : '3px 3px 6px rgba(255, 192, 203, 0.3)',
          }}
        >
          💖 Our Romantic Story 💖
        </motion.h2>
        <p className={`text-xl font-medium italic ${
          theme === 'dark' ? 'text-white/90' : 'text-pink-700'
        }`} style={{ fontFamily: '"Quicksand", sans-serif' }}>
          Every page is a piece of my heart, butki... 💕
        </p>
      </motion.div>



      {/* Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{ top: '10%', left: '10%' }}
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute text-5xl opacity-15"
          style={{ top: '20%', right: '15%' }}
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          😘
        </motion.div>
        <motion.div
          className="absolute text-4xl opacity-25"
          style={{ bottom: '25%', left: '5%' }}
          animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🤗
        </motion.div>
        <motion.div
          className="absolute text-5xl opacity-20"
          style={{ bottom: '15%', right: '10%' }}
          animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          💖
        </motion.div>
        <motion.div
          className="absolute text-4xl opacity-15"
          style={{ top: '60%', left: '85%' }}
          animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          😍
        </motion.div>
        <motion.div
          className="absolute text-3xl opacity-20"
          style={{ top: '40%', right: '80%' }}
          animate={{ y: [0, 7, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          🥰
        </motion.div>
      </div>

      {/* 3D Diary Container */}
      <div className="relative w-full max-w-4xl mx-auto h-112.5 flex items-center justify-center" style={{ perspective: '3000px' }}>
        {/* Realistic Book Shadow */}
        <motion.div
          className="absolute w-[90%] h-7.5 bg-black/15 rounded-[100%] blur-3xl"
          style={{ transform: 'translateY(220px) rotateX(85deg)' }}
          animate={{
            scale: isDragging ? 0.98 : 1,
            opacity: isDragging ? 0.1 : 0.15,
          }}
        />

        {/* The Book Structure */}
        <motion.div
          ref={bookRef}
          className="relative w-full h-full flex"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(5deg)',
          }}
          animate={{
            rotateY: isDragging ? x.get() / 100 : 0,
          }}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* Spine - Shallower for 165-degree flatter look */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-5 shadow-xl"
               style={{
                 transform: 'translateZ(0.3px)',
                 background: theme === 'dark'
                   ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
                   : 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                 borderRadius: '2px',
                 boxShadow: theme === 'dark'
                   ? 'inset -8px 0 20px rgba(0, 0, 0, 0.8), inset 8px 0 20px rgba(0, 0, 0, 0.7), -10px 15px 40px rgba(0,0,0,0.8)'
                   : 'inset -8px 0 20px rgba(255,192,203,0.3), inset 8px 0 20px rgba(255,192,203,0.2), -10px 15px 40px rgba(255,192,203,0.3)'
               }}>
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-amber-400/10" />
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-amber-400/10" />
          </div>

          {/* Left Side (Cover + Page Stack) */}
          <div className="relative w-1/2 h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Left Cover - Adjusted rotation for 165deg total angle (7.5deg per side) */}
            <motion.div
              className="absolute inset-0 rounded-l-xl shadow-2xl demo cursor-pointer"
              style={{
                transformOrigin: 'right center',
                transform: 'translateZ(-10px)',
                boxShadow: theme === 'dark'
                  ? '-10px 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)'
                  : '-10px 15px 40px rgba(255,192,203,0.3), 0 0 20px rgba(139, 0, 0, 0.4), 0 0 40px rgba(128, 0, 0, 0.2), inset 0 0 20px rgba(139, 0, 0, 0.1)',
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFD700 50%, #FFD700 100%)'
                  : 'linear-gradient(135deg, #800020 0%, #8B0000 50%, #800020 100%)',
              }}
              animate={{
                rotateY: 4.6,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="absolute inset-3 border border-amber-400/10 rounded-l-lg pointer-events-none" />

            </motion.div>

            {/* Page Stack (Left) */}
            {isOpen && [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-y-2 inset-x-2 right-0 bg-[#fffdf5] rounded-l-md border-r border-gray-100"
                style={{
                  transformOrigin: 'right center',
                  transform: `rotateY(5deg) translateZ(${-5 - i * 1}px)`
                }}
              />
            ))}

            {/* Left Page (Image Side) */}
            {isOpen && (
              <motion.div
                className="absolute inset-y-2 inset-x-2 right-0 bg-white rounded-l-sm shadow-inner overflow-hidden z-10"
                style={{
                  transformOrigin: 'right center',
                  rotateY: 4.6,
                  translateZ: 0,
                  backgroundImage: 'radial-gradient(circle at 100% 50%, #fffdfa 0%, #ffffff 100%)',
                  opacity: (isPageTurning && turnDirection === 'prev') ? 0 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative h-full w-full p-6 flex flex-col items-center justify-center"
                  >
                    <div className="relative w-full aspect-4/5 max-w-50 rounded-sm shadow-lg p-2 bg-white -rotate-1 transition-transform hover:rotate-0 duration-500">
                      <PaperClip className="-top-4 left-1/2 -translate-x-1/2 rotate-12 scale-90" />
                      <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
                        <img
                          src={diaryEntries[currentPage].image}
                          alt="Memory"
                          className="w-full h-full object-cover grayscale-5"
                        />
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Right Side (Cover + Page Stack) */}
          <div className="relative w-1/2 h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Right Cover */}
            <motion.div
              className="absolute inset-0 rounded-r-xl shadow-2xl cursor-pointer"
              style={{
                transformOrigin: 'left center',
                transform: 'translateZ(-10px)',
                boxShadow: theme === 'dark'
                  ? '10px 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)'
                  : '10px 15px 40px rgba(255,192,203,0.3), 0 0 20px rgba(139, 0, 0, 0.4), 0 0 40px rgba(128, 0, 0, 0.2), inset 0 0 20px rgba(139, 0, 0, 0.1)',
                background: theme === 'dark'
                  ? 'linear-gradient(135deg,#FFD700 0%, #FFD700 50%, #FFD700 100%)'
                  : 'linear-gradient(135deg, #800020 0%, #8B0000 50%, #800020 100%)',
              }}
              animate={{
                rotateY: isOpen ? -4.6 : 0,
                opacity: 1,
              }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="absolute inset-3 border border-red-400/10 rounded-r-lg pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold italic relative" style={{
                  fontFamily: '"Dancing Script", cursive',
                  background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FFF8DC 75%, #FFD700 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 8px rgba(255, 215, 0, 0.8), 0 0 16px rgba(255, 215, 0, 0.6), 0 0 24px rgba(255, 215, 0, 0.4), 0 0 32px rgba(255, 215, 0, 0.2)',
                  filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.9)) brightness(1.3) contrast(1.2) saturate(1.1)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  boxShadow: 'inset 0 0 10px rgba(255, 215, 0, 0.2), 0 0 20px rgba(255, 215, 0, 0.3)'
                }}>
                  mi amor
                </span>
                {/* Sparkling particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300 text-xs"
                    style={{
                      left: `${40 + Math.sin(i * 45 * Math.PI / 180) * 60}px`,
                      top: `${40 + Math.cos(i * 45 * Math.PI / 180) * 60}px`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Page Stack (Right) */}
            {isOpen && [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-y-2 inset-x-2 left-0 bg-[#fffdf5] rounded-r-md border-l border-gray-100"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotateY(-5deg) translateZ(${-5 - i * 1}px)`
                }}
              />
            ))}

            {/* Right Page (Text Side) */}
            {isOpen && (
              <motion.div
                className="absolute inset-y-2 inset-x-2 left-0 bg-white rounded-r-sm shadow-inner cursor-grab active:cursor-grabbing z-10"
                style={{
                  transformOrigin: 'left center',
                  backgroundImage: 'linear-gradient(to right, #ffffff 0%, #fffdfa 100%)',
                  x,
                  rotateY,
                  opacity: isPageTurning && turnDirection === 'next' ? 0 : 1,
                }}
                drag={!isPageTurning ? "x" : false}
                dragConstraints={{ left: -300, right: 300 }}
                dragElastic={0.5}
                onDragStart={handleDragStart}
                onDragEnd={(event, info) => {
                  handleDragEnd(event as MouseEvent | PointerEvent | TouchEvent, info);
                }}
              >
                <AnimatePresence mode="wait">
                  <DiaryPageContent
                    key={currentPage}
                    entry={diaryEntries[currentPage]}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Page Turn Overlay */}
          <AnimatePresence>
            {isPageTurning && (
              <motion.div
                className="absolute left-1/2 top-2 bottom-2 w-[calc(50%-8px)] origin-left z-50"
                initial={{ rotateY: turnDirection === 'next' ? -4 : -176 }}
                animate={{ rotateY: turnDirection === 'next' ? -176 : -4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of flipping page */}
                <div className="absolute inset-0 bg-white backface-hidden shadow-xl rounded-r-md border-l border-gray-50">
                  <div className="absolute inset-0 bg-linear-to-l from-black/5 to-transparent" />
                </div>
                {/* Back of flipping page */}
                <div className="absolute inset-0 bg-[#fffdfa] backface-hidden rounded-l-md border-r border-gray-50 shadow-xl" 
                     style={{ transform: 'rotateY(180deg)' }}>
                  <div className="absolute inset-0 bg-linear-to-r from-black/5 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                     <Heart size={80} className="text-[#8B1538] fill-[#8B1538]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation UI */}
      {isOpen && (
        <div className="relative z-100 mt-24 flex flex-col items-center gap-8">
          <div className="flex items-center gap-16">
            <motion.button
              onClick={prevPage}
              disabled={currentPage === 0 || isPageTurning}
              className="p-5 bg-white rounded-full shadow-2xl border border-rose-100 text-rose-500 disabled:opacity-20 hover:text-rose-600 transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={36} />
            </motion.button>

          <div className="px-10 py-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4">
            <span className="text-[#8B1538] font-serif text-2xl italic" style={{ fontFamily: '"Dancing Script", cursive' }}>
              Entry {currentPage + 1} of {diaryEntries.length}
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="text-rose-500 fill-rose-500" size={24} />
            </motion.div>
          </div>

          <motion.button
            onClick={nextPage}
            disabled={currentPage === diaryEntries.length - 1 || isPageTurning}
            className="p-5 bg-white rounded-full shadow-2xl border border-rose-100 text-rose-500 disabled:opacity-20 hover:text-rose-600 transition-colors"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={36} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-[#6B4423]/60 italic font-medium tracking-widest text-xs uppercase" style={{ fontFamily: '"Quicksand", sans-serif' }}>
            Interactive Diary Experience
          </p>
          <p className="text-[#6B4423]/30 text-[10px] mt-2 tracking-[0.2em] font-medium">
            SWIPE TO TURN THE PAGE
          </p>
        </motion.div>
        </div>
      )}
    </motion.section>
  );
}

// Separate Content Component for AnimatePresence
function DiaryPageContent({ entry }: { entry: DiaryEntry }) {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative h-full p-8 flex flex-col"
    >
      {/* Lined Paper Effect */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px)',
             backgroundSize: '100% 32px',
             top: '110px',
             left: '20px',
             right: '20px'
           }} />

      <div className="mb-6 relative z-10">
        <h3 className="text-3xl font-bold text-[#8B1538] mb-1 italic" style={{ fontFamily: '"Dancing Script", cursive' }}>
          {entry.title}
        </h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto relative z-10">
        {entry.content.split('\n').map((line, i) => (
          <p
            key={i}
            className="text-gray-700 text-xl leading-8 italic"
            style={{
              fontFamily: '"Dancing Script", cursive',
              color: '#374151'
            }}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="mt-4 flex justify-end relative z-0">
        <span className="text-4xl filter drop-shadow-sm">
          {entry.emoji}
        </span>
      </div>
    </motion.div>
  );
}