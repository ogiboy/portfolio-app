import type { Metadata } from 'next'

import App from '@/components/App'

export const metadata: Metadata = {
  title: 'MyPortfolioApp',
  description: "Oğuzcan Toptaş: Developer's Portfolio",
}

const Home = () => {
  return <App />
}

export default Home
