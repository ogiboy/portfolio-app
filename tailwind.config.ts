import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('/cat_tower_enhanced.jpeg')",
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    // require('tailwind-scrollbar-hide'),
  ],
  darkMode: 'class',
}
export default config
