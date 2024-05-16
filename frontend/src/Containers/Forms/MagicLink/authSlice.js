import { createSlice } from '@reduxjs/toolkit'
import { enter } from './Enter/enterSlice'

const initialState = {
  email: null,
  token: null,
  connection: false,
  error: null,
  loading: false
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setConnection: (state, action) => {
      state.connection = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(enter.pending, (state) => {
      state.loading = true
    })
    builder.addCase(enter.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.email = action.payload.email
      state.connection = true
    })
    builder.addCase(enter.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.error
    })
  }
})

export const { setUser, setToken, setConnection, setLoading, setError } = authSlice.actions
export default authSlice.reducer
