/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  plugins: [
    // Register a `light:` variant so component utilities like `light:bg-slate-200`
    // generate CSS scoped to the `.light` class on <html>. Mirrors the built-in
    // `dark:` variant (which is scoped to `.dark`), enabling dual-theme support.
    plugin(({ addVariant }) => {
      addVariant('light', '.light &');
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite 4s',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'rotate-in': 'rotate-in 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6), 0 0 60px rgba(217, 70, 239, 0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-in': {
          '0%': { transform: 'rotate(-5deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.4)',
        'glow-lg': '0 0 40px rgba(14, 165, 233, 0.5), 0 0 80px rgba(217, 70, 239, 0.3)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
      },
    },
  },
};