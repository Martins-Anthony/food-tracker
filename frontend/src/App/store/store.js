import { configureStore } from '@reduxjs/toolkit'
import storageAreaReducer from '../../Containers/StorageArea/storageAreaSlice'
import storageItemReducer from '../../Containers/Forms/Adding/Product/storageItemSlice'
import storageAreaSelectionReducer from '../../Containers/StorageArea/StorageAreaSelection/storageAreaSelectionSlice'
import foodCategoryReducer from '../../Containers/Forms/FoodCategory/foodCategorySlice'
import scannerReducer from '../../Components/Scanner/scannerSlice'
import authReducer from '../../Containers/Forms/Authentication/authSlice'
import { localStorageSync, persistedState } from './middleware/localStorage'
import modalReducer from '../../Containers/Modal/modalSlice'

export const store = configureStore({
  devTools: true,
  preloadedState: persistedState,
  reducer: {
    auth: authReducer,
    storageArea: storageAreaReducer,
    storageItem: storageItemReducer,
    storageAreaSelection: storageAreaSelectionReducer,
    foodCategory: foodCategoryReducer,
    scanner: scannerReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageSync)
})
