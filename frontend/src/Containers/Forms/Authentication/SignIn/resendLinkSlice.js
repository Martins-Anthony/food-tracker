import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { setMessage } from '../../../Modal/modalSlice'

export const resendLink = createAsyncThunk('resendLink', async (payload, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI
  try {
    const response = await fetch(urlApi + '/users/resendLink', {
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
