import { createSlice } from '@reduxjs/toolkit'
import { getStorage } from './Get/getStorage'

const storageSlice = createSlice({
  name: 'storage',
  initialState: { data: [], selected: null },
  reducers: {
    storageAreaSelected: (state, action) => {
      state.selected = action.payload
    },
    itemExpired: (state, action) => {
      const { itemId, expirationDate } = action.payload
      const storageArea = state.data.find((area) => area.items.some((item) => item._id === itemId))
      if (storageArea) {
        const item = storageArea.items.find((item) => item._id === itemId)
        if (item) {
          item.expirationDate = expirationDate
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state.data = action.payload

      if (!state.selected && state.data.length > 0) {
        state.selected = state.data[0].name
      }
      if (state.data.length === 1) {
        state.selected = state.data[0].name
      }
    })
  }
})

export const { storageAreaSelected, itemExpired } = storageSlice.actions
export default storageSlice.reducer
