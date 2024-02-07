'use client'
import EventDetail from './EventDetail'
import EventHeader from './EventHeader'
import Lightbox from '@/components/Lightbox'
import { useState, useRef } from 'react'

const EventContent = ({ event }) => {
  const [isLightboxOpened, setLightboxOpened] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const introScopeRef = useRef(null)
  const mainScopeRef = useRef()

  return (
    <>
      <div ref={introScopeRef} className='relative mt-20 h-full w-full overflow-x-hidden overflow-y-scroll'>
        <EventHeader event={event} introScopeRef={introScopeRef} />
        <div ref={mainScopeRef} className='relative mt-4 flex h-full w-full flex-col items-end '>
          <EventDetail
            event={event}
            setLightboxIndex={setLightboxIndex}
            setLightboxOpened={setLightboxOpened}
            mainScopeRef={mainScopeRef}
          />
        </div>
      </div>
      <Lightbox
        isLightboxOpened={isLightboxOpened}
        setLightboxOpened={setLightboxOpened}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        images={event?.images}
      />
    </>
  )
}

export default EventContent
