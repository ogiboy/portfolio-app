import { configureStore } from '@reduxjs/toolkit';
import modalSlice from '../app/features/modal/modalSlice';
import themeSlice from '../app/features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
