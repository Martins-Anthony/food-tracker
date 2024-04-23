import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectStorageArea, selectStorageAreaSelection } from '../../../App/store/selectors'
import { storageAreaSelect } from './storageAreaSelectionSlice'

function StorageAreaSelection() {
  const storageArea = useSelector(selectStorageArea)
  const storageAreaSelection = useSelector(selectStorageAreaSelection)
  const dispatch = useDispatch()

  const handleStorageAreaSelected = (event) => {
    dispatch(storageAreaSelect(event.target.value))
  }

  return (
    <>
      <label>
        Storage area{' '}
        <select
          name="storageArea"
          onChange={handleStorageAreaSelected}
          defaultValue={storageAreaSelection}>
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
