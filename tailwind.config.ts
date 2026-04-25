import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'se-navy':        '#0D1B3E',
        'se-navy-alt':    '#162248',
        'se-card':        '#1E2D5A',
        'se-card-teal':   '#143B33',
        'se-teal-dark':   '#0C2E28',  // Bandeau teal
        'se-orange':      '#E8621A',
        'se-orange-h':    '#FF7D35',
        'se-teal':        '#4ABFB0',
        'se-muted':       '#8B9CC8',
        'se-muted-teal':  '#7BBFB8',
      },
      fontFamily: {
        display:     ['var(--font-display)', 'sans-serif'],
        body:        ['var(--font-body)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
