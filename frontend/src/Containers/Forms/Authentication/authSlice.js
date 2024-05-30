import { createSlice } from '@reduxjs/toolkit'
import { enter } from './Enter/enterSlice'
import { refreshAccessToken } from './AuthProvider/refreshAccessTokenSlice'
import { resendLink } from './SignIn/resendLinkSlice'

const initialState = {
  email: null,
  magicLink: null,
  token: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  resendLink: false
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.error = null
    },
    resendLinkActive(state) {
      state.resendLink = true
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
    builder.addCase(resendLink.pending, (state) => {
      state.loading = true
    })
    builder.addCase(resendLink.fulfilled, (state) => {
      state.loading = false
      state.resendLink = false
    })
  }
})

export const { loginSuccess, logout, resendLinkActive } = authSlice.actions
export default authSlice.reducer
