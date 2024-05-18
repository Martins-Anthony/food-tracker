import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'

export const enter = createAsyncThunk('enterUser', async (payload, thunkAPI) => {
  try {
    const response = await fetch(urlApi + '/users/enter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (data.token) {
      console.log('data', data)
      return data
    } else {
      return thunkAPI.rejectWithValue({ error: data.error })
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})
