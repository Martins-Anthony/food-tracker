import FoodCategory from '../../../FoodCategory'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import Fields, { TYPE_FIELD } from '../../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../../Components/Buttons'
import { useProductForm } from '../useProductForm'

function Manually({ onSuccess }) {
  const initialState = { isNew: true }
  const {
    productName,
    productNumber,
    productQuantity,
    productDate,
    redirect,
    handleProductName,
    handleProductNumber,
    handleProductCategory,
    handleProductQuantity,
    handleProductDate,
    handleSubmit
  } = useProductForm(initialState, onSuccess)

  if (redirect) {
    return <Navigate to="/user" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fields
        type={TYPE_FIELD.INPUT_TEXT}
        label={'Product'}
        id={'product'}
        onChange={handleProductName}
        value={productName}
      />
      <Fields
        type={TYPE_FIELD.INPUT_NUMBER}
        label={'Nombre'}
        id={'InputNumber'}
        min={1}
        defaultValue={productNumber}
        onChange={handleProductNumber}
      />
      <FoodCategory onChange={handleProductCategory} id="catégorie" />
      <Fields
        type={TYPE_FIELD.INPUT_TEXT}
        label={'Quantity'}
        id={'InputQuantity'}
        defaultValue={productQuantity}
        onChange={handleProductQuantity}
      />
      <Fields
        type={TYPE_FIELD.INPUT_DATE}
        label={"date d'expiration"}
        id={'InputDateLimit'}
        onChange={handleProductDate}
        value={productDate}
      />
      <Buttons type={BUTTONS_TYPES.SUBMIT} />
    </form>
  )
}

Manually.propTypes = {
  onSuccess: PropTypes.func.isRequired
}

Manually.defaultProps = {
  onSuccess: null
}

export default Manually
