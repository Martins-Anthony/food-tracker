import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Buttons, { BUTTONS_TYPES } from './index'

describe('Buttons Component', () => {
  test('renders register button', () => {
    render(
      <MemoryRouter>
        <Buttons type={BUTTONS_TYPES.LINK_REGISTER} />
      </MemoryRouter>
    )
    expect(screen.getByText("S'inscrire")).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/signup')
  })

  test('renders login button', () => {
    render(
      <MemoryRouter>
        <Buttons type={BUTTONS_TYPES.LINK_LOGIN} />
      </MemoryRouter>
    )
    expect(screen.getByText('Se connecter')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login')
  })

  test('renders submit button', () => {
    const label = 'Submit'
    render(<Buttons type={BUTTONS_TYPES.BUTTONS} label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  test('renders default link button with address', () => {
    const address = '/home'
    const label = 'Home'
    render(
      <MemoryRouter>
        <Buttons address={address} label={label} />
      </MemoryRouter>
    )
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', address)
  })
})
