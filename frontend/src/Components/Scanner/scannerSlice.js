import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scannedCode: null
}

const scannerSlice = createSlice({
  name: 'scanner',
  initialState,
  reducers: {
    scanSuccess(state, action) {
      state.scannedCode = action.payload
    },
    scanRemove(state) {
      state.scannedCode = null
    }
  }
})

export const { scanSuccess, scanRemove } = scannerSlice.actions

export default scannerSlice.reducer
