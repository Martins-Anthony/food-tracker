import React, { useState } from 'react'
import Buttons, { BUTTONS_TYPES } from '../../Buttons'
import Scanner from '../index'

function ItemScanner() {
  const [camera, setCamera] = useState(false)

  return (
    <>
      <Buttons
        type={BUTTONS_TYPES.BUTTON}
        onClick={() => setCamera(!camera)}
        label={camera ? 'Stop' : 'Scanner article'}
        className={`btn btn-success ${camera ? 'mb-2' : ''}`}
      />
      <div className="container-camera">{camera && <Scanner />}</div>
    </>
  )
}

export default ItemScanner
