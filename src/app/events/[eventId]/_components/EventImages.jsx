import Image from 'next/image'
import React from 'react'

const EventImages = ({ event, setLightboxIndex, setLightboxOpened }) => {
  return (
    <div data-testid='event-images-wrap' className='inline-flex h-auto w-auto max-w-[90vw] flex-wrap gap-8'>
      {event?.images?.map((image, i) => (
        <div key={i}>
          <Image
            data-testid='event-image'
            alt={`event-image${i}`}
            sizes='100vw'
            src={image}
            width={1200}
            height={1200}
            style={{
              maxHeight: '600px',
              maxWidth: '600px',
              minHeight: '200px',
              minWidth: '300px',
              width: 'auto',
              height: 'auto',
              objectfit: 'contain',
              display: 'inline-block',
            }}
            onClick={() => {
              setLightboxOpened(true)
              setLightboxIndex(i)
            }}
            className='cursor-pointer'
          />
          <p className=' '> NO.{i + 1}</p>
        </div>
      ))}
    </div>
  )
}

export default EventImages
