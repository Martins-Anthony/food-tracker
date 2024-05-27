import { createSlice } from '@reduxjs/toolkit'
import { enter } from './Enter/enterSlice'
import { refreshAccessToken } from './AuthProvider/refreshAccessTokenSlice'

const initialState = {
  email: null,
  magicLink: null,
  token: null,
  isAuthenticated: false,
  error: null,
  loading: false
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(enter.pending, (state) => {
      state.loading = true
    })
    builder.addCase(enter.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.checkResult.token
      state.email = action.payload.checkResult.email
      state.magicLink = action.payload.checkResult.magicLink
      state.isAuthenticated = true
    })
    builder.addCase(enter.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.error
    })
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.token = action.payload
      state.error = null
    })
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.error = action.payload
      state.isAuthenticated = false
      state.token = null
    })
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
