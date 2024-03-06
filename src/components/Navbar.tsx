import { useTheme } from 'next-themes'
import { Within } from '@theme-toggles/react'

import '@/styles/navbar-styles.css'
import '@theme-toggles/react/css/Within.css'

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme()

  return (
    <nav>
      <Within
        toggled={systemTheme === theme}
        toggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="theme-toggler"
        placeholder="theme-toggler"
        tabIndex={999}
        duration={1000}
      />
    </nav>
  )
}
export default Navbar
