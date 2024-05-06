import React, { useState } from 'react'
import Manually from '../../Containers/Forms/Adding/Product/Manually'
import StorageAreaSelection from '../../Containers/StorageArea/StorageAreaSelection'
import Scanner from '../../Components/Scanner'

function AddProduct() {
  const [camera, setCamera] = useState(false)
  const [result, setResult] = useState(null)

  const onDetected = (result) => {
    setResult(result)
  }

  return (
    <section className="container">
      <div className="col-md-2 my-3">
        <StorageAreaSelection />
      </div>
      <Manually />
      <div className="container">
        <button className="btn btn-primary" onClick={() => setCamera(!camera)}>
          {camera ? 'Stop' : 'Scanner article'}
        </button>
        <p>{result ? result : null}</p>
        <div className="container-camera">{camera && <Scanner onDetected={onDetected} />}</div>
      </div>
    </section>
  )
}

export default AddProduct
