import { createAsyncThunk } from '@reduxjs/toolkit'

export const postStorageArea = createAsyncThunk(
  'storageArea/createStorageArea',
  async (newItem, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/ItemInStorage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newItem })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
