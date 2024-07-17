import React, { useEffect, useState } from 'react'
import Quagga from 'quagga'
import config from './config.json'
import { useDispatch } from 'react-redux'
import { scanSuccess } from './scannerSlice'

const Scanner = () => {
  const dispatch = useDispatch()
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const [videoDevices, setVideoDevices] = useState([])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      setVideoDevices(videoDevices)
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId)
      }
    })
  }, [])

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
            ...config.inputStream.constraints,
            deviceId: { exact: selectedDeviceId }
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

    if (selectedDeviceId) {
      initQuagga()
    }

    return () => {
      Quagga.offDetected(detected)
      if (quaggaInitialized) {
        Quagga.stop()
      }
    }
  }, [selectedDeviceId])

  const detected = (result) => {
    dispatch(scanSuccess(result.codeResult.code))
    console.log(result)
  }

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value)
  }

  return (
    <div>
      <div id="interactive" className="viewport" role="region" aria-label="barcode-scanner">
        <div className="guidelines">
          <div className="horizontal"></div>
          <div className="vertical"></div>
        </div>
      </div>
      <select onChange={handleDeviceChange} value={selectedDeviceId || ''}>
        <option value="" disabled>
          Select a camera
        </option>
        {videoDevices.map((device, index) => (
          <option key={index} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Scanner
