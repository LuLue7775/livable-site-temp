
import { getDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import { Suspense } from 'react'
import EventContent from './EventContent'

export async function generateStaticParams() {
  const events = await getDocsFromFirestore('events')
  return events.map((event) => ({
    eventId: event.id.replace(' ', ''),
  }))
}

export default function Page({ params }) {

  return (
    <div className='relative h-full w-full text-green-900'>
      <Suspense fallback={<h2>Loading...</h2>}>
        <EventContent eventId={params?.eventId} />
      </Suspense>
    </div>
  )
}
