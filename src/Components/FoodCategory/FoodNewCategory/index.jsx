function FoodNewCategory() {
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
      <button onClick={handleAddCategory}>Ajouter</button>
    </div>
  )
}

export default FoodNewCategory
