import React, { useState } from 'react'
import PropTypes from 'prop-types'

function FoodCategory({ onChange }) {
  const [categories, setCategories] = useState([
    '',
    'fruits',
    'légumes',
    'viandes',
    'poissons',
    'boîtes de conserves'
  ])
  const [newCategory, setNewCategory] = useState('')

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  return (
    <div>
      <label>
        Category{' '}
        <select name="category" onChange={onChange}>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            )
          })}
        </select>
      </label>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Nouvelle catégorie"
      />
      <button onClick={handleAddCategory}>Ajouter</button>
    </div>
  )
}

FoodCategory.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default FoodCategory
