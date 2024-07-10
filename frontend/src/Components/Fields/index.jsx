import PropTypes from 'prop-types'

export const TYPE_FIELD = {
  INPUT_MAIL: 'email',
  INPUT_TEXT: 'text',
  INPUT_NUMBER: 'number',
  INPUT_DATE: 'date'
}

function Fields({ type, id, label, readOnly, value, defaultValue, onChange, ...props }) {
  const inputProps = {
    id,
    name: id,
    type,
    autoComplete: type === TYPE_FIELD.INPUT_MAIL ? 'username' : 'off',
    required: type === TYPE_FIELD.INPUT_MAIL,
    readOnly,
    className: `form-control ${readOnly ? 'form-control-plaintext' : ''}`,
    onChange,
    ...props
  }

  if (value !== undefined) {
    inputProps.value = value
  } else {
    inputProps.defaultValue = defaultValue
  }

  return (
    <div className="input-wrapper">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
      )}
      <input {...inputProps} />
    </div>
  )
}

Fields.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPE_FIELD)).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

Fields.defaultProps = {
  label: '',
  readOnly: false,
  onChange: null,
  value: undefined,
  defaultValue: ''
}

export default Fields
