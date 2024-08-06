import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DateToday from './index'

describe('DateToday Component', () => {
  beforeAll(() => {
    const mockDate = new Date(2023, 5, 7)
    global.Date = jest.fn(() => mockDate)
  })

  afterAll(() => {
    global.Date = Date
  })

  test('renders the correct date', () => {
    render(<DateToday />)

    const dateElement = screen.getByText('07 / 06 / 2023')
    expect(dateElement).toBeInTheDocument()
  })
})
