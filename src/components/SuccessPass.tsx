'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Share2, Calendar, MapPin, Users, Ticket, Flame, ArrowLeft } from 'lucide-react';
import { CrownDoodle, StarDoodle } from './Doodles';
import { calculateTimeRemaining, TimeRemaining } from './Countdown';

export interface ConfirmedGuestData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  numberOfPeople: number;
  message?: string;
  registeredAt: string;
}

interface SuccessPassProps {
  guest: ConfirmedGuestData;
  onReset?: () => void;
}

export default function SuccessPass({ guest, onReset }: SuccessPassProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
  });

  useEffect(() => {
    // Fire festive party confetti
    const fireCelebration = () => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFE600', '#FF7A00', '#9333EA', '#00E5FF', '#FFFFFF'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFE600', '#00E5FF'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFE600', '#FF7A00'],
        });
      }, 350);
    };

    fireCelebration();

    // Start live countdown
    setTimeLeft(calculateTimeRemaining());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalCost = guest.numberOfPeople * 300;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🔥 I just locked in my spot for HITESH'S NIGHT OUT! 🎉\n\n📅 Date: October 12, 2026\n⏰ Time: 10:00 PM Onwards\n📍 Venue: Hitesh's House\n👥 Party Squad: ${guest.numberOfPeople} person(s)\n\nLock in your spot too before capacity runs out!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Top Banner Celebration */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-neon-yellow/20 text-neon-yellow mb-3 shadow-[0_0_25px_rgba(255,230,0,0.5)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-display text-5xl sm:text-7xl font-black text-white uppercase tracking-tight">
          🎉 YOU&apos;RE IN!
        </h2>
        <p className="font-marker text-neon-yellow text-xl sm:text-2xl mt-1 tracking-wide">
          Your spot for NIGHT OUT is confirmed.
        </p>
      </div>

      {/* The VIP Ticket Pass Container */}
      <div className="relative bg-night-900 border-2 border-neon-yellow rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,230,0,0.3)] backdrop-blur-xl overflow-hidden">
        {/* Decorative corner cutouts (ticket effect) */}
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-night-950 border-r-2 border-neon-yellow" />
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-night-950 border-l-2 border-neon-yellow" />

        {/* Pass Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-dashed border-zinc-800">
          <div className="flex items-center gap-2">
            <CrownDoodle className="w-8 h-8 text-neon-yellow" />
            <div>
              <span className="font-display text-2xl font-black tracking-wider text-white">
                NIGHT OUT
              </span>
              <span className="text-[10px] block font-extrabold uppercase tracking-widest text-zinc-400">
                OFFICIAL ENTRY PASS
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-neon-yellow font-bold bg-night-800 px-3 py-1 rounded-full border border-zinc-700">
              #{guest.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Registered Guest Details */}
        <div className="py-6 space-y-4">
          <div className="bg-night-950/80 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              GUEST NAME
            </span>
            <div className="font-display text-3xl font-black text-neon-yellow">
              {guest.fullName}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-night-950/60 rounded-xl border border-zinc-800/80 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-neon-yellow shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Date & Time</span>
                <span className="text-sm font-bold text-white">Oct 12, 2026 • 10:00 PM onwards</span>
              </div>
            </div>

            <div className="p-3.5 bg-night-950/60 rounded-xl border border-zinc-800/80 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Venue</span>
                <span className="text-sm font-bold text-white">Hitesh&apos;s House</span>
              </div>
            </div>

            <div className="p-3.5 bg-night-950/60 rounded-xl border border-zinc-800/80 flex items-center gap-3">
              <Users className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Party Squad</span>
                <span className="text-sm font-bold text-white">
                  {guest.numberOfPeople} {guest.numberOfPeople === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-night-950/60 rounded-xl border border-zinc-800/80 flex items-center gap-3">
              <Ticket className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Entry Share</span>
                <span className="text-sm font-bold text-white">
                  ₹300 per person (Total: ₹{totalCost})
                </span>
              </div>
            </div>
          </div>

          {guest.message && (
            <div className="p-3 bg-night-950/40 rounded-xl border border-zinc-800/60 text-xs text-zinc-300 italic">
              <span className="not-italic font-bold text-zinc-500 uppercase text-[10px] block">
                Note for Hitesh:
              </span>
              &ldquo;{guest.message}&rdquo;
            </div>
          )}
        </div>

        {/* Live Personalized Countdown */}
        <div className="pt-6 border-t-2 border-dashed border-zinc-800 text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 block mb-2">
            ONLY
          </span>

          <div className="flex justify-center items-center gap-2 sm:gap-4 my-2">
            {[
              { val: timeLeft.days, label: 'DAYS' },
              { val: timeLeft.hours, label: 'HOURS' },
              { val: timeLeft.minutes, label: 'MINUTES' },
              { val: timeLeft.seconds, label: 'SECONDS' },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="bg-night-950 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-zinc-700/80 min-w-[60px] sm:min-w-[75px]"
              >
                <div className="font-display text-2xl sm:text-3xl font-black text-neon-yellow">
                  {String(unit.val).padStart(2, '0')}
                </div>
                <div className="text-[9px] uppercase font-bold tracking-wider text-zinc-400">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 block mt-2">
            UNTIL THE NIGHT
          </span>
        </div>

        {/* Punchline */}
        <div className="mt-6 text-center">
          <p className="font-marker text-2xl sm:text-3xl text-white tracking-wider flex items-center justify-center gap-2">
            <span>See you there!</span>
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 inline animate-bounce" />
          </p>
        </div>
      </div>

      {/* Action Buttons: WhatsApp Share & Done */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleWhatsAppShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Pass on WhatsApp</span>
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-night-800 hover:bg-night-700 text-zinc-300 font-semibold rounded-xl border border-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Register Another Guest</span>
          </button>
        )}
      </div>
    </div>
  );
}
