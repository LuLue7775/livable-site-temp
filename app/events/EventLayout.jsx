'use client'
import EventList from '@/events/EventList'
import EventDescription from '@/events/EventDescription'
import EventsFilterButtons from '@/events/EventsFilterButtons'
import {
  getNextPageDocsFromFirestore,
  addCollectionAndDocuments,
  getEventsFirestore,
  addDocuments,
} from '@/utils/firebase/firebase.utils'
import { filterIncomingData, convertSpaceToDashLowerCase } from '@/utils/functions'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useInView } from 'react-intersection-observer'
import { VACANCY } from '@/utils/firebase/mockData2'
import { EVENT_DATA } from '@/utils/firebase/mockData'

const EventLayout = () => {
  // const { data: events } = useQuery({
  //   queryKey: ['eventlist'],
  //   queryFn: getEventsFirestore,
  // })

  // useEffect(() => {
  //   addDocuments('events', EVENT_DATA)
  // }, [])

  const {
    data: moredata,
    error,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam = 1, signal }) => getNextPageDocsFromFirestore('events', pageParam, signal),
    getNextPageParam: (lastPage, allPages) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  })

  const [displayFilteredData, setFilteredData] = useState(moredata?.pages?.[0]?.data || [])

  const handleReadmore = () => {
    fetchNextPage()
  }

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) handleReadmore()
  }, [inView])

  // Errors in the 4xx range can be handled locally (e.g. if some backend validation failed),
  // while all 5xx server errors can be propagated to the Error Boundary
  if (error) return toast.error('An error has occurred: ' + error.message)

  return (
    <div className='relative h-full w-full px-8 text-green-900'>
      <div className='relative grid h-auto w-full grid-cols-1 justify-between pb-4 md:h-2/5 md:grid-cols-2 '>
        <div className='flex h-full w-full basis-1/2 items-end'>
          <EventsFilterButtons moredata={moredata} setFilteredData={setFilteredData} />
        </div>
        <div className='order-first flex h-full max-h-[250px] w-2/3 shrink basis-1/2 justify-self-end pb-8 text-lg md:order-last md:w-full md:justify-self-start md:text-3xl'>
          <EventDescription />
        </div>
      </div>

      <div className='relative h-auto w-full pb-8 md:h-3/5 md:max-h-[calc(100vh-300px)] md:overflow-y-scroll md:pb-20'>
        {isFetching ? 'Loading...' : <EventList displayFilteredData={displayFilteredData} />}
        <div ref={ref} className='h-12 ' />
      </div>
    </div>
  )
}

export default EventLayout
