/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        carouselFont: ['Space Grotesk', 'sans-serif'],
        sidebarFont: ['Inter', 'sans-serif'],
      },
      colors: {
        firstParallax: '#080810',
        secondParallax: '#0c0c18',
        thirdParallax: '#0a0814',
        mainTextClr: '#e2e8f0',
        accent: '#818cf8',
        'accent-muted': '#4f46e5',
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025' fill-rule='evenodd'%3E%3Cpath d='M0 0h60v1H0zm0 59h60v1H0zM0 0v60H1V0zm59 0v60h1V0z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
