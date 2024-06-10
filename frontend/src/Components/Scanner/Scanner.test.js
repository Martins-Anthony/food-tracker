import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Scanner from './index'
import Quagga from 'quagga'

jest.mock('quagga')

describe('Scanner Component', () => {
  test('initializes Quagga and calls onDetected on barcode detection', () => {
    const onDetectedMock = jest.fn()

    Quagga.init = jest.fn((config, callback) => {
      callback(null)
    })

    Quagga.start = jest.fn()
    Quagga.stop = jest.fn()

    render(<Scanner onDetected={onDetectedMock} />)

    expect(Quagga.init).toHaveBeenCalledTimes(1)

    expect(Quagga.start).toHaveBeenCalledTimes(1)

    const detectedResult = { codeResult: { code: '123456' } }
    Quagga.onDetected.mock.calls[0][0](detectedResult)

    expect(onDetectedMock).toHaveBeenCalledWith('123456')
  })

  test('renders the interactive viewport', () => {
    render(<Scanner onDetected={() => {}} />)

    const interactiveElement = screen.getByRole('region')
    expect(interactiveElement).toBeInTheDocument()
    expect(interactiveElement).toHaveClass('viewport')
  })
})
