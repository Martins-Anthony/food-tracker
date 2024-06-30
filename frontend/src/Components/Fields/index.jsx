import PropTypes from 'prop-types'

export const TYPE_FIELD = {
  INPUT_MAIL: 'email',
  INPUT_TEXT: 'text',
  INPUT_NUMBER: 'number',
  INPUT_DATE: 'date'
}

function Fields({ type, id, label, readOnly, defaultValue, onChange, ...props }) {
  return (
    <div className="d-flex align-items-center mb-2 justify-content-center">
      {label && (
        <div className="col">
          <label className="form-label me-2 m-0" htmlFor={id}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </label>
        </div>
      )}

      <div className="col-auto">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type === TYPE_FIELD.INPUT_MAIL ? 'username' : 'off'}
          required={type === TYPE_FIELD.INPUT_MAIL}
          readOnly={readOnly}
          className={`form-control ${readOnly ? 'form-control-plaintext' : ''}`}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  )
}

Fields.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPE_FIELD)).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func
}

Fields.defaultProps = {
  label: '',
  readOnly: false,
  onChange: null,
  defaultValue: ''
}

export default Fields
