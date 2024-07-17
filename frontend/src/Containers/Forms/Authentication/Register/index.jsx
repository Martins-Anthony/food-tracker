import React from 'react'
import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useDispatch } from 'react-redux'
import { register } from './registerSlice'

function Register() {
  const dispatch = useDispatch()

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    dispatch(register({ email: event.target.email.value.toLowerCase() }))
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <div className="col col-sm-10 col-mb-7 mx-2">
          <Fields
            type={TYPE_FIELD.INPUT_MAIL}
            id="email"
            placeholder="entrez votre email"
            autoFocus
          />
        </div>
      </section>
      <Buttons type={BUTTONS_TYPES.BUTTON} label="S'inscrire" />
    </form>
  )
}

export default Register
