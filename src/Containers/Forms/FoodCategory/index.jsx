import React from 'react'
import PropTypes from 'prop-types'
import { selectFoodCategory } from '../../../App/store/selectors'
import { useSelector } from 'react-redux'

function FoodCategory({ onChange }) {
  const categories = useSelector(selectFoodCategory)

  return (
    <label className="p-3">
      Category{' '}
      <select name="category" onChange={onChange} className="form-select">
        {categories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          )
        })}
      </select>
    </label>
  )
}

FoodCategory.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default FoodCategory
