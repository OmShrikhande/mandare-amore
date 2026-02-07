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
    <section className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#F8E8EE] relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [100, -50, -200],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 60}%`
            }}
          >
            {['🌸', '💕', '✨', '🌹', '💖', '🌷', '🌺', '💗', '🌻', '💓'][i % 10]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            💕 My gunnu, You&apos;re My Everything 💕
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-[#4E342E] font-[var(--font-inter)] leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            In your arms, I find my forever home
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-[#7B1E3B] font-[var(--font-playfair)] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Sweetness, comfort, and endless love - all in you ✨
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.08,
                rotate: [0, 2, -2, 0],
                boxShadow: '0 20px 40px rgba(123, 30, 59, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTeddyClicked(!teddyClicked)}
              className="cursor-pointer mb-6 relative"
            >
              {/* Magical sparkle effects around teddy */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg pointer-events-none"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${15 + (i % 2) * 60}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ✨
                </motion.div>
              ))}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Couple holding hands */}
                {/* First character (left) */}
                <circle cx="65" cy="70" r="25" fill="#FFB3BA" />
                <circle cx="60" cy="65" r="4" fill="#4E342E" />
                <circle cx="70" cy="65" r="4" fill="#4E342E" />
                <ellipse cx="65" cy="80" rx="8" ry="12" fill="#FFB3BA" />
                <path d="M 58 85 Q 65 90 72 85" stroke="#4E342E" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="55" cy="110" r="15" fill="#FFB3BA" />
                <circle cx="75" cy="110" r="15" fill="#FFB3BA" />
                <ellipse cx="65" cy="140" rx="12" ry="8" fill="#FFB3BA" />

                {/* Second character (right) */}
                <circle cx="135" cy="70" r="25" fill="#B3E5FC" />
                <circle cx="130" cy="65" r="4" fill="#4E342E" />
                <circle cx="140" cy="65" r="4" fill="#4E342E" />
                <ellipse cx="135" cy="80" rx="8" ry="12" fill="#B3E5FC" />
                <path d="M 128 85 Q 135 90 142 85" stroke="#4E342E" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="125" cy="110" r="15" fill="#B3E5FC" />
                <circle cx="145" cy="110" r="15" fill="#B3E5FC" />
                <ellipse cx="135" cy="140" rx="12" ry="8" fill="#B3E5FC" />

                {/* Holding hands */}
                <path d="M 75 110 Q 100 100 125 110" stroke="#F7C6D0" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Hearts floating around */}
                <path d="M 20 40 C 20 30 30 30 30 40 C 30 45 20 50 20 45 C 20 50 10 45 10 40 C 10 30 20 30 20 40" fill="#F7C6D0" opacity="0.7" />
                <path d="M 180 30 C 180 20 190 20 190 30 C 190 35 180 40 180 35 C 180 40 170 35 170 30 C 170 20 180 20 180 30" fill="#F7C6D0" opacity="0.7" />
                <path d="M 160 160 C 160 150 170 150 170 160 C 170 165 160 170 160 165 C 160 170 150 165 150 160 C 150 150 160 150 160 160" fill="#F7C6D0" opacity="0.7" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8 }}
              animate={
                teddyClicked
                  ? { opacity: 1, height: 'auto', scale: 1 }
                  : { opacity: 0, height: 0, scale: 0.8 }
              }
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="overflow-hidden"
            >
              <motion.div
                className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] text-center leading-relaxed bg-gradient-to-br from-white/80 to-[#F7C6D0]/40 p-6 rounded-2xl shadow-lg relative"
                initial={{ y: 20 }}
                animate={teddyClicked ? { y: 0 } : { y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Heart burst animation */}
                {teddyClicked && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xl"
                        style={{
                          left: '50%',
                          top: '50%'
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 200],
                          y: [0, (Math.random() - 0.5) * 200],
                          opacity: [1, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          ease: 'easeOut'
                        }}
                      >
                        {['💕', '💖', '💗', '💓', '💘'][i % 5]}
                      </motion.div>
                    ))}
                  </div>
                )}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={teddyClicked ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative z-10"
                >
                  My gunnu, just like this couple holding hands, you make me feel so connected and loved — your presence is my greatest comfort. 👫💕
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, -0.5, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.08,
                rotate: [0, -1, 1, 0],
                boxShadow: '0 20px 40px rgba(123, 30, 59, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChocolateClicked(!chocolateClicked)}
              className="cursor-pointer mb-6 relative"
            >
              {/* Magical sparkle effects around chocolate */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg pointer-events-none"
                  style={{
                    left: `${25 + i * 12}%`,
                    top: `${20 + (i % 2) * 50}%`
                  }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ✨
                </motion.div>
              ))}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Romantic couple hugging */}
                {/* First character (left, hugging) */}
                <circle cx="70" cy="65" r="22" fill="#F8BBD0" />
                <circle cx="65" cy="60" r="3" fill="#4E342E" />
                <circle cx="75" cy="60" r="3" fill="#4E342E" />
                <ellipse cx="70" cy="75" rx="6" ry="10" fill="#F8BBD0" />
                <path d="M 64 78 Q 70 82 76 78" stroke="#4E342E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="65" cy="105" r="12" fill="#F8BBD0" />
                <circle cx="75" cy="105" r="12" fill="#F8BBD0" />
                <ellipse cx="70" cy="130" rx="10" ry="6" fill="#F8BBD0" />

                {/* Second character (right, being hugged) */}
                <circle cx="130" cy="65" r="22" fill="#C5E1A5" />
                <circle cx="125" cy="60" r="3" fill="#4E342E" />
                <circle cx="135" cy="60" r="3" fill="#4E342E" />
                <ellipse cx="130" cy="75" rx="6" ry="10" fill="#C5E1A5" />
                <path d="M 124 78 Q 130 82 136 78" stroke="#4E342E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="125" cy="105" r="12" fill="#C5E1A5" />
                <circle cx="135" cy="105" r="12" fill="#C5E1A5" />
                <ellipse cx="130" cy="130" rx="10" ry="6" fill="#C5E1A5" />

                {/* Hugging arms */}
                <path d="M 78 85 Q 95 75 112 85" stroke="#F7C6D0" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 82 95 Q 100 85 118 95" stroke="#F7C6D0" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Big heart between them */}
                <path
                  d="M 100 50 C 90 40 80 45 80 55 C 80 65 90 75 100 85 C 110 75 120 65 120 55 C 120 45 110 40 100 50"
                  fill="#F7C6D0"
                  opacity="0.8"
                />

                {/* Romantic sparkles */}
                <circle cx="30" cy="40" r="2" fill="#FFD700" opacity="0.8" />
                <circle cx="170" cy="35" r="2" fill="#FFD700" opacity="0.8" />
                <circle cx="25" cy="160" r="2" fill="#FFD700" opacity="0.8" />
                <circle cx="175" cy="155" r="2" fill="#FFD700" opacity="0.8" />

                {/* Breaking animation when clicked */}
                {chocolateClicked && (
                  <motion.g
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 0.8] }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      d="M 85 70 L 115 100"
                      stroke="#7B1E3B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      d="M 115 70 L 85 100"
                      stroke="#7B1E3B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.g>
                )}
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8 }}
              animate={
                chocolateClicked
                  ? { opacity: 1, height: 'auto', scale: 1 }
                  : { opacity: 0, height: 0, scale: 0.8 }
              }
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="overflow-hidden"
            >
              <motion.div
                className="text-lg md:text-xl text-[#4E342E] font-[var(--font-inter)] text-center leading-relaxed bg-gradient-to-br from-white/80 to-[#D2691E]/30 p-6 rounded-2xl shadow-lg relative"
                initial={{ y: 20 }}
                animate={chocolateClicked ? { y: 0 } : { y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Chocolate sprinkle animation */}
                {chocolateClicked && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-lg"
                        style={{
                          left: '50%',
                          top: '50%'
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 180],
                          y: [0, (Math.random() - 0.5) * 180],
                          opacity: [1, 1, 0]
                        }}
                        transition={{
                          duration: 1.8,
                          delay: i * 0.12,
                          ease: 'easeOut'
                        }}
                      >
                        {['🍫', '🍪', '🧁', '🍬', '🍭'][i % 5]}
                      </motion.div>
                    ))}
                  </div>
                )}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={chocolateClicked ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative z-10"
                >
                  My gunnu, just like this loving embrace, you fill my heart with warmth and joy that lasts forever. Our love is eternal. 💑💝
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
