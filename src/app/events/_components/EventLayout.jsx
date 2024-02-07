'use client'

import useEvents from '@/utils/queries/useEvents'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'
import EventList from './EventList'
import EventIntro from './EventIntro'
const EventLayout = () => {
  const introScopeRef = useRef()
  const { events, eventsFilters, setEventsFilters, error, fetchNextPage } = useEvents()

  const handleReadmore = () => fetchNextPage()
  const { ref: reachBottom, inView } = useInView({
    threshold: 0,
  })
  useEffect(() => {
    if (inView) handleReadmore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (error) return console.error('An error has occurred: ' + error)
  return (
    <div ref={introScopeRef} className='relative h-full w-full px-8 text-green-900'>
      <EventIntro
        introScopeRef={introScopeRef}
        events={events}
        eventsFilters={eventsFilters}
        setEventsFilters={setEventsFilters}
      />

      <div
        data-testid='event-list'
        className='relative h-auto pb-8 md:ml-0 md:h-3/5 md:max-h-[calc(100vh-300px)] md:overflow-y-scroll md:pb-20'
      >
        <EventList events={events} reachBottom={reachBottom} />
      </div>
    </div>
  )
}

export default EventLayout
