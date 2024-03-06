'use client'

import Welcome from '@/components/Welcome'
import { ThemeProvider } from 'next-themes'

// Supports weights 300-800
import '@fontsource-variable/open-sans/wdth-italic.css'

import type { NextComponentType, NextPageContext } from 'next'

interface AppPropsWithoutRouter {
  Component: NextComponentType<NextPageContext, any, any>
}

const Wrapper = ({ Component }: AppPropsWithoutRouter) => {
  return (
    <ThemeProvider attribute="class">
      <Component />
    </ThemeProvider>
  )
}

const App = () => {
  return <Wrapper Component={Welcome} />
}

export default App
