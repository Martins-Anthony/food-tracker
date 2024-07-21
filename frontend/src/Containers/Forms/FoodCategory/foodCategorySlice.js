import { createSlice } from '@reduxjs/toolkit'

const foodCategorySlice = createSlice({
  name: 'foodCategory',
  initialState: {
    '': '',
    'en:vegetables': 'légumes',
    'en:legumes': 'légumes',
    'en:fruits': 'fruits',
    'en:meat': 'viandes',
    'en:fish': 'poissons',
    'en:cheeses': 'fromages'
  },
  reducers: {
    addFoodCategory: (state, action) => {
      const newFoodCategory = action.payload
      state.push(newFoodCategory)
    },
    removeFoodCategory: (state, action) => {
      const nameToRemove = action.payload
      return state.filter((stock) => Object.keys(stock)[0] !== nameToRemove)
    },
    updateFoodCategory: (state, action) => {
      const updatedFoodCategory = action.payload
      const index = state.findIndex(
        (stock) => Object.keys(stock)[0] === Object.keys(updatedFoodCategory)[0]
      )
      if (index !== -1) {
        state[index] = updatedFoodCategory
      }
    }
  }
})

export const { addFoodCategory, removeFoodCategory, updateFoodCategory } = foodCategorySlice.actions
export default foodCategorySlice.reducer
