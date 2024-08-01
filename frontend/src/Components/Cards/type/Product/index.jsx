import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { select } from '../../../../App/store/selectors'
import RoundedImage from '../../../RoundedImage'
import EditButton from '../../../Buttons/EditButton'
import ProductItem from '../../../ProductItem'
import Fields, { TYPE_FIELD } from '../../../Fields'
import { deleteItemInStorage } from '../../../../Containers/Storage/Delete/ItemInStorage/deleteItemInStorage'
import { useProductForm } from '../../../../Containers/Forms/Adding/Product/useProductForm'

function Product({
  items,
  tag,
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
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 my-2">
      <form onSubmit={handleSubmit}>
        <div className={`card rounded-4 ${hoverActive}`}>
          <div className="row align-items-center p-3">
            <div className="col-auto">
              <RoundedImage
                image={items.image_url ? { src: items.image_url, alt: productName } : null}
              />
            </div>
            <div className="col">
              <h5 className="card-title mt-4 mb-0 text-info-emphasis">
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
}

Product.propTypes = {
  items: PropTypes.object.isRequired,
  tag: PropTypes.string,
  activeEditMode: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  isNewProduct: PropTypes.bool,
  hoverActive: PropTypes.string,
  onSuccess: PropTypes.func
}

Product.defaultValue = {
  items: {},
  tag: '',
  activeEditMode: false,
  showDeleteButton: false,
  isNewProduct: false,
  hoverActive: '',
  onSuccess: null
}

export default Product
