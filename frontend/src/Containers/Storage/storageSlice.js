import { createSlice } from '@reduxjs/toolkit'
import { getStorage } from './Get/getStorage'

const storageSlice = createSlice({
  name: 'storage',
  initialState: { data: null, selected: null },
  reducers: {
    storageAreaSelected: (state, action) => {
      state.selected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const { storageAreaSelected } = storageSlice.actions
export default storageSlice.reducer
