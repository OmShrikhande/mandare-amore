'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoItem {
  id: number;
  video: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const videoItems: VideoItem[] = [
  {
    id: 1,
    video: '/media/videos/romantic-moment.mp4',
    title: 'Our First Dance',
    description: 'That magical moment when we first danced together, lost in each other\'s eyes 💃🕺',
    thumbnail: '/media/photos/memory-1.jpg'
  },
  {
    id: 2,
    video: '/media/videos/love-story.mp4',
    title: 'Our Love Story',
    description: 'A journey of love, laughter, and beautiful moments that brought us here 💑',
    thumbnail: '/media/photos/memory-2.jpg'
  }
];

function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 1,
        delay: index * 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="bg-gradient-to-br from-white/90 to-[#F7C6D0]/30 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="relative aspect-video bg-gradient-to-br from-pink-100 to-purple-100">
        {!showVideo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVideo(true)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-pink-400/30 rounded-full"
                />
              </div>
            </motion.button>

            {/* Floating hearts around play button */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {['💕', '💖', '💗', '💓', '💘', '💝'][i]}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <video
            src={item.video}
            controls
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster={item.thumbnail}
          />
        )}

        {/* Video overlay with title */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <motion.h3
            className="text-white font-[var(--font-playfair)] text-2xl mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            className="text-white/90 font-[var(--font-inter)] text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoMemories() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#F8E8EE] relative overflow-hidden">
      {/* Floating romantic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              y: [100, -50, -200],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            {['🌸', '💕', '✨', '🌹', '💖', '🌷', '🌺', '💗', '🌻', '💓', '🎬', '📹', '💫'][i % 13]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isHeaderInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl mb-6 text-[#7B1E3B] font-[var(--font-playfair)] leading-relaxed"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💕 Our Cherished Moments 💕
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Videos that capture our love story
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-[#7B1E3B] font-[var(--font-playfair)] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Every frame tells a story of us ✨🎬
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videoItems.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Photo slideshow section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-20"
        >
          <motion.h3
            className="text-3xl md:text-4xl mb-12 text-[#7B1E3B] font-[var(--font-playfair)] text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            📸 Memory Slideshow
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-full bg-gradient-to-br from-pink-200/50 to-purple-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-sm text-pink-700 font-medium">Memory {i + 1}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}