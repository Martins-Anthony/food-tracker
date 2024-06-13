import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { newStorageArea } from './newStorageAreaSlice'
import { getStorage } from '../../Get/getStorage'

function NewStorageArea() {
  const dispatch = useDispatch()
  const [newStock, setNewStock] = useState('')
  const refForm = React.createRef()

  const handleNewStock = (event) => {
    setNewStock(event.target.value)
  }

  const handleSubmitNewStock = (event) => {
    event.preventDefault()
    dispatch(newStorageArea(newStock))
    refForm.current.reset()
  }

  useEffect(() => {
    dispatch(getStorage())
  }, [refForm])

  return (
    <form ref={refForm} onSubmit={handleSubmitNewStock} className="col">
      <div className="my-3">
        <label className="form-label" htmlFor="InputAddStorageArea">
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
