import { createAsyncThunk } from '@reduxjs/toolkit'

export const getStorage = createAsyncThunk('GetStorage', async (_, thunkAPI) => {
  const { getState, rejectWithValue } = thunkAPI

  try {
    const { auth } = getState()

    if (!auth.token) {
      return rejectWithValue({ error: 'No token' })
    }

    const response = await fetch(auth.api + '/users/storage/storages', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    } else {
      return data.storage
    }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
