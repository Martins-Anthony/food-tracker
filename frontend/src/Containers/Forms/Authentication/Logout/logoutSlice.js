import { createAsyncThunk } from '@reduxjs/toolkit'

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI

  try {
    const { auth } = getState()
    const response = await fetch(`${auth.api}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to log out')
    }

    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
