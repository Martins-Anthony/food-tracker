import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Cards from './index'

describe('Cards Component', () => {
  test('renders card with title and text', () => {
    const title = 'Test Title'
    const text = 'Test Text'

    render(<Cards title={title} text={text} />)

    expect(screen.getByText(title)).toBeInTheDocument()

    expect(screen.getByText(text)).toBeInTheDocument()

    expect(screen.getByAltText('...')).toHaveAttribute(
      'src',
      'https://picsum.photos/300/150?random=2'
    )
  })
})
