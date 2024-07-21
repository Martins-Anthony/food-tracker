import FoodCategory from '../../../FoodCategory'
import { Navigate } from 'react-router-dom'
import Fields, { TYPE_FIELD } from '../../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../../Components/Buttons'
import { useProductForm } from '../useProductForm'

function Manually() {
  const initialState = { isNew: true }
  const {
    productName,
    productQuantity,
    productDate,
    redirect,
    handleProductName,
    handleProductCategory,
    handleProductQuantity,
    handleProductDate,
    handleSubmit
  } = useProductForm(initialState)

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <FoodCategory onChange={handleProductCategory} id="catégorie" />
      <Fields
        type={TYPE_FIELD.INPUT_TEXT}
        label={'Product'}
        id={'product'}
        onChange={handleProductName}
        value={productName}
      />
      <Fields
        type={TYPE_FIELD.INPUT_NUMBER}
        label={'Quantity'}
        id={'InputQuantity'}
        min={1}
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

export default Manually
