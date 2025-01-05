/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#F9FAFB', // Background terang
        'primary-text': '#111827', // Teks gelap
        'primary-text-dark': '#D1D5DB', // Teks terang untuk dark mode
        'secondary-text': '#6B7280', // Teks sekunder
        'primary-blue': '#3B82F6', // Biru terang untuk tombol
        'gray-light': '#D1D5DB', // Border terang
        'gray-dark': '#1A1A1D', // Border gelap
        'dark-bg': '#0C0C0C', // Latar belakang gelap
        'dark-gray': '#9CA3AF', // Teks abu-abu gelap
      },
    },
  },
  plugins: [],
};
