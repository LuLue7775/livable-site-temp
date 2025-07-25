import React from 'react'
import Carousel from './Carousel'
import Image from 'next/image'

const Lightbox = ({ isLightboxOpened, setLightboxOpened, lightboxIndex, setLightboxIndex, images }) => {
  return (
    <div
      data-testid='lightbox'
      className={`
      ${isLightboxOpened ? 'block' : 'hidden'}
      ${isLightboxOpened ? 'animate-fadeIn' : 'animate-fadeOut'}
        fixed
        left-0 top-0 z-30 h-[100dvh] w-full bg-green-900/20
        backdrop-blur-md backdrop-sepia-0       
      `}
    >
      <button
        data-testid='lightbox-close'
        className='absolute right-0 z-10 cursor-pointer p-6 hover:text-red-400'
        onClick={() => setLightboxOpened(false)}
      >
        [ x close ]
      </button>
      <Carousel amount={images?.length} currSlide={lightboxIndex} setSlide={setLightboxIndex}>
        {images?.map((image, i) => (
          <div
            key={i}
            className={` 
                ${lightboxIndex === i ? 'opacity-100' : 'opacity-0'}
                ${lightboxIndex === i ? 'animate-fadeIn' : 'animate-fadeOut'}
                absolute left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                `}
          >
            <Image
              alt={`event-image${i}`}
              draggable='false'
              src={image}
              sizes='100vw'
              width={1200}
              height={1200}
              style={{
                maxHeight: '1200px',
                maxWidth: '1200px',
                minHeight: '300px',
                minWidth: '300px',
                width: 'auto',
                height: 'auto',
                objectfit: 'contain',
                display: 'inline-block',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Lightbox
