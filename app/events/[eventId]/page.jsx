import EventDateTime from '@/events/EventDateTime'
import { getDocsFromFirestore, getDocFromFirestore } from '@/utils/firebase/firebase.utils'
import EventDetail from './EventDetail'
import { Suspense } from 'react'

export async function generateStaticParams() {
  const events = await getDocsFromFirestore('events')
  return events.map((event) => ({
    eventId: event.id.replace(' ', ''),
  }))
}

export default async function Page({ params }) {
  const event = await getDocFromFirestore('events', params.eventId)

  return (
    <div className='relative h-full w-full text-green-900'>
      <Suspense fallback={<h2>Loading...</h2>}>
        <h1 className='mx-6 '>
          《{event?.result?.title?.zh}》 {event?.result?.title?.en}
        </h1>
        <p className='relative mx-6 mb-4'>以下為此活動可選日期時間 Available date and time of this event.</p>
        <EventDateTime eventTitleZh={event?.result?.title?.zh} eventTitleEn={event?.result?.title?.en} />
        <EventDetail event={event.result} />
      </Suspense>
    </div>
  )
}
