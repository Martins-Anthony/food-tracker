import { createSlice } from '@reduxjs/toolkit'

const storageAreaSelectionSlice = createSlice({
  name: 'storageAreaSelection',
  initialState: {
    areaNameSelected: ''
  },
  reducers: {
    storageAreaSelect: (state, action) => {
      state.areaNameSelected = action.payload
    }
  }
})

export const { storageAreaSelect } = storageAreaSelectionSlice.actions
export default storageAreaSelectionSlice.reducer
