import { configureStore } from '@reduxjs/toolkit'
import storageAreaReducer from '../../Containers/StorageArea/storageAreaSlice'
import storageItemReducer from '../../Containers/Forms/Adding/Product/storageItemSlice'
import storageAreaSelectionReducer from '../../Containers/StorageArea/StorageAreaSelection/storageAreaSelectionSlice'
import foodCategoryReducer from '../../Containers/Forms/FoodCategory/foodCategorySlice'
import scannerReducer from '../../Components/Scanner/scannerSlice'
import authReducer from '../../Containers/Forms/MagicLink/authSlice'

const persistedState = sessionStorage.getItem('reduxState')
  ? JSON.parse(sessionStorage.getItem('reduxState'))
  : {}

export const store = configureStore({
  devTools: true,
  preloadedState: persistedState,
  reducer: {
    auth: authReducer,
    storageArea: storageAreaReducer,
    storageItem: storageItemReducer,
    storageAreaSelection: storageAreaSelectionReducer,
    foodCategory: foodCategoryReducer,
    scanner: scannerReducer
  }
})

store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
