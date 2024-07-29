import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    showSidebar: false
  },
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload
    }
  }
})

export const { setShowSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
