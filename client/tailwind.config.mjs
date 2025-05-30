/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          900: '#511C10',
          800: '#C4320A',
          500: '#FB6514',
          400: '#FD853A',
          300: '#FEB273',
          200: '#FFEAD5',
          100: '#FFFAF5',
        },
        pink: {
          900: '#4E0D30',
          800: '#DD2590',
          500: '#EE46BC',
          400: '#F670C7',
          300: '#FCCEEE',
          200: '#FCE7F6',
          100: '#FEF6FB',
        },
        blue: {
          900: '#2E107F',
          800: '#4518BF',
          500: '#5C20FF',
          400: '#AE90FF',
          300: '#D6C7FF',
          200: '#EEE8FF',
          100: '#F7F4FF',
        },
        green: {
          900: '#007F0A',
          800: '#00BF10',
          500: '#00FF15',
          400: '#80FF8A',
          300: '#BFFFC4',
          200: '#E5FFE7',
        },
        yellow: {
          900: '#736F3A',
          800: '#BFBC00',
          500: '#FFFB00',
          400: '#FFFD80',
          300: '#FFFEBF',
          200: '#FFFFE5',
        },
        red: {
          900: '#7F0017',
          800: '#BF0023',
          500: '#FF002F',
          400: '#FF8097',
          300: '#FFBFCB',
          200: '#FFE5EA',
        },
      }
    },
  },
  fontFamily: {
    sans: ['var(--font-inter)', 'sans-serif'],
    display: ['var(--font-kalnia)', 'serif'],
  },
  fontSize: {
    'display-2xl': ['96px', { lineHeight: '90px', letterSpacing: '-0.02em' }],
    'display-xl': ['76px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
    'display-lg': ['48px', { lineHeight: '60px' }],
    'display-md': ['36px', { lineHeight: '44px' }],
    'display-sm': ['30px', { lineHeight: '38px' }],
    'display-xs': ['24px', { lineHeight: '32px' }],
    'text-xl': ['20px', { lineHeight: '30px', letterSpacing: '-0.02em' }],
    'text-lg': ['18px', { lineHeight: '28px' }],
    'text-md': ['16px', { lineHeight: '24px' }],
    'text-sm': ['14px', { lineHeight: '20px' }],
    'text-xs': ['12px', { lineHeight: '18px' }],
  },
  fontWeight: {
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
  },
};
