import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          page: '#F5F1E8',     // Soft warm neutral background
          card: '#FFFFFF',     // Pure white for cards
          subtle: '#FFF7EA',   // Very light warm tone for highlights
        },
        // Border colors
        border: {
          soft: '#E5DCC5',     // Light border color
          strong: '#D0C4A3',   // Stronger border color
        },
        // Primary brand colors
        primary: {
          DEFAULT: '#E25A3A',  // Primary button color
          hover: '#C74A2F',    // Hover state
          soft: '#FFE8E0',     // Light tint for badges/chips
        },
        // Text colors
        text: {
          main: '#1E1B16',     // Main text
          muted: '#6B6251',    // Muted text
          soft: '#A79A80',     // Soft/lighter text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Typography scale
      fontSize: {
        'display-xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 36px
        'heading-lg': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 30px
        'heading-md': ['1.25rem', { lineHeight: '1.3' }], // 20px
        'body-md': ['0.875rem', { lineHeight: '1.6' }], // 14px
        'body-sm': ['0.75rem', { lineHeight: '1.5' }], // 12px
        'label-xs': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }], // 11px
      },
      // Spacing scale (4px grid)
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
      },
      // Custom shadows
      boxShadow: {
        'card': '0 8px 20px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 30px rgba(0,0,0,0.06)',
      },
      // Border radius
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
