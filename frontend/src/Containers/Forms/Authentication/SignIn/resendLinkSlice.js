import { createAsyncThunk } from '@reduxjs/toolkit'
import { setMessage } from '../../../Modal/modalSlice'

export const resendLink = createAsyncThunk('resendLink', async (payload, thunkAPI) => {
  const { rejectWithValue, dispatch, getState } = thunkAPI
  try {
    const response = await fetch(getState().auth.api + '/users/resendLink', {
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
    } else {
      return rejectWithValue({ error: data.error })
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
