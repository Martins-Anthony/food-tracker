import { createSlice } from '@reduxjs/toolkit'
import { getStorage } from './getStorage'

const storageSlice = createSlice({
  name: 'storage',
  initialState: { data: null },
  extraReducers: (builder) => {
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const { storageSelect } = storageSlice.actions
export default storageSlice.reducer
