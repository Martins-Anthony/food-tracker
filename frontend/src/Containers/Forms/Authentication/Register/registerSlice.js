import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from '../../../../utils/api/basePath'

export const register = createAsyncThunk('registerUser', async (payload, thunkAPI) => {
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
      console.log('Utilisateur inscrit avec succès', data)
    } else {
      console.error("Erreur lors de l'inscription :", data.error)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})
