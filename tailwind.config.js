/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          yellow: '#FFE600',
          gold: '#FFD700',
          orange: '#FF7A00',
          purple: '#9333EA',
          violet: '#7C3AED',
          cyan: '#00E5FF',
          blue: '#2563EB',
        },
        night: {
          950: '#07070A',
          900: '#0D0D14',
          850: '#12121D',
          800: '#171725',
          700: '#222234',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        marker: ['var(--font-marker)', 'cursive'],
        chalk: ['var(--font-caveat)', 'cursive'],
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        'neon-yellow': '0 0 25px rgba(255, 230, 0, 0.45)',
        'neon-yellow-lg': '0 0 50px rgba(255, 230, 0, 0.65)',
        'neon-purple': '0 0 35px rgba(147, 51, 234, 0.5)',
        'neon-cyan': '0 0 30px rgba(0, 229, 255, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 230, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-flicker': 'flicker 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '41%': { opacity: 1 },
          '42%': { opacity: 0.8 },
          '43%': { opacity: 1 },
          '45%': { opacity: 0.85 },
          '46%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
};
