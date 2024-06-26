import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../app/features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
