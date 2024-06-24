import StorageAreaItem from '../StorageAreaItem'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'

function StorageAreaList() {
  const storageData = useSelector(select.storage)
  const editMode = useSelector(select.editMode).status

  return (
    <div>
      {storageData.data.map((storageAreaItem) => (
        <StorageAreaItem
          key={storageAreaItem.name}
          storageAreaItem={storageAreaItem}
          editMode={editMode}
        />
      ))}
    </div>
  )
}

export default StorageAreaList
