import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import EditButton from '../Buttons/EditButton'
import StorageAreaList from '../StorageAreaList'
import DeleteModal from '../../Containers/Modal/DeleteModal'

function StockTable() {
  const editMode = useSelector(select.editMode).status

  return (
    <section className={`container p-3 ${editMode ? 'border' : ''}`}>
      <EditButton />
      <StorageAreaList />
      <DeleteModal />
    </section>
  )
}

export default StockTable
