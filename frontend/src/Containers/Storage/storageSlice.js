import { createSlice } from '@reduxjs/toolkit'
import { getStorage } from './Get/getStorage'

const storageSlice = createSlice({
  name: 'storage',
  initialState: { data: [], selected: null },
  reducers: {
    storageAreaSelected: (state, action) => {
      state.selected = action.payload
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

export const { storageAreaSelected } = storageSlice.actions
export default storageSlice.reducer
