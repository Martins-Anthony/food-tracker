import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { enter } from '../Enter/enterSlice'

export const verify_token = createAsyncThunk('verify_tokenUser', async (payload, thunkAPI) => {
  const { getState, dispatch } = thunkAPI
  try {
    const state = getState()
    const token = state.auth.token

    if (!token) {
      dispatch(enter(payload))
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

    if (data.ok) {
      console.log('data', data)
      return data
    } else {
      console.log('data pas ok', data)
      return thunkAPI.rejectWithValue({ error: data.message })
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})
