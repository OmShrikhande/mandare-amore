'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface AlbumItem {
  id: number;
  image: string;
  text: string;
  title: string;
}

const albumItems: AlbumItem[] = [
  {
    id: 1,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNGN0M2RDAiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeD0iNTAiIHk9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0RTM0MkUiLz4KPGNpcmNsZSBjeD0iMzUiIGN5PSI0NSIgcj0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI4IiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0gMzUgNzUgUSBzMCA4MCA2NSA4MCIgc3Ryb2tlPSIjNEUzNDJFIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4KPHRleHQgeD0iMTAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdiMWUzYiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGVhY2ggQmVhclwvdGV4dD4KPC9zdmc+',
    text: 'My sweet GUNU, you\'re like this adorable peach bear - soft, sweet, and absolutely irresistible. Every time I think of you, I smile just like this little bear does.',
    title: 'Peach Bear GUNU'
  },
  {
    id: 2,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNGOUY5QzQiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeD0iNTAiIHk9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0RTM0MkUiLz4KPGNpcmNsZSBjeD0iMzUiIGN5PSI0NSIgcj0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI4IiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0gMzUgNzUgUSBzMCA4MCA2NSA4MCIgc3Ryb2tlPSIjNEUzNDJFIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4KPHRleHQgeD0iMTAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdiMWUzYiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R29tYSBCZWFyPC90ZXh0Pgo8L3N2Zz4K',
    text: 'GUNU, you\'re my goma bear - unique, special, and one-of-a-kind. Just like this little bear, you bring so much joy and warmth to my life.',
    title: 'Goma Bear GUNU'
  },
  {
    id: 3,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNGOUI5RDciLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeD0iNTAiIHk9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0RTM0MkUiLz4KPGNpcmNsZSBjeD0iMzUiIGN5PSI0NSIgcj0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI4IiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0gMzUgNzUgUSBzMCA4MCA2NSA4MCIgc3Ryb2tlPSIjNEUzNDJFIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4KPHRleHQgeD0iMTAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdiMWUzYiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TG92aW5nIEJlYXI8L3RleHQ+Cjwvc3ZnPg==',
    text: 'My GUNU, you\'re the bear that holds my heart. Soft, gentle, and full of love - just like you. I cherish every moment we share.',
    title: 'Loving Bear GUNU'
  },
  {
    id: 4,
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNGOUI5RDciLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeD0iNTAiIHk9IjUwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0RTM0MkUiLz4KPGNpcmNsZSBjeD0iMzUiIGN5PSI0NSIgcj0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI4IiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0gMzUgNzUgUSBzMCA4MCA2NSA4MCIgc3Ryb2tlPSIjNEUzNDJFIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4KPHRleHQgeD0iMTAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdiMWUzYiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3dlZXQgQmVhclwvdGV4dD4KPC9zdmc+',
    text: 'GUNU, you\'re sweeter than honey and more precious than gold. My heart smiles every time I think of you, my sweet bear.',
    title: 'Sweet Bear GUNU'
  }
];

function AlbumCard({ item, index }: { item: AlbumItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className="perspective-1000"
    >
      <motion.div
        className="relative w-full h-80 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Front Side - Image */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white font-[var(--font-playfair)] text-lg font-semibold">
              {item.title}
            </h3>
            <p className="text-white/80 text-sm mt-1">Click to read more 💕</p>
          </div>
        </div>

        {/* Back Side - Text */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-[#7B1E3B] font-[var(--font-playfair)] text-xl mb-4 text-center">
            {item.title}
          </h3>
          <p className="text-[#4E342E] font-[var(--font-inter)] text-base leading-relaxed text-center">
            {item.text}
          </p>
          <p className="text-[#7B1E3B] text-sm mt-4 text-center font-medium">
            Click to flip back 🐻
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AlbumSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-[#FFF6EB]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-3xl md:text-4xl mb-16 text-[#7B1E3B] font-[var(--font-playfair)] text-center"
        >
          My GUNU in Every Form
          <br />
          <span className="text-2xl md:text-3xl">The bears that remind me of you</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {albumItems.map((item, index) => (
            <AlbumCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}