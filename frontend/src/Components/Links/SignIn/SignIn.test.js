import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import LinkSignup from './index'

describe('LinkSignup Component', () => {
  test('renders the link  with correct test and href', () => {
    render(
      <MemoryRouter>
        <LinkSignup />
      </MemoryRouter>
    )

    expect(screen.getByText("Vous n'avez pas de compte ?")).toBeInTheDocument()

    const linkElement = screen.getByText("S'inscrire")
    expect(linkElement).toBeInTheDocument()
    expect(linkElement.closest('a')).toHaveAttribute('href', '/signup')
  })
})
