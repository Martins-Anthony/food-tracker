import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { refreshAccessToken } from './refreshAccessTokenSlice'
import { select } from '../../../../App/store/selectors'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const token = useSelector(select.auth).token

  useEffect(() => {
    if (!token) return
    const intervalId = setInterval(() => {
      dispatch(refreshAccessToken(token))
    }, 1800000)
    return () => clearInterval(intervalId)
  }, [dispatch, token])

  return <>{children}</>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider
