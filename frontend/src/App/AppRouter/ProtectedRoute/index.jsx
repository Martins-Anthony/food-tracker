import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../../store/selectors'
import Spinners from '../../../Components/Spinners'
import PropTypes from 'prop-types'

function ProtectedRoute({ element: Component }) {
  const { isAuthenticated, loading } = useSelector(select.auth)

  return loading ? <Spinners /> : isAuthenticated ? <Component /> : <Navigate to={'/login'} />
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType
}

export default ProtectedRoute
