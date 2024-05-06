import { createSlice } from '@reduxjs/toolkit'

const storageItemSlice = createSlice({
  name: 'storageItems',
  initialState: {},
  reducers: {
    addItemToStorage: (state, action) => {
      const { areaName, item } = action.payload
      if (state[areaName]) {
        state[areaName].push(item)
      } else {
        state[areaName] = [item]
      }
    },
    removeItemFromStorage: (state, action) => {
      const { areaName, itemId } = action.payload
      if (state[areaName]) {
        state[areaName] = state[areaName].filter((item) => item.id !== itemId)
      }
    },
    updateItemInStorage: (state, action) => {
      const { areaName, itemId, updatedItem } = action.payload
      if (state[areaName]) {
        const index = state[areaName].findIndex((item) => item.id === itemId)
        if (index !== -1) {
          state[areaName][index] = updatedItem
        }
      }
    }
  }
})

export const { addItemToStorage, removeItemFromStorage, updateItemInStorage } =
  storageItemSlice.actions
export default storageItemSlice.reducer
