import React, { useEffect } from 'react'
import Quagga from 'quagga'
import config from './config.json'
import PropTypes from 'prop-types'

const Scanner = (props) => {
  const { onDetected } = props

  useEffect(() => {
    Quagga.init(config, (err) => {
      if (err) {
        console.log(err, 'error msg')
      }
      Quagga.start()
      return () => {
        Quagga.stop()
      }
    })

    Quagga.onProcessed((result) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height'))
          )
          result.boxes
            .filter(function (box) {
              return box !== result.box
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              })
            })
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          })
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
            color: 'red',
            lineWidth: 3
          })
        }
      }
    })

    Quagga.onDetected(detected)
  }, [])

  const detected = (result) => {
    onDetected(result.codeResult.code)
  }

  return <div id="interactive" className="viewport" role="region" aria-label="barcode-scanner" />
}

Scanner.propTypes = {
  onDetected: PropTypes.func.isRequired
}

export default Scanner
