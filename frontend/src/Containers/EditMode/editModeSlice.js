import { createSlice } from '@reduxjs/toolkit'

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: { status: false },
  reducers: {
    handleEditMode: (state) => {
      state.status = !state.status
    }
  }
})

export const { handleEditMode } = editModeSlice.actions
export default editModeSlice.reducer
