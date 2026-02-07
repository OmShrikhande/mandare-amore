'use client';

import { createContext, useContext, useRef, useCallback } from 'react';

interface SoundEffectsContextType {
  playHeartBeat: () => void;
  playSparkle: () => void;
  playClick: () => void;
  playHover: () => void;
}

const SoundEffectsContext = createContext<SoundEffectsContextType | null>(null);

export function SoundEffectsProvider({ children }: { children: React.ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
      console.log('Audio not available');
    }
  }, [getAudioContext]);

  const playHeartBeat = useCallback(() => {
    // Play a gentle heartbeat sound
    playTone(220, 0.1, 'sine');
    setTimeout(() => playTone(220, 0.1, 'sine'), 300);
  }, [playTone]);

  const playSparkle = useCallback(() => {
    // Play a sparkling sound with multiple tones
    const frequencies = [800, 1000, 1200, 1000, 800];
    frequencies.forEach((freq, index) => {
      setTimeout(() => playTone(freq, 0.05, 'sine'), index * 50);
    });
  }, [playTone]);

  const playClick = useCallback(() => {
    // Play a soft click sound
    playTone(600, 0.05, 'square');
  }, [playTone]);

  const playHover = useCallback(() => {
    // Play a very subtle hover sound
    playTone(400, 0.03, 'triangle');
  }, [playTone]);

  const value = {
    playHeartBeat,
    playSparkle,
    playClick,
    playHover
  };

  return (
    <SoundEffectsContext.Provider value={value}>
      {children}
    </SoundEffectsContext.Provider>
  );
}

export function useSoundEffects() {
  const context = useContext(SoundEffectsContext);
  if (!context) {
    throw new Error('useSoundEffects must be used within a SoundEffectsProvider');
  }
  return context;
}

// Hook for easy sound effect usage
export function useSoundEffect(soundType: keyof SoundEffectsContextType) {
  const sounds = useSoundEffects();
  return sounds[soundType];
}