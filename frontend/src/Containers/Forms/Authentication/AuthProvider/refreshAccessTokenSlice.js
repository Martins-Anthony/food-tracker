import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { logout } from '../authSlice'

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh_accessToken',
  async (refreshToken, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const response = await fetch(urlApi + '/users/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      const data = await response.json()

      if (data.newAccessToken) {
        return data.newAccessToken
      } else {
        dispatch(logout())
        return rejectWithValue(data.message)
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
