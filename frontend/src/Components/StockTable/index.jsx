import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import EditButton from '../Buttons/EditButton'
import StorageAreaList from '../StorageAreaList'
import DeleteModal from '../../Containers/Modal/DeleteModal'
import { deleteStorageArea } from '../../Containers/Storage/Delete/storageArea/deleteStorageArea'
import { deleteItemInStorage } from '../../Containers/Storage/Delete/ItemInStorage/deleteItemInStorage'
import { handleEditMode } from '../../Containers/EditMode/editModeSlice'
import { iconList } from '../../Components/Icons/library'

function StockTable() {
  const editMode = useSelector(select.editMode).status

  return (
    <section className={`container p-3 ${editMode ? 'border' : ''}`}>
      <div className="d-flex flex-row-reverse">
        <EditButton editMode={editMode} toggleEditMode={handleEditMode} icon={iconList} />
      </div>
      <StorageAreaList />
      <DeleteModal deleteAction={deleteStorageArea} modalId="deleteModalStorageArea" />
      <DeleteModal deleteAction={deleteItemInStorage} modalId="deleteModalItem" />
    </section>
  )
}

export default StockTable
