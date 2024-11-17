/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#ff63ac',
        color_pos: '#fa0015',
        color_neg: '#000cfa',
        market_code: '#8c8b88',
        list_hover: '#e1e3e1',
      },
      screens: {
        'max-1180': { max: '1180px' },
        'max-900': { max: '900px' },
        'max-500': { max: '500px' },
      },
      fontFamily: {
        ng: 'NEXON Lv1 Gothic OTF',
        oneTitle: 'ONE-Mobile-Title',
      },
    },
  },
  plugins: [],
};
