import type { Metadata } from 'next'
import Welcome from '@/components/Welcome'

// Supports weights 300-800
import '@fontsource-variable/open-sans/wdth-italic.css'

export const metadata: Metadata = {
  title: 'MyPortfolioApp',
  description: "Oğuzcan Toptaş: Developer's Portfolio",
}

const App = () => {
  return (
    <div className="h-full w-screen">
      <Welcome />
    </div>
  )
}

export default App
