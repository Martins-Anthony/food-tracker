import { createAsyncThunk } from '@reduxjs/toolkit'

export const putItemInStorage = createAsyncThunk(
  'storageArea/putItemInStorage',
  async ({ newItemInStorage, oldItemInStorage }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/ItemInStorage', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newItemInStorage, oldItemInStorage })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
