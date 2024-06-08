import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { LogoAndIconUser } from './index'

describe('LogoAndIconUser Component', () => {
  test('renders the Logo and user icon with correct attributes', () => {
    render(
      <MemoryRouter>
        <LogoAndIconUser />
      </MemoryRouter>
    )

    const logoElement = screen.getByRole('link', { name: /food tracker/i })
    expect(logoElement).toBeInTheDocument()

    const logoLink = screen.getByTitle('Logo FOOD TRACKER')
    expect(logoLink).toHaveAttribute('href', '/')

    const userIcon = screen.getByRole('img', { hidden: true })
    expect(userIcon).toBeInTheDocument()
    expect(userIcon).toHaveAttribute('width', '160')
    expect(userIcon).toHaveAttribute('height', '160')
    expect(userIcon).toHaveAttribute('fill', 'var(--bs-primary)')
  })
})
