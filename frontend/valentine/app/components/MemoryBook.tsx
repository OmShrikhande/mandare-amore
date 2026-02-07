'use client';

import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  emoji: string;
  mood?: string;
  image: string;
}

const diaryEntries: DiaryEntry[] = [
  {
    id: 1,
    date: "February 14, 2024",
    title: "The Day We Met",
    content: "Dear Diary,\n\nToday was the most magical day of my life. I met Gunnu for the first time, and it felt like the universe had finally aligned. Her smile could light up the darkest room, and her laughter is like music to my soul. I knew from that very first moment that she was someone special.\n\nI can't stop thinking about her eyes - so full of warmth and kindness. Every conversation we had felt natural, like we'd known each other forever. I'm falling for her, and it feels wonderful.\n\nLove,\nYour devoted admirer",
    emoji: "✨",
    mood: "Excited",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800"
  },
  {
    id: 2,
    date: "February 15, 2024",
    title: "Sweet Conversations",
    content: "Dear Diary,\n\nWe talked for hours today. Gunnu has the most beautiful mind - her thoughts are so deep and her dreams so inspiring. She told me about her hopes for the future, and I could see myself being part of that future.\n\nHer voice is so gentle and caring. When she laughs, it makes my heart skip a beat. I love how she listens intently and makes me feel truly heard.\n\nEvery moment with her feels like a treasure. I can't wait to create more memories together.\n\nWith all my love",
    emoji: "💬",
    mood: "Happy",
    image: "https://images.unsplash.com/photo-1522673607200-164883eeca48?q=80&w=800"
  },
  {
    id: 3,
    date: "February 16, 2024",
    title: "Her Beautiful Soul",
    content: "Dear Diary,\n\nToday I saw Gunnu's kindness in action. She helped someone in need without a second thought, and it reminded me why I fell for her. Beyond her stunning beauty lies a soul so pure and gentle.\n\nShe makes the world a better place just by being in it. Her compassion, her warmth, her genuine care for others - these are the qualities that make her extraordinary.\n\nI'm so grateful to have found someone with such a beautiful heart. She inspires me to be a better person every day.\n\nForever yours",
    emoji: "💕",
    mood: "Grateful",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800"
  },
  {
    id: 4,
    date: "February 17, 2024",
    title: "Our Shared Dreams",
    content: "Dear Diary,\n\nWe talked about our future today, and it filled me with so much joy. Gunnu dreams of traveling the world, learning new things, and making a positive impact. I can see myself right there beside her.\n\nEvery moment with her feels like the beginning of forever. Our dreams align in beautiful ways, and I can't wait to build our future together.\n\nShe makes me believe in soulmates and destiny. With Gunnu, anything feels possible.\n\nDreaming of tomorrow,\nYour hopeful romantic",
    emoji: "🌟",
    mood: "Hopeful",
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=800"
  },
  {
    id: 5,
    date: "February 18, 2024",
    title: "Her Gentle Touch",
    content: "Dear Diary,\n\nToday Gunnu showed me her gentle side. The way she cares for others, the kindness in her eyes, the warmth of her presence - these are the things that make her truly extraordinary.\n\nHer touch is so gentle, her words so kind. She has this amazing ability to make everyone around her feel special and loved.\n\nI feel so lucky to be on the receiving end of her care. She makes me feel cherished and valued in ways I never thought possible.\n\nWith a heart full of love",
    emoji: "🤗",
    mood: "Loved",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800"
  },
  {
    id: 6,
    date: "February 19, 2024",
    title: "Forever My Love",
    content: "Dear Diary,\n\nMy heart beats for Gunnu. Every day I fall more in love with who she is and who we can be together. She brings out the best in me and makes me want to be a better person.\n\nHer smile, her laugh, her kindness, her dreams - everything about her is perfect to me. I can't imagine my life without her now.\n\nThis is just the beginning of our beautiful story. I promise to love her with all my heart, every single day.\n\nForever and always,\nHer devoted love",
    emoji: "💖",
    mood: "In Love",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800"
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // Motion values for drag interaction
  const x = useMotionValue(0);

  // Handle drag start
  const handleDragStart = () => {
    if (isPageTurning) return;
    setIsDragging(true);
  };

  // Handle drag end with realistic page turning
  const handleDragEnd = (event: any, info: PanInfo) => {
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
        }, 800);
      } else if (info.offset.x < 0 && currentPage < diaryEntries.length - 1) {
        // Swipe Left -> Next Page
        setTurnDirection('next');
        setIsPageTurning(true);
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setIsPageTurning(false);
          setTurnDirection(null);
        }, 800);
      }
    }
    // Animate x back to 0 smoothly instead of setting it
    x.set(0);
  };

  const nextPage = () => {
    if (currentPage < diaryEntries.length - 1 && !isPageTurning) {
      setTurnDirection('next');
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isPageTurning) {
      setTurnDirection('prev');
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsPageTurning(false);
        setTurnDirection(null);
      }, 800);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(139, 21, 56, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 21, 56, 0.2);
          }
        `}</style>
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#8B1538] mb-4 font-serif italic"
          style={{
            fontFamily: '"Dancing Script", cursive',
            textShadow: '3px 3px 6px rgba(139, 21, 56, 0.2)',
          }}
        >
          💖 Our Romantic Story 💖
        </motion.h2>
        <p className="text-xl text-[#6B4423] font-medium italic" style={{ fontFamily: '"Quicksand", sans-serif' }}>
          Every page is a piece of my heart, Gunnu... 💕
        </p>
      </motion.div>

      {/* 3D Diary Container */}
      <div className="relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center" style={{ perspective: '3000px' }}>
        {/* Realistic Book Shadow */}
        <motion.div
          className="absolute w-[90%] h-[30px] bg-black/15 rounded-[100%] blur-3xl"
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
        >
          {/* Spine - Shallower for 165-degree flatter look */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-[5] shadow-xl"
               style={{
                 transform: 'translateZ(-20px)',
                 background: 'linear-gradient(90deg, #4A0E1F 0%, #8B1538 50%, #4A0E1F 100%)',
                 borderRadius: '2px'
               }}>
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-amber-400/10" />
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-amber-400/10" />
          </div>

          {/* Left Side (Cover + Page Stack) */}
          <div className="relative w-1/2 h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Left Cover - Adjusted rotation for 165deg total angle (7.5deg per side) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#7B1E3B] via-[#8B1538] to-[#5D152C] rounded-l-xl shadow-2xl"
              style={{
                transformOrigin: 'right center',
                transform: 'rotateY(7.5deg) translateZ(-10px)',
                boxShadow: '-10px 15px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-3 border border-amber-400/10 rounded-l-lg pointer-events-none" />
            </motion.div>

            {/* Page Stack (Left) */}
            {[...Array(4)].map((_, i) => (
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
            <motion.div
              className="absolute inset-y-2 inset-x-2 right-0 bg-white rounded-l-sm shadow-inner overflow-hidden z-10"
              style={{
                transformOrigin: 'right center',
                rotateY: 4,
                translateZ: 0,
                backgroundImage: 'radial-gradient(circle at 100% 50%, #fffdfa 0%, #ffffff 100%)',
                opacity: (isPageTurning && turnDirection === 'prev') ? 0 : 1,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full p-6 flex flex-col items-center justify-center"
                >
                  <div className="relative w-full aspect-[4/5] max-w-[200px] rounded-sm shadow-lg p-2 bg-white rotate-[-1deg] transition-transform hover:rotate-0 duration-500">
                    <PaperClip className="-top-4 left-1/2 -translate-x-1/2 rotate-12 scale-90" />
                    <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
                      <img
                        src={diaryEntries[currentPage].image}
                        alt="Memory"
                        className="w-full h-full object-cover grayscale-[5%] sepia-[10%]"
                      />
                    </div>
                  </div>
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-amber-900/60 text-xl italic" style={{ fontFamily: '"Dancing Script", cursive' }}>
                      {diaryEntries[currentPage].date}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Side (Cover + Page Stack) */}
          <div className="relative w-1/2 h-full" style={{ transformStyle: 'preserve-3d' }}>
            {/* Right Cover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-bl from-[#7B1E3B] via-[#8B1538] to-[#5D152C] rounded-r-xl shadow-2xl"
              style={{
                transformOrigin: 'left center',
                transform: 'rotateY(-7.5deg) translateZ(-10px)',
                boxShadow: '10px 15px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-3 border border-amber-400/10 rounded-r-lg pointer-events-none" />
            </motion.div>

            {/* Page Stack (Right) */}
            {[...Array(4)].map((_, i) => (
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
            <motion.div
              className="absolute inset-y-2 inset-x-2 left-0 bg-white rounded-r-sm shadow-inner cursor-grab active:cursor-grabbing z-10"
              style={{
                transformOrigin: 'left center',
                backgroundImage: 'linear-gradient(to right, #ffffff 0%, #fffdfa 100%)',
                x,
                rotateY: useTransform(x, [-300, 0, 300], [-25, -4, 5]),
                opacity: isPageTurning && turnDirection === 'next' ? 0 : 1,
              }}
              drag={!isPageTurning ? "x" : false}
              dragConstraints={{ left: -300, right: 300 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <AnimatePresence mode="wait">
                <DiaryPageContent
                  key={currentPage}
                  entry={diaryEntries[currentPage]}
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Page Turn Overlay */}
          <AnimatePresence>
            {isPageTurning && (
              <motion.div
                className="absolute left-1/2 top-2 bottom-2 w-[calc(50%-8px)] origin-left z-[50]"
                initial={{ rotateY: turnDirection === 'next' ? -4 : -176 }}
                animate={{ rotateY: turnDirection === 'next' ? -176 : -4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.000] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of flipping page */}
                <div className="absolute inset-0 bg-white backface-hidden shadow-xl rounded-r-md border-l border-gray-50">
                  <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent" />
                </div>
                {/* Back of flipping page */}
                <div className="absolute inset-0 bg-[#fffdfa] backface-hidden rounded-l-md border-r border-gray-50 shadow-xl" 
                     style={{ transform: 'rotateY(180deg)' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
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
      <div className="relative z-[100] mt-24 flex flex-col items-center gap-8">
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
    </motion.section>
  );
}

// Separate Content Component for AnimatePresence
function DiaryPageContent({ entry }: { entry: DiaryEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
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
        <p className="text-xs text-rose-400 font-bold tracking-widest uppercase" style={{ fontFamily: '"Quicksand", sans-serif' }}>
          {entry.mood ? `Mood: ${entry.mood}` : entry.date}
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar relative z-10">
        {entry.content.split('\n').map((line, i) => (
          <p
            key={i}
            className="text-gray-700 text-xl leading-[32px] italic"
            style={{
              fontFamily: '"Dancing Script", cursive',
              color: '#374151'
            }}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="mt-4 flex justify-end relative z-10">
        <span className="text-4xl filter drop-shadow-sm">
          {entry.emoji}
        </span>
      </div>
    </motion.div>
  );
}