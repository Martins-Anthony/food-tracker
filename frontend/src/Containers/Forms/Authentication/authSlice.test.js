import reducer, { logout, resendLinkActive, initialState } from './authSlice'
import { enter } from './Enter/enterSlice'
import { refreshAccessToken } from './AuthProvider/refreshAccessTokenSlice'

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle logout', () => {
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      token: 'some-token',
      error: 'some-error'
    }
    expect(reducer(previousState, logout())).toEqual({
      ...initialState,
      isAuthenticated: false,
      token: null,
      error: null
    })
  })

  it('should handle resendLinkActive', () => {
    expect(reducer(initialState, resendLinkActive())).toEqual({
      ...initialState,
      resendLink: true
    })
  })

  it('should handle pending state', () => {
    const action = { type: enter.pending.type }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    })
  })

  it('should handle fulfilled state for enter', () => {
    const action = {
      type: enter.fulfilled.type,
      payload: {
        checkResult: {
          token: 'test-token',
          email: 'test@example.com',
          magicLink: 'test-magic-link'
        }
      }
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: null,
      token: action.payload.checkResult.token,
      email: action.payload.checkResult.email,
      magicLink: action.payload.checkResult.magicLink,
      isAuthenticated: true
    })
  })

  it('should handle rejected state', () => {
    const action = {
      type: enter.rejected.type,
      payload: {
        error: 'some-error'
      }
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: action.payload.error
    })
  })

  it('should handle fulfilled state for refreshAccessToken', () => {
    const action = {
      type: refreshAccessToken.fulfilled.type,
      payload: 'new-token'
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: null,
      token: action.payload
    })
  })

  it('should handle rejected state for refreshAccessToken', () => {
    const action = {
      type: refreshAccessToken.rejected.type,
      payload: {
        error: 'some-error'
      }
    }
    expect(
      reducer(
        {
          ...initialState,
          isAuthenticated: true,
          token: 'some-token'
        },
        action
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: action.payload.error,
      isAuthenticated: false,
      token: null
    })
  })
})
