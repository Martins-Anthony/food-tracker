import React, { useState } from 'react'
import Buttons from '../../Buttons'
import Scanner from '../index'

function ItemScanner() {
  const [camera, setCamera] = useState(false)

  return (
    <>
      <Buttons
        type={'button'}
        onClick={() => setCamera(!camera)}
        label={camera ? 'Stop' : 'Scanner article'}
        className={`btn btn-primary ${camera ? 'mb-2' : ''}`}
      />
      <div className="container-camera">{camera && <Scanner />}</div>
    </>
  )
}

export default ItemScanner
