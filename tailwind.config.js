/**** Tailwind CSS v3 config (pinned patterns) ****/
/**
 * We use Tailwind in classic mode with dark mode via class for predictable UI theming.
 */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // soft indigo-blue
        accent: '#8B5CF6', // violet accent
        bgDark: '#0F172A',
        surfaceLight: '#F9FAFB',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        glass: 'rgba(255, 255, 255, 0.08)',
        teal: '#14B8A6',
        violet: '#8B5CF6',
        emerald: '#10B981',
        neutral: '#9CA3AF',
        blush: '#F472B6',
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'Arial', 'sans-serif'],
        body: ['Inter', 'Outfit', 'Plus Jakarta Sans', 'system-ui', 'Arial', 'sans-serif'],
        numeric: ['Orbitron', 'Rajdhani', 'Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 15px rgba(99, 102, 241, 0.4)',
        ai: '0 4px 30px rgba(99, 102, 241, 0.15)',
        'inner-glass': 'inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.15)',
      },
      backgroundImage: {
        'blue-violet-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
      keyframes: {
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0px rgba(99, 102, 241, 0.0)' },
          '50%': { boxShadow: '0 0 24px rgba(99, 102, 241, 0.45)' },
        },
        'soft-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'float-in': 'float-in 400ms ease-out both',
        'pulse-glow': 'pulse-glow 1200ms ease-in-out infinite',
        'soft-bounce': 'soft-bounce 1200ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
