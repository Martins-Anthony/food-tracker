import { createAsyncThunk } from '@reduxjs/toolkit'

export const postItemInStorage = createAsyncThunk(
  'storageArea/createItemInStorage',
  async ({ areaName, newItem }, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/ItemInStorage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ areaName, newItem })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
