'use client'

import { getNextPageDocsFromFirestore } from '@/utils/firebase/firebase.utils'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState, useRef, useMemo } from 'react'
import { introAnimation } from '@/utils/animations'
import EventsFilterButtons from './EventsFilterButtons'
import EventDescription from './EventDescription'
import EventList from './EventList'

const EventLayout = () => {
  const buttonsRef = useRef()
  const descriptionRef = useRef()
  useEffect(() => {
    if (!buttonsRef.current) return
    introAnimation([buttonsRef.current, descriptionRef.current])
  }, [])

  const {
    data: storeData,
    error,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['events'],
    queryFn: async ({ pageParam }) => {
      const defaultPageParam = pageParam === undefined || pageParam === null ? 1 : pageParam
      return await getNextPageDocsFromFirestore({
        queryKey: 'events',
        pageParam: defaultPageParam,
        orderTag: 'event_date.start.originalDate',
      })
    },
    getNextPageParam: (lastPage) => lastPage?.nextPageParam,
    refetchOnWindowFocus: false,
  })

  const flattenedStoreData = useMemo(() => {
    return storeData?.pages?.map((page) => page?.data).flat() ?? []
  }, [storeData])

  const handleReadmore = () => {
    fetchNextPage()
  }

  const { ref: reachBottom, inView } = useInView({
    threshold: 0,
  })
  useEffect(() => {
    if (inView) handleReadmore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const [displayFilteredData, setFilteredData] = useState(storeData?.pages?.[0]?.data || [])

  if (error) return console.error('An error has occurred: ' + error.message)

  return (
    <div className='relative h-full w-full px-8 text-green-900'>
      <div className='relative grid h-auto w-full grid-cols-1 justify-between pb-4 md:h-2/5 md:grid-cols-2 '>
        <div
          data-testid='event-filter'
          ref={buttonsRef}
          style={{ opacity: 0 }}
          className='flex h-full w-full basis-1/2 items-end font-mono'
        >
          <EventsFilterButtons
            flattenedStoreData={flattenedStoreData}
            displayFilteredData={displayFilteredData}
            setFilteredData={setFilteredData}
          />
        </div>
        <div
          data-testid='event-desc'
          ref={descriptionRef}
          style={{ opacity: 0 }}
          className='order-first flex h-full max-h-[150px] w-2/3 shrink basis-1/2 justify-self-end overflow-hidden pb-8 text-lg md:order-last md:w-full md:justify-self-start md:text-2xl'
        >
          <EventDescription />
        </div>
      </div>

      <div
        data-testid='event-list'
        className='relative h-auto pb-8 md:ml-0 md:h-3/5 md:max-h-[calc(100vh-300px)] md:overflow-y-scroll md:pb-20'
      >
        <EventList displayFilteredData={displayFilteredData} reachBottom={reachBottom} />
      </div>
    </div>
  )
}

export default EventLayout
