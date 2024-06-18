import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteStorageArea = createAsyncThunk(
  'storageArea/deleteStorageArea',
  async (deleteStorageArea, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/StorageArea', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deleteStorageArea })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
