import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fields, { TYPE_FIELD } from './index'

describe('Fields Component', () => {
  test('renders input email field', () => {
    render(<Fields type={TYPE_FIELD.INPUT_MAIL} />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('id', 'email')
    expect(inputElement).toHaveAttribute('name', 'email')
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('autoComplete', 'username')
    expect(inputElement).toHaveAttribute('required', '')
    expect(inputElement).toHaveFocus()

    const labelElement = screen.getByLabelText('Email')
    expect(labelElement).toBeInTheDocument()
  })

  test('renders nothing for default type', () => {
    const { container } = render(<Fields type={0} />)
    expect(container.firstChild).toBeNull()
  })
})
