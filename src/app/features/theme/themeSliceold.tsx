import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type ThemeState = {
  theme: 'dark' | 'light'
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    // localStorage'dan kayıtlı temayı al
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme as 'light' | 'dark'
    }

    // Sistem tercihini kontrol et
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'

      if (typeof window !== 'undefined') {
        const root = window.document.documentElement
        root.classList.toggle('dark', state.theme === 'dark')
        localStorage.setItem('theme', state.theme)
      }
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload

      if (typeof window !== 'undefined') {
        const root = window.document.documentElement
        root.classList.toggle('dark', state.theme === 'dark')
        localStorage.setItem('theme', state.theme)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
