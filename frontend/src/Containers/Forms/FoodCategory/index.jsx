import PropTypes from 'prop-types'
import { select } from '../../../App/store/selectors'
import { useSelector } from 'react-redux'

function FoodCategory({ id, defaultValue, onChange }) {
  const categories = useSelector(select.foodCategory)
  const singleCategory = new Set(Object.values(categories))

  return (
    <div className="input-wrapper">
      {id && (
        <label className="form-label col" htmlFor={`select${id}`}>
          {id.charAt(0).toUpperCase() + id.slice(1)} :
        </label>
      )}
      <select
        id={`select${id}`}
        name={id}
        onChange={onChange}
        className="form-select col"
        defaultValue={defaultValue}>
        {Array.from(singleCategory).map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

FoodCategory.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

FoodCategory.defaultProps = {
  defaultValue: ''
}

export default FoodCategory
