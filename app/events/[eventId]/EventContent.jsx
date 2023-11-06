'use client'
import EventDateTime from '@/events/[eventId]/EventDateTime'
import Lightbox from '@/components/Lightbox'
import EventDetail from './EventDetail'
import { eventpage_introAnimation } from '@/utils/animations'
import { convertTimestampToFormatDate } from '@/utils/functions'
import { useState, useRef, useEffect } from 'react'
import { parseDateTime, isSameDay } from '@internationalized/date'

const EventContent = ({ event }) => {
  const [isLightboxOpened, setLightboxOpened] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const titleRef = useRef()
  const formRef = useRef()
  useEffect(() => {
    if (!formRef.current) return
    eventpage_introAnimation({ titleRef, formRef })
  }, [])

  const [isSingleDayEvent, setCalendar] = useState(false)
  useEffect(() => {
    setCalendar(
      isSameDay(
        parseDateTime(convertTimestampToFormatDate(event?.result.event_date.start.originalDate)),
        parseDateTime(convertTimestampToFormatDate(event?.result.event_date.end.originalDate)),
      ),
    )
  }, [event?.result.event_date.start, event?.result.event_date.end])
  return (
    <>
      <div className='relative mt-20 h-full w-full overflow-x-hidden overflow-y-scroll'>
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h1 className='mx-6 '>
            《{event?.result?.title?.zh}》 {event?.result?.title?.en}
          </h1>
          {!isSingleDayEvent ? (
            <p className='zh relative mx-6 mb-4'>
              以下為此活動可選日期時間
              <span className='font-mono'> Available date and time of this event.</span>
            </p>
          ) : (
            <p className='zh relative mx-6 mb-4'>
              此活動日期為
              <span className='font-mono'>
                {event?.result.event_date.start.year} {event?.result.event_date.start.month}{' '}
                {event?.result.event_date.start.date},{event?.result.event_date.start.week}{' '}
                {event?.result.event_date.start.time}-{event?.result.event_date.end.time}
              </span>
            </p>
          )}
        </div>

        {!isSingleDayEvent && (
          <EventDateTime
            formRef={formRef}
            eventId={event?.result?.id}
            eventTitleZh={event?.result?.title?.zh}
            eventTitleEn={event?.result?.title?.en}
          />
        )}
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
