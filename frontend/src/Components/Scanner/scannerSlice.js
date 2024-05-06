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
    }
  }
})

export const { scanSuccess } = scannerSlice.actions

export default scannerSlice.reducer
