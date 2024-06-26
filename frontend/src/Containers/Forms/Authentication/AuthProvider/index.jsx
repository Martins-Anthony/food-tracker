import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { refreshAccessToken } from './refreshAccessTokenSlice'
import { select } from '../../../../App/store/selectors'
import { hideModal } from '../../../Modal/modalSlice'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { refreshToken, isAuthenticated } = useSelector(select.auth)

  useEffect(() => {
    dispatch(hideModal())
  }, [dispatch])

  useEffect(() => {
    if (!refreshToken || !isAuthenticated) return
    dispatch(refreshAccessToken(refreshToken))

    const intervalId = setInterval(() => {
      dispatch(refreshAccessToken(refreshToken))
    }, 1800000)
    return () => clearInterval(intervalId)
  }, [dispatch, refreshToken, isAuthenticated])

  return <>{children}</>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider
