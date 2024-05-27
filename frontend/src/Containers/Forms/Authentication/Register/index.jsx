import React from 'react'
import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../../../App/store/selectors'
import { register } from './registerSlice'
import Modal from '../../../Modal'
import LinkLogin from '../../../../Components/Links/Login'

function Register() {
  const dispatch = useDispatch()
  const handleModal = useSelector(select.modal).show
  const titleModal = useSelector(select.modal).message

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    dispatch(register({ email: event.target.email.value.toLowerCase() }))
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <Fields type={TYPE_FIELD.INPUT_MAIL} />
      </section>
      <Buttons type={BUTTONS_TYPES.BUTTONS} label="S'inscrire" />
      <Modal id="messageModal" title={titleModal} body={<LinkLogin />} isOpen={handleModal} />
    </form>
  )
}

export default Register
