import { configureStore } from '@reduxjs/toolkit'
import foodCategoryReducer from '../../Containers/Forms/FoodCategory/foodCategorySlice'
import scannerReducer from '../../Components/Scanner/scannerSlice'
import authReducer from '../../Containers/Forms/Authentication/authSlice'
import storageReducer from '../../Containers/Storage/storageSlice'
import { localStorageSync, persistedState } from './middleware/localStorage'
import modalReducer from '../../Containers/Modal/modalSlice'
import sidebarReducer from '../../Containers/Layouts/Sidebar/sidebarSlice'

export const store = configureStore({
  devTools: true,
  preloadedState: persistedState,
  reducer: {
    auth: authReducer,
    storage: storageReducer,
    foodCategory: foodCategoryReducer,
    scanner: scannerReducer,
    modal: modalReducer,
    sidebar: sidebarReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageSync)
})
