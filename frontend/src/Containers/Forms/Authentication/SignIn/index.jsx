import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../../App/store/selectors'
import { register } from '../Register/registerSlice'
import { resendLink } from '../SignIn/resendLinkSlice'
import { resendLinkActive } from '../authSlice'
import { showModal } from '../../../Modal/modalSlice'

function SignIn() {
  const dispatch = useDispatch()
  const auth = useSelector(select.auth)

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value.toLowerCase()

    if (auth.resendLink) {
      dispatch(resendLink({ email: email }))
      dispatch(resendLinkActive())
      dispatch(showModal())
    } else {
      dispatch(register({ email: email }))
    }
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
      <Buttons
        type={BUTTONS_TYPES.BUTTON}
        label={auth.resendLink ? 'Renvoyer le lien' : 'Se connecter'}
      />
    </form>
  )
}

export default SignIn
