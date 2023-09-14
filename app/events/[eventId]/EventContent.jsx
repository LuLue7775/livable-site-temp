import EventDateTime from '@/events/EventDateTime'
import EventDetail from './EventDetail'
import { getDocFromFirestore } from '@/utils/firebase/firebase.utils'

const EventContent = async ({ eventId }) => {
  const event = await getDocFromFirestore('events', eventId)

  return (
    <>
      <h1 className='mx-6 '>
        《{event?.result?.title?.zh}》 {event?.result?.title?.en}
      </h1>
      <p className='relative mx-6 mb-4'>以下為此活動可選日期時間 Available date and time of this event.</p>

      <EventDateTime eventTitleZh={event?.result?.title?.zh} eventTitleEn={event?.result?.title?.en} />
      <EventDetail event={event.result} />
    </>
  )
}

export default EventContent
