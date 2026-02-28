import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme =>
  globalThis.window !== undefined &&
  globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (globalThis.window !== undefined) {
        document.documentElement.classList.toggle(
          'dark',
          state.theme === 'dark',
        );
        localStorage.setItem('theme', state.theme);
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (globalThis.window !== undefined) {
        document.documentElement.classList.toggle(
          'dark',
          action.payload === 'dark',
        );
        localStorage.setItem('theme', action.payload);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
