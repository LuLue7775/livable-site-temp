import { getDocsFromFirestore, getDocFromFirestore } from '@/utils/firebase/firebase.utils'
import { Suspense } from 'react'
import EventContent from './_components/EventContent'
import LoadingIcon from '@/components/LoadingIcon'

export async function generateStaticParams() {
  const events = await getDocsFromFirestore('events')
  return events.map((event) => ({
    eventId: event.id.replace(' ', ''),
  }))
}

export const metadata = {
  title: 'The Livable Studio Single Event Page',
  description: 'Single Event Page for The Livable Studio.',
}

const SingleEventPage = async ({ params }) => {
  const event = await getDocFromFirestore('events', params?.eventId)

  return (
    <div className='relative h-full w-full overflow-hidden text-green-900'>
      <Suspense fallback={<LoadingIcon />}>
        <EventContent event={event} />
      </Suspense>
    </div>
  )
}

export default SingleEventPage
