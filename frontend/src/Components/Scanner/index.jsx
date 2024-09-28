import React, { useEffect } from 'react'
import Quagga from 'quagga'
import config from './config.json'
import { useDispatch } from 'react-redux'
import { scanSuccess } from './scannerSlice'

const Scanner = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let quaggaInitialized = false

    const initQuagga = async () => {
      const canvas = document.querySelector('#interactive canvas')
      if (canvas) {
        canvas.getContext('2d', { willReadFrequently: true })
      }

      const scannerConfig = {
        ...config,
        inputStream: {
          ...config.inputStream,
          constraints: {
            ...config.inputStream.constraints
          }
        }
      }

      Quagga.init(scannerConfig, (err) => {
        if (err) {
          console.log(err, 'error msg')
          return
        }
        Quagga.start()
        quaggaInitialized = true
      })

      Quagga.onProcessed((result) => {
        if (result) {
          const drawingCtx = Quagga.canvas.ctx.overlay
          const drawingCanvas = Quagga.canvas.dom.overlay

          if (result.boxes) {
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)
            result.boxes
              .filter((box) => box !== result.box)
              .forEach((box) => {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: 'green',
                  lineWidth: 8
                })
              })
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: '#00F',
              lineWidth: 8
            })
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
              color: 'red',
              lineWidth: 12
            })
          }
        }
      })

      Quagga.onDetected(detected)
    }

    initQuagga()
    return () => {
      Quagga.offDetected(detected)
      if (quaggaInitialized) {
        Quagga.stop()
      }
    }
  }, [])

  const detected = (result) => {
    dispatch(scanSuccess(result.codeResult.code))
  }

  return (
    <div id="interactive" className="viewport" role="region" aria-label="barcode-scanner">
      <div className="guidelines">
        <div className="horizontal"></div>
        <div className="vertical"></div>
      </div>
    </div>
  )
}

export default Scanner
