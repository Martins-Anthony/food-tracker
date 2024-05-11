import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { json } from 'react-router-dom'
import { urlApi } from '../../../utils/api/basePath'

export const registerUser = createAsyncThunk('registerUser', async (payload, thunkAPI) => {
  try {
    console.log('payload', payload)
    const response = await fetch(urlApi + '/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      console.log('Utilisateur inscrit avec succès')
    } else {
      console.error("Erreur lors de l'inscription :", data.error)
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.error
    })
  }
})

export const { setUser, setToken, setLoading, setError } = authSlice.actions
export default authSlice.reducer
