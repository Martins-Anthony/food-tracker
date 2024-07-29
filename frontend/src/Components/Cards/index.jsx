import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import RoundedImage from '../RoundedImage'
import EditButton from '../Buttons/EditButton'
import ProductItem from '../ProductItem'
import Fields, { TYPE_FIELD } from '../Fields'
import { deleteItemInStorage } from '../../Containers/Storage/Delete/ItemInStorage/deleteItemInStorage'
import imageDefault from '../../assets/bocaux.jpg'
import { useProductForm } from '../../Containers/Forms/Adding/Product/useProductForm'
function Cards({
  type,
  items,
  tag,
  onClick,
  activeEditMode,
  showDeleteButton,
  isNewProduct,
  hoverActive,
  onSuccess
}) {
  const listCategory = useSelector(select.foodCategory)

  const foundCategory = items.categories_tags
    ? items.categories_tags.find((element) => Object.keys(listCategory).includes(element))
    : null
  const category = foundCategory ? listCategory[foundCategory] : items.category

  const initialState = { ...items, isNew: isNewProduct, foundCategory: category }

  const {
    productName,
    productNumber,
    productCategory,
    productQuantity,
    productDate,
    handleProductName,
    handleProductNumber,
    handleProductCategory,
    handleProductQuantity,
    handleProductDate,
    handleSubmit
  } = useProductForm(initialState, () => {
    setEditMode(false)
    onSuccess && onSuccess()
  })

  const [editMode, setEditMode] = useState(activeEditMode)

  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'quantity':
        handleProductQuantity({ target: { value: Number(value) } })
        break
      case 'category':
        handleProductCategory({ target: { value } })
        break
      case 'date':
        handleProductDate({ target: { value } })
        break
      case 'number':
        handleProductNumber({ target: { value } })
        break
      default:
        break
    }
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const renderImage = () => {
    const image = items.image?.src ? (
      <img src={items.image.src} className="card-img-top custom-img-size" alt={items.image.alt} />
    ) : (
      <img src={imageDefault} alt="default image" className="card-img-top" />
    )
    return image
  }

  const getComponent = () => {
    switch (type) {
      case 'presentation':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4" onClick={onClick}>
            <div className={`card ${hoverActive}`}>
              {items.image ? (
                renderImage()
              ) : (
                <img
                  src="https://picsum.photos/300/150?random=2"
                  className="card-img-top"
                  alt="..."
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{items?.title || productName}</h5>
                <p className="card-text">
                  {items?.brands || items?.text || 'No brand information'}
                </p>
              </div>
            </div>
          </div>
        )
      case 'product':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4 my-2">
            <form onSubmit={handleSubmit}>
              <div className={`card ${hoverActive}`}>
                <div className="row align-items-center p-3">
                  <div className="col-auto">
                    <RoundedImage
                      image={items.image_url ? { src: items.image_url, alt: productName } : null}
                    />
                  </div>
                  <div className="col">
                    <h5 className="card-title mt-4 mb-0">
                      {editMode ? (
                        <Fields
                          type={TYPE_FIELD.INPUT_TEXT}
                          id="title"
                          defaultValue={productName}
                          readOnly={!editMode}
                          aria-label={`titre du produits ${productName}`}
                          onChange={handleProductName}
                        />
                      ) : (
                        productName
                      )}
                    </h5>
                  </div>
                </div>
                <div className="card-body">
                  <ProductItem
                    item={{
                      ...items,
                      number: productNumber,
                      category: productCategory,
                      quantity: productQuantity,
                      date: productDate
                    }}
                    onFieldChange={handleFieldChange}
                    editMode={editMode}
                  />
                  {editMode ? (
                    <EditButton
                      className="d-flex justify-content-around"
                      onSave={handleSubmit}
                      onCancel={handleCancel}
                      tag={tag}
                      modalMessage={`Êtes-vous sûr de vouloir supprimer ${productName} ?`}
                      onEditModeChange={setEditMode}
                      editMode={editMode}
                      modalDeleteAction={deleteItemInStorage}
                      showDeleteButton={showDeleteButton}
                    />
                  ) : (
                    <EditButton
                      className="position-absolute top-0 end-0 m-2"
                      onEditModeChange={setEditMode}
                      editMode={editMode}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  return getComponent()
}

Cards.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  tag: PropTypes.string,
  onClick: PropTypes.func,
  activeEditMode: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  isNewProduct: PropTypes.bool,
  hoverActive: PropTypes.string,
  onSuccess: PropTypes.func
}

Cards.defaultProps = {
  onClick: () => {},
  activeEditMode: false,
  showDeleteButton: true,
  isNewProduct: false,
  hoverActive: '',
  onSuccess: null
}

export default Cards
