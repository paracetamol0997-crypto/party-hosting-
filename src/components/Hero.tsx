'use client';

import React from 'react';
import { CrownDoodle, BurstRays, HangingStringLights } from './Doodles';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 pt-2 pb-12 overflow-hidden">
      {/* 1. Hanging String Lights Across Top */}
      <div className="w-full absolute top-0 left-0 z-20">
        <HangingStringLights />
      </div>

      {/* 2. Ambient Background Lighting Glows */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-purple-600/25 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-28 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon-yellow/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Floating subtle ember particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 bg-neon-yellow rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70" />
        <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50" />
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse opacity-60" />
      </div>

      {/* Spacer below string lights */}
      <div className="h-16 sm:h-20 w-full" />

      {/* 3. Top Row Notes: You're Invited (Left) & Good Food... (Right) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-2 z-10">
        {/* Left: You're Invited! */}
        <div className="flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
          <CrownDoodle className="w-6 h-6 sm:w-8 sm:h-8 text-neon-yellow" />
          <div className="relative">
            <span className="font-marker text-white text-xl sm:text-2xl tracking-wider drop-shadow-[0_0_12px_rgba(255,230,0,0.5)]">
              You&apos;re INVITED!
            </span>
            <BurstRays className="w-6 h-6 text-neon-yellow absolute -right-6 -top-3 hidden sm:block" />
          </div>
        </div>

        {/* Right: Good Food Great Drinks Bigger Vibes */}
        <div className="flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform text-right">
          <div className="font-chalk text-sm sm:text-base text-zinc-300 tracking-wide leading-tight">
            <span className="text-neon-yellow font-bold">Good Food</span> •{' '}
            <span className="text-amber-400 font-bold">Great Drinks</span> •{' '}
            <span className="text-cyan-400 font-bold">Bigger Vibes</span>
          </div>
          <CrownDoodle className="w-5 h-5 text-neon-yellow hidden sm:block" />
        </div>
      </div>

      {/* 4. Main Hero Typography Centerpiece */}
      <div className="my-auto py-6 sm:py-10 z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Crown & Hosted By */}
        <div className="flex flex-col items-center mb-3">
          <CrownDoodle className="w-10 h-10 sm:w-14 sm:h-14 text-neon-yellow mb-1 animate-bounce" />
          <span className="font-display tracking-[0.25em] text-xs sm:text-sm uppercase text-zinc-300 font-bold">
            HOSTED BY
          </span>
        </div>

        {/* HITESH BHAI Banner */}
        <div className="relative inline-block mb-1 transform -rotate-1 hover:rotate-0 transition-transform">
          <div
            className="absolute inset-0 bg-neon-yellow rounded-md -rotate-1 scale-105 shadow-[0_0_30px_rgba(255,230,0,0.5)] -z-10"
            style={{
              clipPath:
                'polygon(2% 0%, 98% 3%, 100% 92%, 97% 100%, 3% 97%, 0% 8%)',
            }}
          />
          <h2 className="font-marker text-night-950 text-3xl sm:text-5xl md:text-6xl font-black px-8 py-2 tracking-widest uppercase">
            HITESH BHAI
          </h2>
        </div>

        {/* Caption below his name */}
        <div className="mb-3">
          <p className="font-chalk text-xs sm:text-sm text-zinc-400 tracking-widest italic font-semibold">
            &ldquo;Guns dont need agreements &rdquo;
          </p>
        </div>

        {/* Sub-tagline */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-[2px] w-8 sm:w-16 bg-neon-yellow/60" />
          <p className="font-chalk text-neon-yellow text-lg sm:text-2xl font-bold tracking-wider">
            LET&apos;S PARTY AT HIS PLACE!
          </p>
          <div className="h-[2px] w-8 sm:w-16 bg-neon-yellow/60" />
        </div>

        {/* Massive NIGHT OUT Centerpiece */}
        <div className="relative my-2 sm:my-4 group">
          {/* Subtle Crown over the I */}
          <div className="absolute -top-7 sm:-top-10 left-[22%] -translate-x-1/2 z-20">
            <CrownDoodle className="w-8 h-8 sm:w-12 sm:h-12 text-neon-yellow" />
          </div>

          <h1 className="font-display text-7xl sm:text-9xl md:text-[11rem] leading-none font-black tracking-tight uppercase select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-yellow to-amber-500 drop-shadow-[0_0_35px_rgba(255,230,0,0.45)] transition-transform duration-300 group-hover:scale-[1.02]">
            NIGHT OUT
          </h1>

          {/* Radiating bursts left and right on larger screens */}
          <BurstRays className="w-12 h-12 text-neon-yellow absolute -left-8 top-1/2 -translate-y-1/2 hidden md:block" />
          <BurstRays className="w-12 h-12 text-neon-yellow absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block rotate-90" />
        </div>

        {/* Poster Tape Banner: FOOD × DRINKS × GOOD COMPANY */}
        <div className="relative inline-block mt-1 mb-8 transform rotate-1">
          <div
            className="absolute inset-0 bg-amber-400 rounded-sm -rotate-0.5 scale-105 shadow-md -z-10"
            style={{
              clipPath:
                'polygon(1% 0%, 99% 5%, 98% 95%, 2% 100%)',
            }}
          />
          <span className="font-display tracking-[0.2em] sm:tracking-[0.3em] text-night-950 font-black text-xs sm:text-base px-6 py-1.5 uppercase inline-block">
            FOOD × DRINKS × GOOD COMPANY
          </span>
        </div>

        {/* Date and Time Chip */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-night-900/90 border border-zinc-700/80 text-zinc-200 text-sm sm:text-base font-semibold mb-8 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-neon-yellow" />
          <span>October 12, 2026 • 10:00 PM Onwards</span>
          <Sparkles className="w-4 h-4 text-neon-yellow" />
        </div>

        {/* Main CTA: JOIN THE PARTY */}
        <button
          onClick={scrollToRegister}
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-neon-yellow via-amber-400 to-neon-yellow text-night-950 font-display text-2xl sm:text-3xl font-black uppercase tracking-wider rounded-2xl shadow-[0_0_35px_rgba(255,230,0,0.5)] hover:shadow-[0_0_55px_rgba(255,230,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>JOIN THE PARTY</span>
          <ArrowDown className="w-6 h-6 stroke-[3] group-hover:translate-y-1 transition-transform" />
        </button>

        <p className="mt-3 font-chalk text-zinc-400 text-sm sm:text-base">
          Private Invitation • Limited Capacity • RSVP Required
        </p>
      </div>

      {/* Bottom indicator */}
      <div className="z-10 mt-auto pt-4 flex flex-col items-center">
        <button
          onClick={scrollToRegister}
          className="text-zinc-500 hover:text-neon-yellow transition-colors flex flex-col items-center gap-1"
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-widest uppercase font-bold">Explore Details</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
