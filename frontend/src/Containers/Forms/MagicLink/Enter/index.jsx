import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Spinners from '../../../../Components/Spinners'

import { enter } from './enterSlice'

function Enter() {
  const { email, magicLink } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (email && magicLink) {
      dispatch(enter({ email, magicLink }))
      navigate('/user')
    }
  }, [email, magicLink, navigate])

  return <Spinners />
}

export default Enter
