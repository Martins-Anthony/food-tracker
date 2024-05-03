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
    <form onSubmit={handleSubmitNewStock} className=" col-12 col-md-6">
      <div className="row mb-3 align-items-center">
        <div className="col col-md-5">
          <label className="form-label col" htmlFor="InputAddStorageArea">
            Nouvelle zone de stockage
          </label>
          <input
            type="text"
            name="newStorageArea"
            placeholder="Ajouter emplacement"
            onChange={handleNewStock}
            className="form-control col"
            id="InputAddStorageArea"
          />
        </div>
        <button type="submit" className="btn btn-primary col-2">
          Validez
        </button>
      </div>
    </form>
  )
}

export default CreateStorageArea
