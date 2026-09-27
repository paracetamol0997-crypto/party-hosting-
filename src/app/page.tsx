import React from 'react';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import EventDetails from '@/components/EventDetails';
import PartyMembers from '@/components/PartyMembers';
import FoodMenu from '@/components/FoodMenu';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-night-950 text-white overflow-hidden selection:bg-neon-yellow selection:text-night-950">
      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,50,180,0.15),rgba(255,255,255,0))]" />

      {/* 1. Hero / Invitation */}
      <Hero />

      {/* 2. Live Countdown Timer */}
      <Countdown />

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto px-4 my-4">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      {/* 3. Event Details */}
      <EventDetails />

      {/* 4. Party Members (Elite, DJ, Delight, Special Item JON) */}
      <PartyMembers />

      {/* 5. Food & Menu */}
      <FoodMenu />

      {/* 6. Guest Registration (with inline Success Pass & Confetti) */}
      <RegistrationForm />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Optional Party Audio Player (Strictly user-initiated) */}
      <AudioPlayer />
    </main>
  );
}
