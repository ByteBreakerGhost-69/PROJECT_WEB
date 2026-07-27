import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        charcoal: '#2C2C2C',
        terracotta: '#E07A5F',
        sage: '#81B29A',
        gold: '#F4A261',
      },
      fontFamily: {
        // Bind ke CSS variables yang di-declare lewat next/font di layout.tsx
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
        pixel: ['var(--font-pixel)', 'monospace'],
      },
      letterSpacing: {
        wide15: '1.5px',
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'kiko-idle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-2deg)' },
        },
        'kiko-blow': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(-10px) rotate(-6deg)' },
        },
      },
      animation: {
        'kiko-idle': 'kiko-idle 3.2s ease-in-out infinite',
        'kiko-blow': 'kiko-blow 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
