import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    message: ''
  },
  reducers: {
    showModal: (state) => {
      state.show = true
    },
    hideModal: (state) => {
      state.show = false
      state.message = ''
    },
    setMessage: (state, action) => {
      state.message = action.payload
    }
  }
})

export const { showModal, hideModal, setMessage } = modalSlice.actions
export default modalSlice.reducer
