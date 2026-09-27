import React from 'react';
import { CrownDoodle } from './Doodles';
import { Lock, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-zinc-800/80 bg-night-950/90 py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Crown & Title */}
        <div className="flex items-center gap-2">
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
          <span className="font-display text-2xl font-black uppercase text-white tracking-widest">
            NIGHT OUT
          </span>
          <CrownDoodle className="w-6 h-6 text-neon-yellow" />
        </div>

        <p className="font-chalk text-zinc-400 text-lg">
          Hosted with pride by <span className="text-neon-yellow font-bold">Hitesh</span> • October 12, 2026
        </p>

        <p className="text-xs text-zinc-500 max-w-md">
          Good Food • Great Drinks • Bigger Vibes. An exclusive private party gathering.
        </p>

        {/* Discreet Host Admin Link */}
        <div className="pt-4 border-t border-zinc-900 w-full flex items-center justify-between text-xs text-zinc-600">
          <span>© 2026 Night Out. Private Invitation.</span>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 hover:text-neon-yellow transition-colors"
            title="Host Admin Portal"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Host Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
