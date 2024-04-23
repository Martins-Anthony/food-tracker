import { configureStore } from '@reduxjs/toolkit'
import storageAreaReducer from '../../Containers/StorageArea/storageAreaSlice'
import storageItemReducer from '../../Containers/Forms/StorageItem/storageItemSlice'
import storageAreaSelectionReducer from '../../Containers/StorageArea/StorageAreaSelection/storageAreaSelectionSlice'

const persistedState = sessionStorage.getItem('reduxState')
  ? JSON.parse(sessionStorage.getItem('reduxState'))
  : {}

export const store = configureStore({
  devTools: true,
  preloadedState: persistedState,
  reducer: {
    storageArea: storageAreaReducer,
    storageItem: storageItemReducer,
    storageAreaSelection: storageAreaSelectionReducer
  }
})

store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
