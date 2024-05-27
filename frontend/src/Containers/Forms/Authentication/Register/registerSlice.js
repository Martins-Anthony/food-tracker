import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'
import { showModal, setMessage } from '../../../Modal/modalSlice'

export const register = createAsyncThunk('registerUser', async (payload, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const response = await fetch(urlApi + '/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      dispatch(showModal())
      dispatch(setMessage(data.message))
      console.log('Utilisateur inscrit avec succès', data)
    } else {
      console.error("Erreur lors de l'inscription :", data.error)
    }
  } catch (error) {
    return rejectWithValue({ error: error.message })
  }
})
