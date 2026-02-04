'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingSection from './components/LandingSection';
import MemoryGarden from './components/MemoryGarden';
import LoveNotesWall from './components/LoveNotesWall';
import AlbumSection from './components/AlbumSection';
import ComfortSection from './components/ComfortSection';
import PersonalMessage from './components/PersonalMessage';
import FinalClosing from './components/FinalClosing';
import SectionTransition from './components/SectionTransition';

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
            <SectionTransition delay={0.2}>
              <MemoryGarden />
            </SectionTransition>

            <SectionTransition delay={0.4}>
              <LoveNotesWall />
            </SectionTransition>

            <SectionTransition delay={0.6}>
              <AlbumSection />
            </SectionTransition>

            <SectionTransition delay={0.8}>
              <ComfortSection />
            </SectionTransition>

            <SectionTransition delay={1.0}>
              <PersonalMessage />
            </SectionTransition>

            <SectionTransition delay={1.2}>
              <FinalClosing />
            </SectionTransition>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
