import PropTypes from 'prop-types'

export const TYPE_FIELD = {
  INPUT_MAIL: 'email',
  INPUT_TEXT: 'text',
  INPUT_NUMBER: 'number',
  INPUT_DATE: 'date'
}

function Fields({ type, id, label, readOnly, defaultValue, onChange, ...props }) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
      )}

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
