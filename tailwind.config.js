/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#090d16',
        panel: '#0f172a',
        accent: 'var(--accent-color, #10b981)',
        accentSoft: 'var(--accent-soft, #34d399)',
      },
      boxShadow: {
        glow: '0 0 0 1px var(--glow-border, rgba(16, 185, 129, 0.2)), 0 20px 50px rgba(0, 0, 0, 0.45)',
        glowLg: '0 0 35px var(--glow-ambient, rgba(16, 185, 129, 0.25)), 0 25px 60px rgba(0, 0, 0, 0.55)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
