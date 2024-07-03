import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import RoundedImage from '../RoundedImage'
import imageTest from '../../assets/bocaux.jpg'
import { iconList } from '../../Components/Icons/library'
import EditButton from '../Buttons/EditButton'
import ProductItem from '../ProductItem'
import Fields, { TYPE_FIELD } from '../Fields'
import { putItemInStorage } from '../../Containers/Storage/Put/ItemInStorage/putItemInStorage'
function Cards({ title, type, items, tag }) {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [localTitle, setLocalTitle] = useState(title)
  const [localItems, setLocalItems] = useState(items)

  const defaultImage = { src: imageTest, alt: 'default image' }

  const handleFieldChange = (field, value) => {
    setLocalItems({ ...localItems, [field]: value })
  }

  const handleTitleChange = (event) => {
    setLocalTitle(event.target.value)
  }

  const handleSave = () => {
    const oldItemInStorage = { title, items, tag }
    const newItemInStorage = { title: localTitle, items: localItems, tag }

    dispatch(putItemInStorage({ newItemInStorage, oldItemInStorage }))
    setEditMode(false)
  }

  const handleDelete = () => {
    console.log(`Delete item with tag ${tag}`)
  }

  const handleCancel = () => {
    setLocalTitle(title)
    setLocalItems(items)
    setEditMode(false)
  }
  const getComponent = () => {
    switch (type) {
      case 'presentation':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="card">
              <img
                src="https://picsum.photos/300/150?random=2"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{localTitle}</h5>
                <p className="card-text">{localItems}</p>
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
                  <RoundedImage image={defaultImage} />
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
                    onDelete={handleDelete}
                    tag={tag}
                    modalMessage={`Êtes-vous sûr de vouloir supprimer ${title} ?`}
                    onEditModeChange={setEditMode}
                    editMode={editMode}
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
  items: PropTypes.object.isRequired,
  tag: PropTypes.string
}

export default Cards
