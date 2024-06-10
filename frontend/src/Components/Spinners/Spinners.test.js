import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinners from './index'

describe('Spinners Component', () => {
  test('renders the Spinners with correct attributes', () => {
    render(<Spinners />)

    const spinnerContainer = screen.getByRole('status')
    expect(spinnerContainer).toBeInTheDocument()
    expect(spinnerContainer).toHaveClass('spinner-border spinner-style')

    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
    expect(loadingText).toHaveClass('visually-hidden')
  })

  test('renders the spinner container with correct class', () => {
    render(<Spinners />)

    const spinnerContainer = screen.getByRole('status').closest('.spinner-container')
    expect(spinnerContainer).toBeInTheDocument()
    expect(spinnerContainer).toHaveClass('d-flex justify-content-center spinner-container')
  })
})
