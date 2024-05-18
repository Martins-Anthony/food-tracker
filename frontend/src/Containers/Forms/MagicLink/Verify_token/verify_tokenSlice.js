import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'

export const verify_token = createAsyncThunk('verify_tokenUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      console.log(token)
      return thunkAPI.rejectWithValue({ error: 'Token not found' })
    }
    const response = await fetch(urlApi + '/users/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
    if (data.ok) {
      return data
    } else {
      console.log(data.error)
      return thunkAPI.rejectWithValue({ error: data.error })
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})
