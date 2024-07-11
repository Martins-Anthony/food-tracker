import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import RoundedImage from '../RoundedImage'
import { iconList } from '../../Components/Icons/library'
import EditButton from '../Buttons/EditButton'
import ProductItem from '../ProductItem'
import Fields, { TYPE_FIELD } from '../Fields'
import { putItemInStorage } from '../../Containers/Storage/Put/ItemInStorage/putItemInStorage'
import { deleteItemInStorage } from '../../Containers/Storage/Delete/ItemInStorage/deleteItemInStorage'
function Cards({ title, type, items, tag }) {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [localTitle, setLocalTitle] = useState(title)
  const [localItems, setLocalItems] = useState(items)

  const handleFieldChange = (field, value) => {
    if (field === 'quantity') {
      value = Number(value)
    }
    setLocalItems({ ...localItems, [field]: value })
  }

  const handleTitleChange = (event) => {
    setLocalTitle(event.target.value)
  }

  const handleSave = () => {
    const oldItemInStorage = { items }
    const newItems = { ...localItems, name: localTitle }
    const newItemInStorage = { items: newItems }
    dispatch(putItemInStorage({ newItemInStorage, oldItemInStorage }))
    setEditMode(false)
  }

  const handleCancel = () => {
    setLocalTitle(title)
    setLocalItems(items)
    setEditMode(false)
  }

  const renderRoundedImage = () => {
    const image = localItems.image.src ? (
      <img
        src={localItems.image.src}
        className="card-img-top custom-img-size"
        alt={localItems.image.alt}
      />
    ) : (
      <img
        src="https://picsum.photos/300/150?random=2"
        alt="default image"
        className="card-img-top"
      />
    )
    return image
  }

  const getComponent = () => {
    switch (type) {
      case 'presentation':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="card">
              {items ? (
                renderRoundedImage()
              ) : (
                <img
                  src="https://picsum.photos/300/150?random=2"
                  className="card-img-top"
                  alt="..."
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{localTitle}</h5>
                <p className="card-text">{localItems?.brands || 'No brand information'}</p>
              </div>
            </div>
          </div>
        )
      case 'product':
        return (
          <div className="col-xs-12 col-sm-6 col-lg-5">
            <div className="card">
              <div className="row align-items-center p-3">
                <div className="col">
                  <RoundedImage />
                </div>
                <div className="col">
                  <h5 className="card-title mt-4 mb-0">
                    <Fields
                      type={TYPE_FIELD.INPUT_TEXT}
                      id="title"
                      defaultValue={localTitle}
                      readOnly={!editMode}
                      aria-label={`titre du produits ${localTitle}`}
                      onChange={handleTitleChange}
                    />
                  </h5>
                </div>
              </div>
              <div className="card-body">
                <ProductItem
                  item={localItems}
                  onFieldChange={handleFieldChange}
                  editMode={editMode}
                />
                {editMode ? (
                  <EditButton
                    icon={iconList}
                    className="d-flex justify-content-around"
                    onSave={handleSave}
                    onCancel={handleCancel}
                    tag={tag}
                    modalMessage={`Êtes-vous sûr de vouloir supprimer ${title} ?`}
                    onEditModeChange={setEditMode}
                    editMode={editMode}
                    modalDeleteAction={deleteItemInStorage}
                  />
                ) : (
                  <EditButton
                    icon={iconList}
                    className="position-absolute top-0 end-0 m-2"
                    onEditModeChange={setEditMode}
                    editMode={editMode}
                  />
                )}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return getComponent()
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  tag: PropTypes.string
}

export default Cards
