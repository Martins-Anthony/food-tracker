import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addStorageArea } from '../storageAreaSlice'

function CreateStorageArea() {
  const dispatch = useDispatch()
  const [newStock, setNewStock] = useState('')

  const handleNewStock = (event) => {
    setNewStock(event.target.value)
  }

  const handleSubmitNewStock = (event) => {
    event.preventDefault()
    dispatch(addStorageArea(newStock))
    setNewStock('')
  }

  return (
    <form onSubmit={handleSubmitNewStock}>
      <input
        type="text"
        name="newStorageArea"
        placeholder="Ajouter nouveaux stock"
        onChange={handleNewStock}
      />
      <button type="submit" className="btn">
        Validez
      </button>
    </form>
  )
}

export default CreateStorageArea
