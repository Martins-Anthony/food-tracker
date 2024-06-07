import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../App/store/selectors'
import { storageAreaSelected } from '../storageSlice'

function StorageAreaSelection() {
  const storageArea = useSelector(select.storage).data.storageArea
  const storageAreaSelection = useSelector(select.storage).data.storageArea[0]
  const dispatch = useDispatch()

  const handleStorageAreaSelected = (event) => {
    dispatch(storageAreaSelected(event.target.value))
  }

  return (
    <>
      <label>
        Storage area{' '}
        <select
          name="storageArea"
          onChange={handleStorageAreaSelected}
          defaultValue={storageAreaSelection}
          className="form-select">
          {storageArea.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </label>
    </>
  )
}

export default StorageAreaSelection
