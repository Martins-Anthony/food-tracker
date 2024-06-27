import { createSlice } from '@reduxjs/toolkit'

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: { status: false, cardStatus: false },
  reducers: {
    handleEditMode: (state) => {
      state.status = !state.status
      state.cardStatus = false
    },
    handleEditModeCard: (state) => {
      state.cardStatus = !state.cardStatus
    }
  }
})

export const { handleEditMode, handleEditModeCard } = editModeSlice.actions
export default editModeSlice.reducer
