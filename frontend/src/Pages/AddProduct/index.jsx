import Cards from '../../Components/Cards'
import { useLocation } from 'react-router-dom'
import Manually from '../../Containers/Forms/Adding/Product/Manually'
import StorageAreaSelection from '../../Containers/Storage/StorageAreaSelection'

function AddProduct() {
  const location = useLocation()
  const product = location.state?.product

  return (
    <section className="container">
      <div className="col-md-2 my-3">
        <StorageAreaSelection />
      </div>
      {product ? (
        <div className="d-flex justify-content-center">
          <Cards
            type={'product'}
            items={product}
            tag={product.id}
            activeEditMode={true}
            showDeleteButton={false}
            isNewProduct={true}
          />
        </div>
      ) : (
        <Manually />
      )}
    </section>
  )
}

export default AddProduct
