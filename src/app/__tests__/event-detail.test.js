import { render, screen } from '@testing-library/react'
import EventImages from '../events/[eventId]/_components/EventImages'
import { useState } from 'react'
import { event } from '../../test/data/mockEventData'

describe('Render', () => {
  test('should render images', () => {
    const MockEvemtImages = () => {
      const [isLightboxOpened, setLightboxOpened] = useState(false)
      const [lightboxIndex, setLightboxIndex] = useState(0)
      return <EventImages event={event} setLightboxIndex={setLightboxIndex} setLightboxOpened={setLightboxOpened} />
    }

    render(<MockEvemtImages />)

    const imagesDisplay = screen.getByTestId('images-wrap')
    const images = imagesDisplay.querySelectorAll('img')
    // Check if at least one image is rendered
    expect(images.length).toBeGreaterThan(0)
  })
})
