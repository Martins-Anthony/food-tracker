import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { enter } from './Enter/enterSlice'
import { refreshAccessToken } from './AuthProvider/refreshAccessTokenSlice'
import { resendLink } from './SignIn/resendLinkSlice'
import { register } from './Register/registerSlice'
import { urlApi } from '../../../utils/api/basePath'

export const initialState = {
  email: null,
  magicLink: null,
  token: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  resendLink: false,
  api: urlApi
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
    builder.addMatcher(
      isAnyOf(enter.pending, refreshAccessToken.pending, resendLink.pending, register.pending),
      (state) => {
        state.loading = true
      }
    )
    builder.addMatcher(
      isAnyOf(
        enter.fulfilled,
        refreshAccessToken.fulfilled,
        resendLink.fulfilled,
        register.fulfilled
      ),
      (state, action) => {
        state.loading = false
        state.error = null

        switch (action.type) {
          case enter.fulfilled.type:
            state.token = action.payload.checkResult.token
            state.email = action.payload.checkResult.email
            state.magicLink = action.payload.checkResult.magicLink
            state.isAuthenticated = true
            break
          case refreshAccessToken.fulfilled.type:
            state.token = action.payload
            break
          case resendLink.fulfilled.type:
            state.resendLink = false
            break
          default:
            break
        }
      }
    )
    builder.addMatcher(
      isAnyOf(enter.rejected, refreshAccessToken.rejected, resendLink.rejected, register.rejected),
      (state, action) => {
        state.loading = false
        state.error = action.payload.error

        switch (action.type) {
          case refreshAccessToken.rejected.type:
            state.isAuthenticated = false
            state.token = null
            break
          default:
            break
        }
      }
    )
  }
})

export const { loginSuccess, logout, resendLinkActive } = authSlice.actions
export default authSlice.reducer
