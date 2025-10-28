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
        glass: 'rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 15px rgba(99, 102, 241, 0.4)',
      },
      backgroundImage: {
        'blue-violet-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
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
      },
    },
  },
  plugins: [],
};
