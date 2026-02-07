'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to load the romantic background music
    const audio = new Audio('/media/audio/romantic-background.mp3');

    // Fallback to a gentle piano melody if custom audio doesn't exist
    audio.addEventListener('error', () => {
      console.log('Custom audio not found, using fallback');
      // For now, we'll just disable audio if no file exists
      setAudioLoaded(false);
    });

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      audioRef.current = audio;
      audio.volume = volume;
      audio.loop = true;
    });

    audio.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !audioLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  if (!audioLoaded) {
    return null; // Don't show controls if no audio is available
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-pink-200/50 mb-3"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-pink-100 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-pink-600" />
                ) : (
                  <Volume2 className="w-4 h-4 text-pink-600" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer slider"
              />

              <span className="text-sm text-pink-600 font-medium min-w-[2rem]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!showControls) togglePlay();
          setShowControls(!showControls);
        }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      >
        {/* Animated musical notes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="text-xs"
                >
                  ♪
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10">
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </div>

        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-pink-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </motion.button>

      {/* Floating music note */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-8 -right-2 text-2xl"
      >
        🎵
      </motion.div>
    </div>
  );
}