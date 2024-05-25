import React, { useState } from 'react'
import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useDispatch } from 'react-redux'
import { register } from './registerSlice'
import Modal from '../../../../Containers/Modal'

function Register() {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    dispatch(register({ email: event.target.email.value.toLowerCase() }))
    setShowModal(true)
  }
  return (
    <>
      <form onSubmit={handleEmailSubmit}>
        <section className="row justify-content-center">
          <Fields type={TYPE_FIELD.INPUT_MAIL} />
        </section>
        <Buttons type={BUTTONS_TYPES.BUTTONS} label="S'inscrire" />
      </form>
      <Modal
        id="resultRegisterModal"
        idLabel="resultRegisterModalLabel"
        title="Mentions Légales"
        body={<p>test</p>}
        footer={false}
      />
      {showModal}
    </>
  )
}

export default Register
