import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../App/store/selectors'
import { storageAreaSelected } from '../storageSlice'

function StorageAreaSelection() {
  const storageData = useSelector(select.storage)
  const dispatch = useDispatch()

  const handleStorageAreaSelected = (event) => {
    dispatch(storageAreaSelected(event.target.value))
  }

  const defaultStorageName = storageData.data.length > 0 ? storageData.data[0].name : ''

  return (
    <>
      <label>
        Storage area{' '}
        <select
          name="storageArea"
          onChange={handleStorageAreaSelected}
          defaultValue={defaultStorageName}
          className="form-select">
          {storageData.data.map((item, index) => {
            return (
              <option key={index} value={item}>
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
