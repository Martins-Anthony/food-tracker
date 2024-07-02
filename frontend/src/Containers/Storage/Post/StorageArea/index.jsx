import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { postStorageArea } from './postStorageAreaSlice'
import { putStorageArea } from '../../Put/putStorageArea'
import { getStorage } from '../../Get/getStorage'
import Buttons from '../../../../Components/Buttons'
import Fields from '../../../../Components/Fields'

function NewStorageArea({ nameValue }) {
  const dispatch = useDispatch()
  const [newStock, setNewStock] = useState('')
  const refForm = useRef(null)

  const handleNewStock = (event) => {
    setNewStock(event.target.value)
  }

  const handleSubmitNewStock = async (event) => {
    event.preventDefault()
    if (nameValue === undefined) {
      await dispatch(postStorageArea(newStock))
    } else {
      await dispatch(putStorageArea({ newStorageArea: newStock, oldStorageArea: nameValue }))
    }
    setNewStock('')
    dispatch(getStorage())
    refForm.current.reset()
  }

  useEffect(() => {
    dispatch(getStorage())
  }, [refForm])

  return (
    <div className="col-md-6 col-lg-4">
      <form
        ref={refForm}
        onSubmit={handleSubmitNewStock}
        className="border rounded-4 px-3"
        style={{ minWidth: '200px' }}>
        <div className="row justify-content-center">
          <div className="col-auto pt-3">
            <Fields
              type="text"
              id="InputAddStorageArea"
              onChange={handleNewStock}
              defaultValue={nameValue === undefined ? 'Ajouter un nom' : nameValue}
            />
          </div>
          <div className="col-auto py-3">
            <Buttons type="button" label="Validez" />
          </div>
        </div>
      </form>
    </div>
  )
}

NewStorageArea.propTypes = {
  nameValue: PropTypes.string
}

export default NewStorageArea
