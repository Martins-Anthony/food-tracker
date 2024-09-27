import StorageAreaItem from '../StorageAreaItem'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'

function StorageAreaList() {
  const storageData = useSelector(select.storage)
  return (
    <div>
      {storageData.data.map((storageAreaItem) => (
        <StorageAreaItem key={storageAreaItem.name} storageAreaItem={storageAreaItem} />
      ))}
    </div>
  )
}

export default StorageAreaList
