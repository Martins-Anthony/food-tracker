import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    message: '',
    tag: '',
    id: null
  },
  reducers: {
    showModal: (state, action) => {
      state.show = true
      if (action.payload.message) {
        state.message = action.payload.message
      }
      if (action.payload.tag) {
        state.tag = action.payload.tag
      }
      if (action.payload.id) {
        state.id = action.payload.id
      }
    },
    hideModal: (state) => {
      state.show = false
      state.message = ''
      state.tag = ''
      state.id = null
    },
    setMessage: (state, action) => {
      state.message = action.payload.message
      if (action.payload.id) {
        state.id = action.payload.id
      }
    }
  }
})

export const { showModal, hideModal, setMessage } = modalSlice.actions
export default modalSlice.reducer
