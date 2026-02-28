import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const theme = getInitialTheme()

if (theme) {
  console.log('theme: ' + theme)
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle(
          'dark',
          state.theme === 'dark'
        )
        localStorage.setItem('theme', state.theme)
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle(
          'dark',
          action.payload === 'dark'
        )
        localStorage.setItem('theme', action.payload)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
