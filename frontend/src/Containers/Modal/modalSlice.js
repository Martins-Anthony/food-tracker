import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    message: '',
    id: null
  },
  reducers: {
    showModal: (state, action) => {
      state.show = true
      state.message = action.payload
      state.id = action.payload.id
    },
    hideModal: (state) => {
      state.show = false
      state.message = ''
      state.id = null
    },
    setMessage: (state, action) => {
      state.message = action.payload
    }
  }
})

export const { showModal, hideModal, setMessage } = modalSlice.actions
export default modalSlice.reducer
