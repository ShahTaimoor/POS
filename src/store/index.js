import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
}) 