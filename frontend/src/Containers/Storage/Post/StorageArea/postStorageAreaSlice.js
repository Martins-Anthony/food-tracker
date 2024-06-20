import { createAsyncThunk } from '@reduxjs/toolkit'

export const postStorageArea = createAsyncThunk(
  'storageArea/createStorageArea',
  async (newStorageArea, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/StorageArea', {
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
