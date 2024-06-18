import { createAsyncThunk } from '@reduxjs/toolkit'

export const putStorageArea = createAsyncThunk(
  'storageArea/putStorageArea',
  async ({ newStorageArea, oldStorageArea }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/StorageArea', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newStorageArea, oldStorageArea })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
