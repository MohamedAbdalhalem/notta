import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './authSlice'
import  notesSlice  from './notesSlice'

export const store = configureStore({
  reducer: {
    authSlice,
    notesSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch