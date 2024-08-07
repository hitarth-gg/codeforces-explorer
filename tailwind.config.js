/* eslint-disable import/no-anonymous-default-export */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'inter': ['inter','ui-sans-serif', 'system-ui'],
      'spaceMono': ['space-mono','ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
}

