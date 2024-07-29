import React, { useState } from 'react'
import Cards from '../../Components/Cards'
import { useLocation, Navigate } from 'react-router-dom'
import Manually from '../../Containers/Forms/Adding/Product/Manually'
import StorageAreaSelection from '../../Containers/Storage/StorageAreaSelection'

function AddProduct() {
  const location = useLocation()
  const product = location.state?.product
  const [redirect, setRedirect] = useState(false)

  const handleSuccess = () => {
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/user" />
  }

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
            onSuccess={handleSuccess}
          />
        </div>
      ) : (
        <Manually onSuccess={handleSuccess} />
      )}
    </section>
  )
}

export default AddProduct
