import { getDocsFromFirestore, getDocFromFirestore } from '@/utils/firebase/firebase.utils'
import { Suspense } from 'react'
import EventContent from './EventContent'

export async function generateStaticParams() {
  const events = await getDocsFromFirestore('events')
  return events.map((event) => ({
    eventId: event.id.replace(' ', ''),
  }))
}

export default async function Page({ params }) {
  const event = await getDocFromFirestore('events', params?.eventId)

  return (
    <div className='relative h-full w-full overflow-hidden text-green-900'>
      <Suspense fallback={<h2>Loading...</h2>}>
        <EventContent event={event} />
      </Suspense>
    </div>
  )
}
