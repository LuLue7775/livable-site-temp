const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        livable: '#002c24',
      },
      fontFamily: {
        // serif: ['var(--eb_garamond)'],
        serif: ['var(--sometimes)'],
        mono: ['var(--ysabeau)'],
        zh: ['var(--noto_serif_jp)'],
      },
      width: {
        100: '25rem',
      },
      gridAutoRows: {
        '1fr': 'minmax(0, 1fr)',
      },
      gridTemplateColumns: ({ theme }) => ({
        'background-split': `1fr 
            ${theme('width.96')} 
            calc(
              ${theme('maxWidth.7xl')} - ${theme('width.96')} - ${theme('padding.8')}
            ) 
            1fr`,
      }),
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .5s ease-in-out ',
        fadeOut: 'fadeOut .8s ease-in-out ',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      })
    }),
  ],
}
