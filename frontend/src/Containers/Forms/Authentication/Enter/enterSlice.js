import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { showModal, setMessage } from '../../../Modal/modalSlice'

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
    if (data.ok === false) {
      dispatch(showModal())
      dispatch(setMessage(data.message))
      return rejectWithValue({ error: data.message })
    } else if (data.checkResult.token) {
      return data
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
