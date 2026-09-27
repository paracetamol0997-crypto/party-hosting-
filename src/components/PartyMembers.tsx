'use client';

import React from 'react';
import { Headphones, Shield, Sparkles, Star } from 'lucide-react';
import { CrownDoodle, SpecialItemBadge } from './Doodles';

export default function PartyMembers() {
  const eliteMembers = ['Pavan', 'Narasimha', 'Avinash'];
  const delightMembers = ['Jinna', 'Geetham', 'Jon', 'and Others...'];

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          <span className="font-display tracking-[0.2em] text-xs uppercase text-zinc-400 font-bold">
            THE INNER CIRCLE
          </span>
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-wide">
          PARTY <span className="text-neon-yellow">MEMBERS</span>
        </h2>
        <p className="font-chalk text-zinc-400 text-lg sm:text-xl mt-1">
          The crew behind the chaos.
        </p>
      </div>

      {/* Two Column Layout: Elite Members & Delight Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* 1. ELITE MEMBERS BOX */}
        <div className="relative group bg-night-900/85 border-2 border-dashed border-neon-yellow/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(255,230,0,0.12)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,230,0,0.25)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <CrownDoodle className="w-7 h-7 text-neon-yellow" />
                <h3 className="font-marker text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  ELITE MEMBERS
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-neon-yellow/10 text-neon-yellow border border-neon-yellow/30">
                VIP
              </span>
            </div>

            {/* Members List */}
            <ul className="my-6 space-y-3">
              {eliteMembers.map((name, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-night-800/60 border border-zinc-800 hover:border-neon-yellow/40 transition-colors"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-yellow shadow-[0_0_8px_#ffe600]" />
                  <span className="font-marker text-xl sm:text-2xl text-zinc-100 tracking-wide">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* DJ PRINCE PAVAN FEATURED BANNER */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-800 flex items-center justify-between bg-night-950/80 p-4 rounded-2xl border border-zinc-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
                <Headphones className="w-6 h-6 animate-pulse text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block">
                  ON THE DECKS
                </span>
                <span className="font-display text-xl sm:text-2xl font-black text-white tracking-wide">
                  DJ PRINCE PAVAN
                </span>
              </div>
            </div>
            <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          </div>
        </div>

        {/* 2. DELIGHT MEMBERS BOX */}
        <div className="relative group bg-night-900/85 border-2 border-dashed border-amber-400/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(255,160,0,0.12)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,160,0,0.25)] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <CrownDoodle className="w-7 h-7 text-amber-400" />
                <h3 className="font-marker text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  DELIGHT MEMBERS
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/30">
                SQUAD
              </span>
            </div>

            {/* Members List */}
            <ul className="my-6 space-y-3">
              {delightMembers.map((name, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-night-800/60 border border-zinc-800 hover:border-amber-400/40 transition-colors"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                  <span className="font-marker text-xl sm:text-2xl text-zinc-100 tracking-wide">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Poster Chalk Quote */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-800 text-center">
            <p className="font-chalk text-zinc-400 text-base sm:text-lg">
              Same People, New Stories <span className="text-neon-yellow font-bold text-xl">(^_~)</span>
            </p>
          </div>
        </div>
      </div>

      {/* SPECIAL ITEM JON & NO FORMALITIES BANNER */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
        <div className="font-chalk text-zinc-400 text-lg sm:text-xl">
          No Formalities... Just Good Vibes! 👑
        </div>

        <SpecialItemBadge />

        <div className="font-chalk text-neon-yellow text-lg sm:text-xl">
          Bring the energy! ⚡
        </div>
      </div>
    </section>
  );
}
