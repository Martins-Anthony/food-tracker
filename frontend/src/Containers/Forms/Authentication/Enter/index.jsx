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
  const handleModal = useSelector(select.modal).show

  useEffect(() => {
    if (email && magicLink) {
      dispatch(enter({ email, magicLink }))
    }
    navigate('/login')
  }, [email, magicLink])

  return (
    <Modal id="errorModal" idLabel="errorModalLabel" body={<LinkSignup />} isOpen={handleModal} />
  )
}

export default Enter
