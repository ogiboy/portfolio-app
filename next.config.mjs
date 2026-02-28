import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  turbopack: {
    root: '/Users/ogiboy/Documents/Projects/portfolio-app',
  },
  //   webpack(config) {
  //     config.module.rules.push({
  //       test: /\.svg$/,
  //       use: ['@svgr/webpack'],
  //     })
  //     return config
  //   },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
