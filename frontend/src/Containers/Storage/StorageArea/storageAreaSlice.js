import { createSlice } from '@reduxjs/toolkit'

const storageAreaSlice = createSlice({
  name: 'storageArea',
  initialState: [],
  reducers: {
    addStorageArea: (state, action) => {
      const newStorageArea = action.payload
      state.push(newStorageArea)
    },
    removeStorageArea: (state, action) => {
      const nameToRemove = action.payload
      return state.filter((stock) => Object.keys(stock)[0] !== nameToRemove)
    },
    updateStorageArea: (state, action) => {
      const updatedStock = action.payload
      const index = state.findIndex(
        (stock) => Object.keys(stock)[0] === Object.keys(updatedStock)[0]
      )
      if (index !== -1) {
        state[index] = updatedStock
      }
    }
  }
})

export const { addStorageArea, removeStorageArea, updateStorageArea } = storageAreaSlice.actions
export default storageAreaSlice.reducer
