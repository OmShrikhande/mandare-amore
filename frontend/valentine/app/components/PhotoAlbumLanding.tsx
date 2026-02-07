'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSoundEffect } from './SoundEffects';

interface PhotoSlide {
  id: number;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
  decorativeElements: string[];
}

const photoSlides: PhotoSlide[] = [
  {
    id: 1,
    title: "Our First Memory",
    description: "The moment I knew you were special...",
    emoji: "🌹",
    bgColor: "from-pink-100 to-rose-200",
    decorativeElements: ["💕", "🌸", "✨"]
  },
  {
    id: 2,
    title: "Sweet Moments",
    description: "Every smile, every laugh, every touch...",
    emoji: "🍬",
    bgColor: "from-purple-100 to-pink-200",
    decorativeElements: ["🍭", "🧸", "💖"]
  },
  {
    id: 3,
    title: "Forever Yours",
    description: "My heart beats only for you...",
    emoji: "💝",
    bgColor: "from-rose-100 to-red-200",
    decorativeElements: ["🌺", "🐻", "💗"]
  },
  {
    id: 4,
    title: "Love's Journey",
    description: "Together through every season...",
    emoji: "🌷",
    bgColor: "from-pink-200 to-purple-300",
    decorativeElements: ["🍫", "🦋", "💓"]
  }
];

interface PhotoAlbumLandingProps {
  onComplete: () => void;
}

export default function PhotoAlbumLanding({ onComplete }: PhotoAlbumLandingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const playSparkle = useSoundEffect('playSparkle');

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection;
    if (newSlide >= 0 && newSlide < photoSlides.length) {
      setDirection(newDirection);
      setCurrentSlide(newSlide);
      playSparkle();
    }
  };

  const handleDragEnd = (event: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (currentSlide === photoSlides.length - 1) {
      setCanProceed(true);
    }
  }, [currentSlide]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF6EB 0%, #F7E5D7 25%, #FFE4E1 50%, #FFF0F5 75%, #FFF6EB 100%)',
      }}
    >
      {/* Floating romantic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            {['🌸', '💕', '✨', '🌹', '🧸', '🍬', '💖'][Math.floor(Math.random() * 7)]}
          </motion.div>
        ))}
      </div>

      {/* Photo Album Container */}
      <div className="relative w-full max-w-sm sm:max-w-md mx-auto px-4">
        {/* Album Border */}
        <motion.div
          className="relative bg-gradient-to-br from-amber-100 to-orange-200 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-amber-300"
          animate={{
            boxShadow: [
              '0 25px 50px rgba(251, 191, 36, 0.3)',
              '0 35px 60px rgba(251, 191, 36, 0.4)',
              '0 25px 50px rgba(251, 191, 36, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Photo Frame */}
          <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-inner overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="relative h-64 sm:h-80 flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing"
              >
                {/* Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {photoSlides[currentSlide].decorativeElements.map((emoji, index) => (
                    <motion.div
                      key={index}
                      className="absolute text-3xl"
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${15 + (index % 2) * 60}%`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Main Content */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative z-10"
                >
                  <motion.div
                    className="text-4xl sm:text-6xl mb-3 sm:mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {photoSlides[currentSlide].emoji}
                  </motion.div>

                  <motion.h2
                    className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 font-serif px-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {photoSlides[currentSlide].title}
                  </motion.h2>

                  <motion.p
                    className="text-sm sm:text-base text-gray-600 italic leading-relaxed px-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {photoSlides[currentSlide].description}
                  </motion.p>
                </motion.div>

                {/* Photo placeholder overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${photoSlides[currentSlide].bgColor} opacity-20 rounded-xl`}
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Album Spine Effect */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-2 h-16 bg-amber-400 rounded-r-lg shadow-lg" />
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {photoSlides.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-pink-500' : 'bg-pink-200'
              }`}
              animate={{
                scale: index === currentSlide ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: index === currentSlide ? Infinity : 0,
              }}
            />
          ))}
        </div>

        {/* Swipe Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-6"
        >
          <motion.p
            className="text-sm text-gray-600 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {currentSlide < photoSlides.length - 1 ? '👆 Swipe to see more memories' : '✨ You\'ve seen them all!'}
          </motion.p>

          {canProceed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSparkle();
                onComplete();
              }}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue to My Heart 💕
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Romantic Background Elements */}
      <div className="absolute bottom-10 left-10 text-4xl animate-bounce">
        🧸
      </div>
      <div className="absolute bottom-20 right-10 text-3xl animate-pulse">
        🍫
      </div>
      <div className="absolute top-20 left-10 text-2xl animate-spin" style={{ animationDuration: '3s' }}>
        🌸
      </div>
      <div className="absolute top-32 right-16 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>
        💝
      </div>
    </motion.section>
  );
}