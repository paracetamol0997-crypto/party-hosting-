'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const startNightGroove = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      let step = 0;
      const bpm = 124;
      const stepDuration = 60 / bpm / 4; // 16th note

      // Bass notes progression
      const bassNotes = [55, 55, 65, 55, 58, 55, 62, 55]; // A1, C2, etc.

      const playStep = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;

        // Kick on beats 0, 4, 8, 12 (four-on-the-floor)
        if (step % 4 === 0) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(130, now);
          osc.frequency.exponentialRampToValueAtTime(32, now + 0.12);

          gain.gain.setValueAtTime(0.6, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
        }

        // Hi-hat on offbeats (2, 6, 10, 14)
        if (step % 4 === 2) {
          const bufferSize = ctx.sampleRate * 0.05;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 7500;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
        }

        // Deep synth bass line on 16th notes
        if (step % 2 === 0) {
          const noteIndex = Math.floor(step / 2) % bassNotes.length;
          const freq = bassNotes[noteIndex];

          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(380, now);
          filter.frequency.exponentialRampToValueAtTime(120, now + 0.15);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.16);
        }

        step = (step + 1) % 16;
        timerRef.current = window.setTimeout(playStep, stepDuration * 1000);
      };

      playStep();
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  const stopNightGroove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopNightGroove();
    } else {
      startNightGroove();
    }
  };

  useEffect(() => {
    return () => {
      stopNightGroove();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-xl border ${
          isPlaying
            ? 'bg-neon-yellow text-night-950 border-neon-yellow shadow-[0_0_25px_rgba(255,230,0,0.6)] animate-pulse'
            : 'bg-night-900/90 text-white border-zinc-700 hover:border-neon-yellow hover:text-neon-yellow hover:shadow-[0_0_15px_rgba(255,230,0,0.3)]'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Party Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>NIGHT VIBES ON 🎵</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-neon-yellow" />
            <span>ENTER THE NIGHT 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
