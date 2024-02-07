import EventDateTime from './EventDateTime'
import { convertTimestampToFormatDate } from '@/utils/functions'
import { parseDateTime, isSameDay } from '@internationalized/date'
import { useEffect, useState } from 'react'
import useEventSingleAnimation from '@/utils/hooks/useEventSingleAnimation'
const EventHeader = ({ event, introScopeRef }) => {
  const [isSingleDayEvent, setCalendar] = useState(false)
  useEffect(() => {
    setCalendar(
      isSameDay(
        parseDateTime(convertTimestampToFormatDate(event?.event_date.start.originalDate)),
        parseDateTime(convertTimestampToFormatDate(event?.event_date.end.originalDate)),
      ),
    )
  }, [event?.event_date.start, event?.event_date.end])

  useEventSingleAnimation({ introScopeRef })

  return (
    <>
      <div style={{ opacity: 0 }} className='event-single-titles'>
        <h1 data-testid='event-single-title' className='mx-6'>
          《{event?.title?.zh}》 {event?.title?.en}
        </h1>
        {!isSingleDayEvent ? (
          <p data-testid='event-single-date' className='zh relative mx-6 mb-4'>
            以下為此活動可選日期時間
            <span className='font-mono'> Available date and time of this event.</span>
          </p>
        ) : (
          <p data-testid='event-single-date' className='zh relative mx-6 mb-4'>
            此活動日期為
            <span className='font-mono'>
              {event?.event_date.start.year} {event?.event_date.start.month} {event?.event_date.start.date},
              {event?.event_date.start.week} {event?.event_date.start.time}-{event?.event_date.end.time}
            </span>
          </p>
        )}
      </div>

      {!isSingleDayEvent && (
        <EventDateTime eventId={event?.id} eventTitleZh={event?.title?.zh} eventTitleEn={event?.title?.en} />
      )}
    </>
  )
}

export default EventHeader
