import { createAsyncThunk } from '@reduxjs/toolkit'
import { showModal } from '../../../Modal/modalSlice'

export const register = createAsyncThunk('registerUser', async (payload, thunkAPI) => {
  const { rejectWithValue, dispatch, getState } = thunkAPI
  try {
    const response = await fetch(getState().auth.api + '/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      dispatch(showModal({ message: data.message, id: 'errorModal' }))
      return { magicLink: data.magicLink, email: data.email }
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
