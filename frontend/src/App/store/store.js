import { configureStore } from '@reduxjs/toolkit'
import storageAreaReducer from '../../Containers/Storage/StorageArea/storageAreaSlice'
import storageItemReducer from '../../Containers/Forms/Adding/Product/storageItemSlice'
import storageAreaSelectionReducer from '../../Containers/Storage/StorageAreaSelection/storageAreaSelectionSlice'
import foodCategoryReducer from '../../Containers/Forms/FoodCategory/foodCategorySlice'
import scannerReducer from '../../Components/Scanner/scannerSlice'
import authReducer from '../../Containers/Forms/Authentication/authSlice'
import storageReducer from '../../Containers/Storage/storageSlice'
import { localStorageSync, persistedState } from './middleware/localStorage'
import modalReducer from '../../Containers/Modal/modalSlice'

export const store = configureStore({
  devTools: true,
  preloadedState: persistedState,
  reducer: {
    auth: authReducer,
    storage: storageReducer,
    storageArea: storageAreaReducer,
    storageItem: storageItemReducer,
    storageAreaSelection: storageAreaSelectionReducer,
    foodCategory: foodCategoryReducer,
    scanner: scannerReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageSync)
})
