'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PhotoAlbumLanding from './components/PhotoAlbumLanding';
import MemoryBook from './components/MemoryBook';
import LoveNotesWall from './components/LoveNotesWall';
import AlbumSection from './components/AlbumSection';
import VideoMemories from './components/VideoMemories';
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
    <main className="relative section-background">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <PhotoAlbumLanding key="landing" onComplete={handleNext} />
        ) : (
          <div key="content" className="smooth-scroll-section">
            <section className="section-background snap-start">
              <SectionTransition delay={0.1}>
                <MemoryBook />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.2}>
                <LoveNotesWall />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.3}>
                <AlbumSection />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.4}>
                <VideoMemories />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.5}>
                <ComfortSection />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.6}>
                <PersonalMessage />
              </SectionTransition>
            </section>

            <section className="section-background snap-start">
              <SectionTransition delay={0.7}>
                <FinalClosing />
              </SectionTransition>
            </section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
