import { decryptData, encryptData } from './crypto'

export const persistedState = localStorage.getItem('reduxState')
  ? decryptData(localStorage.getItem('reduxState'))
  : {}

export const localStorageSync = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()

  const encryptedState = encryptData(state)
  localStorage.setItem('reduxState', encryptedState)
  return result
}
