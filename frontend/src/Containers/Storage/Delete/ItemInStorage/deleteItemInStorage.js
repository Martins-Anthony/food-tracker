import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteItemInStorage = createAsyncThunk(
  'storageArea/deleteItemInStorage',
  async (deleteItemInStorage, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI
    try {
      const { auth } = getState()
      const response = await fetch(auth.api + '/users/storage/ItemInStorage', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deleteItemInStorage })
      })
      return response.json()
    } catch (error) {
      return rejectWithValue({ error: error.message })
    }
  }
)
