import React from 'react';

/**
 * Hand-drawn yellow party crown doodle from the poster
 */
export function CrownDoodle({ className = 'w-8 h-8 text-neon-yellow' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 70"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 12 55 L 20 22 L 40 40 L 50 12 L 60 40 L 80 22 L 88 55 Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="18" r="4" fill="currentColor" />
      <circle cx="50" cy="8" r="4.5" fill="currentColor" />
      <circle cx="80" cy="18" r="4" fill="currentColor" />
      <path
        d="M 10 57 Q 50 63 90 57"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Radiating yellow chalk burst lines
 */
export function BurstRays({ className = 'w-10 h-10 text-neon-yellow' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="12" y1="12" x2="4" y2="4" />
      <line x1="25" y1="10" x2="25" y2="2" />
      <line x1="38" y1="12" x2="46" y2="4" />
      <line x1="40" y1="25" x2="48" y2="25" />
      <line x1="10" y1="25" x2="2" y2="25" />
    </svg>
  );
}

/**
 * Textured yellow brush stroke banner backdrop
 */
export function BrushStroke({
  children,
  className = '',
  color = 'bg-neon-yellow',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`absolute inset-0 ${color} -rotate-1 rounded-sm transform scale-105 opacity-90 -z-10 shadow-lg`}
        style={{
          clipPath:
            'polygon(2% 4%, 98% 1%, 100% 88%, 97% 98%, 3% 96%, 0% 12%)',
        }}
      />
      {children}
    </div>
  );
}

/**
 * Hanging string lights banner across the top
 */
export function HangingStringLights() {
  return (
    <div className="w-full overflow-hidden pointer-events-none select-none relative h-16 sm:h-20">
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        className="w-full h-full text-zinc-700/60"
        preserveAspectRatio="none"
      >
        {/* Sagging wires */}
        <path
          d="M0 10 Q 150 45, 300 15 Q 450 45, 600 15 Q 750 45, 900 15 Q 1050 45, 1200 10"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="2"
        />
        {/* Glow and light bulbs along the wire */}
        {[
          { cx: 75, cy: 30, color: '#FFE600' },
          { cx: 150, cy: 45, color: '#FF9100' },
          { cx: 225, cy: 30, color: '#FFE600' },
          { cx: 375, cy: 32, color: '#FF7A00' },
          { cx: 450, cy: 45, color: '#FFE600' },
          { cx: 525, cy: 30, color: '#FFD700' },
          { cx: 675, cy: 30, color: '#FFE600' },
          { cx: 750, cy: 45, color: '#FF9100' },
          { cx: 825, cy: 30, color: '#FFE600' },
          { cx: 975, cy: 32, color: '#FFD700' },
          { cx: 1050, cy: 45, color: '#FFE600' },
          { cx: 1125, cy: 30, color: '#FF7A00' },
        ].map((bulb, i) => (
          <g key={i}>
            <circle
              cx={bulb.cx}
              cy={bulb.cy + 6}
              r="12"
              fill={bulb.color}
              className="opacity-40 animate-pulse"
              filter="blur(4px)"
            />
            <circle
              cx={bulb.cx}
              cy={bulb.cy + 6}
              r="5"
              fill="#FFFFFF"
            />
            <circle
              cx={bulb.cx}
              cy={bulb.cy + 6}
              r="4"
              fill={bulb.color}
            />
            <rect
              x={bulb.cx - 2}
              y={bulb.cy}
              width="4"
              height="3"
              fill="#555"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Hand-drawn chalk border card container
 */
export function ChalkBox({
  children,
  className = '',
  borderColor = 'border-neon-yellow',
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative p-5 sm:p-7 rounded-2xl border-2 border-dashed ${borderColor} ${
        glow ? 'shadow-[0_0_20px_rgba(255,230,0,0.12)]' : ''
      } bg-night-900/85 backdrop-blur-md transition-all duration-300 hover:border-solid hover:shadow-[0_0_30px_rgba(255,230,0,0.22)] ${className}`}
      style={{
        boxShadow: glow ? '0 0 25px rgba(255, 230, 0, 0.15)' : undefined,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hand-drawn star
 */
export function StarDoodle({ className = 'w-5 h-5 text-neon-yellow' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 19.324l-7.335 3.843 1.401-8.169-5.934-5.784 8.2-1.192zm0 5.702l-2.072 4.198-4.632.673 3.352 3.267-.791 4.614L12 16.852l4.143 2.189-.791-4.614 3.352-3.267-4.632-.673z" />
    </svg>
  );
}

/**
 * Distressed paint splash badge for SPECIAL ITEM KAJU AUNTY
 */
export function SpecialItemBadge() {
  return (
    <div className="relative inline-flex items-center justify-center px-8 py-4 my-2 group">
      {/* Distressed yellow paint splatter background */}
      <div
        className="absolute inset-0 bg-neon-yellow rounded-xl transform -rotate-2 group-hover:rotate-0 transition-transform shadow-[0_0_25px_rgba(255,230,0,0.5)]"
        style={{
          clipPath:
            'polygon(4% 0%, 96% 4%, 100% 85%, 94% 100%, 8% 95%, 0% 75%)',
        }}
      />
      <div className="relative z-10 flex items-center space-x-3 text-night-950 font-black">
        <StarDoodle className="w-5 h-5 text-black" />
        <div className="text-center">
          <div className="text-xs tracking-widest font-extrabold uppercase text-zinc-900">
            ★ SPECIAL ITEM ★
          </div>
          <div className="text-2xl sm:text-4xl font-black font-display tracking-wider whitespace-nowrap">
            KAJU AUNTY
          </div>
        </div>
        <StarDoodle className="w-5 h-5 text-black" />
      </div>
    </div>
  );
}
