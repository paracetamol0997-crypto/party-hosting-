'use client';

import React from 'react';
import { Calendar, Clock, Home, Ticket, Users, Sparkles } from 'lucide-react';
import { CrownDoodle, ChalkBox } from './Doodles';

export default function EventDetails() {
  const details = [
    {
      icon: <Calendar className="w-7 h-7 text-neon-yellow" />,
      label: 'DATE',
      title: 'October 12, 2026',
      sub: 'Monday Night Special',
      badge: 'OCT 12',
    },
    {
      icon: <Clock className="w-7 h-7 text-cyan-400" />,
      label: 'TIME',
      title: '10:00 PM Onwards',
      sub: 'Until Late Night Vibes',
      badge: '10:00 PM',
    },
    {
      icon: <Home className="w-7 h-7 text-amber-400" />,
      label: 'VENUE',
      title: "Hitesh's House",
      sub: 'Private Residence & Rooftop',
      badge: 'HEADQUARTERS',
    },
    {
      icon: <Ticket className="w-7 h-7 text-emerald-400" />,
      label: 'ENTRY PASS',
      title: '₹300 / Person',
      sub: 'Includes Food + Drinks (Share)',
      badge: 'ALL INCLUSIVE',
    },
  ];

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          <span className="font-display tracking-[0.2em] text-xs uppercase text-zinc-400 font-bold">
            THE BRIEFING
          </span>
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-wide">
          EVENT <span className="text-neon-yellow">DETAILS</span>
        </h2>
        <p className="font-chalk text-zinc-400 text-lg sm:text-xl mt-1">
          Lock the date in your calendar. No excuses.
        </p>
      </div>

      {/* 4 Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {details.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-night-900/80 border border-zinc-800 hover:border-neon-yellow/60 rounded-2xl p-6 transition-all duration-300 backdrop-blur-md shadow-xl hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(255,230,0,0.18)] flex flex-col justify-between"
          >
            {/* Top Row: Icon + Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-night-800 rounded-xl border border-zinc-700/60 group-hover:border-neon-yellow/50 transition-colors">
                {item.icon}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                {item.badge}
              </span>
            </div>

            {/* Content */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {item.label}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-neon-yellow transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-medium">{item.sub}</p>
            </div>

            {/* Bottom Subtle Bar */}
            <div className="mt-5 pt-3 border-t border-zinc-800/70 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Hitesh&apos;s Night Out</span>
              <Sparkles className="w-3.5 h-3.5 text-zinc-600 group-hover:text-neon-yellow transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Pass Banner inspired by poster bottom-right badge */}
      <div className="mt-10 max-w-2xl mx-auto">
        <div className="relative border-2 border-dashed border-neon-yellow/70 bg-night-900/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_25px_rgba(255,230,0,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-neon-yellow text-night-950 flex flex-col items-center justify-center font-black shadow-lg">
              <CrownDoodle className="w-6 h-6 text-night-950" />
              <span className="text-[10px] font-extrabold uppercase tracking-tighter">PASS</span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-display tracking-widest text-xs uppercase text-neon-yellow font-bold">
                  ★ ADMIT ONE ★
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-xs text-zinc-400">ENTRY PASS</span>
              </div>
              <h4 className="font-display text-3xl font-black text-white tracking-wide">
                ₹300 <span className="text-lg font-medium text-zinc-300">/ GUEST</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Covers unlimited fresh food + shared party liquids.
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="w-full sm:w-auto px-6 py-3 bg-neon-yellow text-night-950 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors text-center whitespace-nowrap shadow-md"
          >
            Claim Entry Pass
          </a>
        </div>
      </div>
    </section>
  );
}
