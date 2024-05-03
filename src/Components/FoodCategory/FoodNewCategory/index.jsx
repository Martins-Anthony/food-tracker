import React, { useState } from 'react'
import { listCategoryFoods } from '..'

function FoodNewCategory() {
  const [categories, setCategories] = useState(listCategoryFoods)
  const [newCategory, setNewCategory] = useState('')

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Nouvelle catégorie"
      />
      <button onClick={handleAddCategory} className="btn btn-primary">
        Ajouter
      </button>
    </div>
  )
}

export default FoodNewCategory
