/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        cream: {
          DEFAULT: '#fbf7ef',
          deep: '#f7efd9',
          light: '#fdfbf7',
        },
        honey: '#fdf0b8',
        sun: '#f4c521',
        char: {
          DEFAULT: '#211f1a',
          soft: '#3a372f',
          muted: '#524e43',
        },
        leaf: {
          DEFAULT: '#4f7a3f',
          dark: '#3d6131',
          soft: '#eaf1e2',
        },
        clay: {
          DEFAULT: '#c26a3a',
          soft: '#fbf0e8',
        },
        'ink-muted': '#7c7768',
        line: '#e9e2d1',
        'line-light': '#f3ede1',
      },
      boxShadow: {
        'terra': '0 4px 20px -2px rgba(33, 31, 26, 0.05)',
        'terra-md': '0 8px 30px -4px rgba(33, 31, 26, 0.08)',
        'terra-lg': '0 12px 40px -6px rgba(33, 31, 26, 0.12)',
      }
    },
  },
  plugins: [],
}
