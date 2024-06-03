import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../Modal'
import { enter } from './enterSlice'
import { select } from '../../../../App/store/selectors'
import LinkSignup from '../../../../Components/Links/SignIn'

function Enter() {
  const { email, magicLink } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const messageModal = useSelector(select.auth).error
  const handleModal = useSelector(select.modal).show

  useEffect(() => {
    dispatch(enter({ email, magicLink }))
    if (email && magicLink) {
      dispatch(enter({ email, magicLink }))
      navigate('/user')
    } else {
      navigate('/login')
    }
  }, [email, magicLink])

  return (
    <Modal
      id="errorModal"
      idLabel="errorModalLabel"
      title={messageModal}
      body={<LinkSignup />}
      isOpen={handleModal}
    />
  )
}

export default Enter
