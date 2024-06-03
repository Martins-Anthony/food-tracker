import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newStorageArea } from './newStorageAreaSlice'
import { addStorageArea } from '../storageAreaSlice'

function NewStorageArea() {
  const dispatch = useDispatch()
  const [newStock, setNewStock] = useState('')

  const handleNewStock = (event) => {
    setNewStock(event.target.value)
  }

  const handleSubmitNewStock = (event) => {
    event.preventDefault()
    dispatch(addStorageArea(newStock))
    dispatch(newStorageArea(newStock))
    setNewStock('')
  }

  return (
    <form onSubmit={handleSubmitNewStock} className="col-2">
      <div className="my-3">
        <label className="form-label" htmlFor="InputAddStorageArea">
          zone de stockage
          <input
            type="text"
            name="newStorageArea"
            placeholder="Ajouter un nom"
            onChange={handleNewStock}
            className="form-control mt-3"
            id="InputAddStorageArea"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Validez
      </button>
    </form>
  )
}

export default NewStorageArea
