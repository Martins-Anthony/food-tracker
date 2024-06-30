import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { showModal } from '../../../Modal/modalSlice'

export const enter = createAsyncThunk('enterUser', async (payload, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const response = await fetch(urlApi + '/users/enter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (data.checkResult.ok) {
      return data
    } else if (!data.ok) {
      dispatch(showModal({ message: data.message, id: 'errorModal' }))
      return rejectWithValue({ error: data.message })
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
