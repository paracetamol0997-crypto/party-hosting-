'use client';

import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

// October 12, 2026 at 10:00 PM IST (Asia/Kolkata is UTC+05:30)
export const EVENT_TARGET_TIMESTAMP = new Date('2026-10-12T22:00:00+05:30').getTime();

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

export function calculateTimeRemaining(targetTime: number = EVENT_TARGET_TIMESTAMP): TimeRemaining {
  const diff = targetTime - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isStarted: false };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeRemaining());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  if (timeLeft.isStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-red-600 via-amber-500 to-neon-yellow rounded-2xl text-black font-black text-2xl sm:text-4xl uppercase tracking-wider shadow-[0_0_40px_rgba(255,230,0,0.6)] animate-pulse">
          <Flame className="w-8 h-8 fill-black" />
          <span>THE NIGHT HAS STARTED 🔥</span>
          <Flame className="w-8 h-8 fill-black" />
        </div>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-6">
        <p className="font-chalk text-neon-yellow text-xl sm:text-2xl tracking-wider">
          Tick Tock... The Clock Is Running ⚡
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="group relative bg-night-900/90 border-2 border-zinc-800/80 hover:border-neon-yellow/80 rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,230,0,0.25)] hover:-translate-y-1"
          >
            {/* Top corner accent */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-neon-yellow transition-colors" />

            {/* Digit */}
            <div className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white group-hover:text-neon-yellow transition-colors drop-shadow-[0_2px_10px_rgba(255,230,0,0.3)]">
              {block.value}
            </div>

            {/* Label */}
            <div className="mt-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200">
              {block.label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <span className="inline-block text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          India Standard Time (IST) • 10:00 PM • October 12, 2026
        </span>
      </div>
    </section>
  );
}
