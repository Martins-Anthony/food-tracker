import { createAsyncThunk } from '@reduxjs/toolkit'

export const newStorageArea = createAsyncThunk(
  'storageArea/createStorageArea',
  async (newStorageArea, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/storageArea', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newStorageArea })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
