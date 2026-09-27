'use client';

import React from 'react';
import { Utensils, Wine, ChefHat, Sparkles, Flame } from 'lucide-react';
import { CrownDoodle, ChalkBox } from './Doodles';

export default function FoodMenu() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          <span className="font-display tracking-[0.2em] text-xs uppercase text-zinc-400 font-bold">
            TASTE & SIP
          </span>
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-wide">
          GOOD FOOD • GREAT DRINKS <br className="hidden sm:inline" />
          <span className="text-neon-yellow">BIGGER VIBES</span>
        </h2>
        <p className="font-chalk text-zinc-400 text-lg sm:text-xl mt-1">
          Hot from the kitchen & cold from the bar.
        </p>
      </div>

      {/* Menu Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* SOLIDS (FOOD) */}
        <div className="relative group bg-night-900/85 border-2 border-zinc-800 hover:border-amber-400 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.18)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="font-display text-3xl font-black text-white tracking-wider uppercase">
                  SOLIDS
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3" /> HOT & FRESH
              </span>
            </div>

            <div className="my-6 space-y-4">
              {/* Item 1 */}
              <div className="p-4 rounded-2xl bg-night-800/80 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-marker text-2xl text-white">Chicken Fry</h4>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-chalk">
                    Crispy & Spicy
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Marinated in secret spices, deep-fried to crisp perfection with fried chilies & lemon wedges.
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-4 rounded-2xl bg-night-800/80 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-marker text-2xl text-white">Paneer Tikka</h4>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-chalk">
                    Charcoal Grilled
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Smoked cottage cheese cubes skewered with crisp peppers and onions, basted with herb butter.
                </p>
              </div>
            </div>
          </div>

          {/* CHEF JINNA BHAI BADGE (from poster!) */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-800 flex items-center justify-between bg-night-950/70 p-4 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neon-yellow/20 text-neon-yellow">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                  EXECUTIVE CHEF
                </span>
                <span className="font-marker text-xl text-neon-yellow tracking-wide">
                  JINNA BHAI
                </span>
              </div>
            </div>
            <span className="text-xs font-chalk text-zinc-400">Master of the Skillet 🔥</span>
          </div>
        </div>

        {/* LIQUIDS (SHARED SIPS) */}
        <div className="relative group bg-night-900/85 border-2 border-zinc-800 hover:border-cyan-400 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-display text-3xl font-black text-white tracking-wider uppercase">
                  LIQUIDS
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                CHILLED
              </span>
            </div>

            <div className="my-6 space-y-4">
              {/* Item 1 */}
              <div className="p-4 rounded-2xl bg-night-800/80 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-marker text-2xl text-white">Vodka</h4>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-chalk">
                    Ice Cold
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Served chilled with mixers, fresh lime wedges, and rock ice.
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-4 rounded-2xl bg-night-800/80 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-marker text-2xl text-white">After Dark</h4>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-chalk">
                    Nightcap Pour
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Smooth evening spirits for late-night banter and celebration.
                </p>
              </div>
            </div>
          </div>

          {/* Included in Entry Banner */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-zinc-800 flex items-center justify-between bg-night-950/70 p-4 rounded-2xl border border-zinc-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                COVERAGE
              </span>
              <span className="font-display text-lg text-white font-bold">
                FOOD + LIQUIDS (SHARE)
              </span>
            </div>
            <div className="text-right">
              <span className="font-display text-2xl font-black text-neon-yellow">₹300</span>
              <span className="text-[10px] block text-zinc-400">PER HEAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Informal disclaimer as requested */}
      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500 font-sans max-w-xl mx-auto">
          * Private gathering among friends. All food and beverages are arranged communally under the ₹300 per head share. No sales or commercial transactions.
        </p>
      </div>
    </section>
  );
}
