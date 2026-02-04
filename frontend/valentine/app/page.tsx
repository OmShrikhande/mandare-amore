'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingSection from './components/LandingSection';
import MemoryGarden from './components/MemoryGarden';
import LoveNotesWall from './components/LoveNotesWall';
import ComfortSection from './components/ComfortSection';
import PersonalMessage from './components/PersonalMessage';
import FinalClosing from './components/FinalClosing';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  const handleNext = () => {
    setShowLanding(false);
  };

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <LandingSection key="landing" onNext={handleNext} />
        ) : (
          <div key="content" className="smooth-scroll">
            <MemoryGarden />
            <LoveNotesWall />
            <ComfortSection />
            <PersonalMessage />
            <FinalClosing />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
