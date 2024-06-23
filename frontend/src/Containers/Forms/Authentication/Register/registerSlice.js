import { createAsyncThunk } from '@reduxjs/toolkit'
import { setMessage } from '../../../Modal/modalSlice'

export const register = createAsyncThunk('registerUser', async (payload, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  try {
    const response = await fetch(getState().auth.api + '/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      dispatch(setMessage(data.message))
      return data
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
