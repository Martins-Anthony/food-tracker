import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Logo } from '../../Components/Logo'
import Hero from './index'

jest.mock('../../Components/Logo', () => ({
  Logo: () => <div data-testid="Logo">Logo</div>
}))

describe('Hero Component', () => {
  test('renders the hero component with welcome message and Logo', () => {
    render(<Hero />)

    expect(screen.getByText('Bienvenue sur')).toBeInTheDocument()

    expect(screen.getByTestId('Logo')).toBeInTheDocument()
  })
})
