import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../App/store/selectors'
import { storageAreaSelected } from '../storageSlice'

function StorageAreaSelection() {
  const storageData = useSelector(select.storage)
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
          value={storageData.selected}
          className="form-select">
          {storageData.data.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            )
          })}
        </select>
      </label>
    </>
  )
}

export default StorageAreaSelection
