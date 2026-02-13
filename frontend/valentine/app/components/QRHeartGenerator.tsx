'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import QRCode from 'react-qr-code';
import { Heart, Sparkles, Download, ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function QRHeartGenerator() {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const url = "https://princess-mi-amor.netlify.app";

  // Memoize floating hearts to avoid Math.random in render
  const floatingHearts = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      size: 20 + Math.random() * 40
    }));
  }, []);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      if (ctx) {
        // Draw heart background
        ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#fff6eb';
        ctx.fillRect(0, 0, 1024, 1024);
        
        // Draw a big heart
        ctx.beginPath();
        const topCurveHeight = 1024 * 0.3;
        ctx.moveTo(512, 1024 * 0.9);
        // Left side
        ctx.bezierCurveTo(
          512, 1024 * 0.8, 
          0, 1024 * 0.6, 
          0, 1024 * 0.35
        );
        ctx.bezierCurveTo(
          0, 1024 * 0.1, 
          512 * 0.5, 0, 
          512, 1024 * 0.25
        );
        // Right side
        ctx.bezierCurveTo(
          512 * 1.5, 0, 
          1024, 1024 * 0.1, 
          1024, 1024 * 0.35
        );
        ctx.bezierCurveTo(
          1024, 1024 * 0.6, 
          512, 1024 * 0.8, 
          512, 1024 * 0.9
        );
        
        const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
        gradient.addColorStop(0, '#ff69b4');
        gradient.addColorStop(1, '#ff1493');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw the QR code in the center, slightly rotated
        ctx.save();
        ctx.translate(512, 450);
        ctx.rotate(45 * Math.PI / 180);
        // We draw the image centered
        ctx.drawImage(img, -200, -200, 400, 400);
        ctx.restore();
      }
      
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "princess-qr-heart.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <section className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)'
          : 'linear-gradient(135deg, #fff6eb 0%, #ffe4e1 50%, #fff6eb 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-(--font-playfair) text-[#7B1E3B] dark:text-pink-300 mb-4">
          A Magical Key to My Heart 🗝️
        </h2>
        <p className="text-lg md:text-xl text-[#4E342E] dark:text-pink-100 font-(--font-inter) max-w-2xl mx-auto italic">
          Scan this special heart to open a world where my love for you lives forever.
        </p>
      </motion.div>

      <div className="relative group">
        {/* Decorative Background Heart */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-linear-to-br from-pink-400/20 to-rose-500/20 blur-3xl rounded-full"
        />

        {/* The QR Container */}
        <motion.div
          ref={qrRef}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative z-10 p-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-300 dark:border-pink-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center bg-white">
            {/* Heart SVG Mask for QR */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full text-pink-50" viewBox="0 0 100 100">
                <path
                  d="M50,85 C50,85 15,60 15,40 C15,25 25,15 35,15 C42,15 47,20 50,25 C53,20 58,15 65,15 C75,15 85,25 85,40 C85,60 50,85 50,85 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* The QR Code - Rotated 45 degrees to fit better in heart */}
            <div className="relative z-10 rotate-45 transform">
              <QRCode
                value={url}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
                fgColor={theme === 'dark' ? '#e91e63' : '#7b1e3b'}
                bgColor="transparent"
              />
            </div>
            
            {/* Floating Icons */}
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-4 right-4 text-pink-500"
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute bottom-4 left-4 text-pink-500"
                  >
                    <Heart size={24} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col md:flex-row gap-6 items-center z-10"
      >
        <button
          onClick={downloadQR}
          className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-pink-500 to-rose-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Download size={20} />
          Save Our Love Key
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-[#7B1E3B] dark:text-pink-300 border-2 border-pink-200 dark:border-pink-500/30 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <ExternalLink size={20} />
          Visit Directly
        </a>
      </motion.div>

      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: heart.delay
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
