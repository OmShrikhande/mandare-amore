'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeartCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail effect
      setTrailPositions(prev => {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
        const updated = [newTrail, ...prev].slice(0, 5); // Keep only last 5 trails
        return updated;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPositions(prev => prev.slice(0, -1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main heart cursor */}
      <motion.div
        className="cursor-heart"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Trail effects */}
      {trailPositions.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}