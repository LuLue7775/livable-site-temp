'use client'
import EventDateTime from '@/events/EventDateTime'
import Lightbox from '@/components/Lightbox'
import EventDetail from './EventDetail'
import { useState, useRef, useEffect } from 'react'
import { eventpage_introAnimation } from '@/utils/animations'


const EventContent = ({ event }) => {
  const [isLightboxOpened, setLightboxOpened] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const titleRef = useRef()
  const formRef = useRef()
  useEffect(() => {
    if (!formRef.current) return
    eventpage_introAnimation({ titleRef,  formRef })
  }, [])


  return (
    <>
      <div className='relative mt-20 h-full w-full overflow-x-hidden overflow-y-scroll'>
        <div ref={titleRef}>
          <h1 className='mx-6 '>
            《{event?.result?.title?.zh}》 
          </h1>
          <h2 className='mx-6 '>
            {event?.result?.title?.en}
          </h2>
          <p className='relative mx-6 mb-4'>以下為此活動可選日期時間 Available date and time of this event.</p>
        </div>

        <EventDateTime formRef={formRef} eventTitleZh={event?.result?.title?.zh} eventTitleEn={event?.result?.title?.en} />
        <EventDetail event={event.result} setLightboxIndex={setLightboxIndex} setLightboxOpened={setLightboxOpened} />
      </div>
      <Lightbox
        isLightboxOpened={isLightboxOpened}
        setLightboxOpened={setLightboxOpened}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        images={event?.result?.images?.image}
      />
    </>
  )
}

export default EventContent
