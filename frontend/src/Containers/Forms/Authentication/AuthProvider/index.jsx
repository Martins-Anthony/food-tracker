import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { refreshAccessToken } from './refreshAccessTokenSlice'
import { select } from '../../../../App/store/selectors'
import { hideModal } from '../../../Modal/modalSlice'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { refreshToken } = useSelector(select.auth)
  const [hasRefreshedToken, setHasRefreshedToken] = useState(false)

  useEffect(() => {
    dispatch(hideModal())
  }, [dispatch])

  useEffect(() => {
    if (!refreshToken || hasRefreshedToken) return

    dispatch(refreshAccessToken(refreshToken))
    setHasRefreshedToken(true)

    const intervalId = setInterval(() => {
      dispatch(refreshAccessToken(refreshToken))
    }, 1800000)
    return () => clearInterval(intervalId)
  }, [dispatch, refreshToken])

  return <>{children}</>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider
