import PropTypes from 'prop-types'
import StorageAreaItem from '../StorageAreaItem'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'

function StorageAreaList({ editMode }) {
  const storageData = useSelector(select.storage)

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

StorageAreaList.propTypes = {
  editMode: PropTypes.bool.isRequired
}

export default StorageAreaList
