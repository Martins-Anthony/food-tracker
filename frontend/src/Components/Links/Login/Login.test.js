import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import LinkLogin from './index'

describe('LinkLogin Component', () => {
  test('renders the link  with correct test and href', () => {
    render(
      <MemoryRouter>
        <LinkLogin />
      </MemoryRouter>
    )

    expect(screen.getByText('Vous avez un compte ?')).toBeInTheDocument()

    const linkElement = screen.getByText('Se connecter')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement.closest('a')).toHaveAttribute('href', '/login')
  })
})
