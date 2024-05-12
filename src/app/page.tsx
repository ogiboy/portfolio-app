import type { Metadata } from 'next'

import TextCarousel from '@/components/TextCarousel'
import LandingPage from '@/components/LandingPage'

// Supports weights 300-800
import '@fontsource-variable/open-sans/wdth-italic.css'

export const metadata: Metadata = {
  title: 'MyPortfolioApp',
  description: "Oğuzcan Toptaş: Developer's Portfolio",
}

const App = () => {
  const texts = [
    'Meow',
    'Hello',
    'Merhaba',
    'Under Construction',
    'Yapım Aşamasında',
  ]

  return (
    <div className="min-h-screen w-screen bg-main-bg bg-no-repeat bg-cover bg-center">
      <LandingPage />
      <div className="w-fit fixed top-32 left-20">
        <TextCarousel texts={texts} />
      </div>
    </div>
  )
}

export default App
