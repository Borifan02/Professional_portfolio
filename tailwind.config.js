/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',
        panel: '#111827',
        accent: '#22c55e',
        accentSoft: '#86efac',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 197, 94, 0.18), 0 20px 60px rgba(15, 23, 42, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
