import PropTypes from 'prop-types'

export const TYPE_FIELD = {
  INPUT_MAIL: 1
}

function Fields({ type }) {
  let component = null
  let idComponent = null

  switch (type) {
    case TYPE_FIELD.INPUT_MAIL:
      idComponent = 'email'
      component = (
        <input
          id={idComponent}
          name={idComponent}
          type="text"
          autoComplete="username"
          required
          autoFocus
          className="form-control"
        />
      )
      break
    default:
      break
  }

  if (!component) return null

  return (
    <div className="mb-3 col-8 col-md-7">
      <label className="form-label" htmlFor={idComponent}>
        {idComponent.charAt(0).toUpperCase(0) + idComponent.slice(1)}
      </label>
      {component}
    </div>
  )
}

Fields.propTypes = {
  type: PropTypes.number.isRequired
}

export default Fields
