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
        stars:
          "url('https://awv3node-homepage.surge.sh/build/assets/stars.svg')",
      },
      backgroundSize: {
        '200%': '200%',
      },
      fontFamily: {
        carouselFont: ['Dancing Script Variable', 'cursive'],
        sidebarFont: ['Cinzel Variable', 'serif'],
      },
      colors: {
        firstParallax: '#7286D3',
        secondParallax: '#8EA7E9',
        thirdParallax: '#E5E0FF',
        mainTextClr: '#FFF2F2',
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
