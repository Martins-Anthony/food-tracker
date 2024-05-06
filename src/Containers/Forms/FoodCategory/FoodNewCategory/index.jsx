import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFoodCategory } from '../foodCategorySlice'

function FoodNewCategory() {
  const [newCategory, setNewCategory] = useState('')
  const dispatch = useDispatch()

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      dispatch(addFoodCategory(newCategory))
      setNewCategory('')
    }
  }

  return (
    <form className="col-2">
      <div className="my-3 row">
        <label htmlFor="newFoodCategory">Catégorie</label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nouvelle catégorie"
          className="form-control mt-3"
          id="newFoodCategory"
        />
      </div>
      <button onClick={handleAddCategory} className="btn btn-primary">
        Ajouter
      </button>
    </form>
  )
}

export default FoodNewCategory
