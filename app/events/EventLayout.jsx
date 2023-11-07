'use client'
import EventList from '@/events/EventList'
import EventDescription from '@/events/EventDescription'
import EventsFilterButtons from '@/events/EventsFilterButtons'
import LoadingIcon from '@/components/LoadingIcon'
import {
  getDocsFromFirestore,
  // getNextPageDocsFromFirestore,
} from '@/utils/firebase/firebase.utils'

// import { useInView } from 'react-intersection-observer'
import { 
  useQuery, 
  // useInfiniteQuery 
} from '@tanstack/react-query'
import { useEffect, useState, useRef, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { introAnimation } from '@/utils/animations'

const EventLayout = () => {
  const buttonsRef = useRef()
  const descriptionRef = useRef()
  useEffect(() => {
    if (!buttonsRef.current) return
    introAnimation([buttonsRef.current, descriptionRef.current])
  }, [])

  /** Without infinite load */
  const {
    data: moredata,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await getDocsFromFirestore('events'),
  })
  const [displayFilteredData, setFilteredData] = useState(moredata?.pages?.[0]?.data || [])
  useEffect(() => {
    setFilteredData(moredata)
  }, [moredata])

  /** With infinite load */
  // const {
  //   data: storeData,
  //   error,
  //   isFetching,
  //   fetchNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ['events'],
  //   queryFn: ({ pageParam = 1, signal }) => getNextPageDocsFromFirestore('events', pageParam, signal),
  //   getNextPageParam: (lastPage) => lastPage.nextPageParam,
  //   refetchOnWindowFocus: false,
  // })

  // const [displayFilteredData, setFilteredData] = useState(storeData?.pages?.[0]?.data || [])
  // const flattenedStoreData = useMemo(() => {
  //   /** weird bug: storeData is mutated somewhere.  */
  //   if (Array.isArray(storeData)) return storeData
  //   return storeData?.pages?.flatMap((page) => page.data)
  // }, [storeData])

  // const handleReadmore = () => {
  //   fetchNextPage()
  // }

  // const { ref: reachBottom, inView } = useInView({
  //   threshold: 0,
  // })

  // useEffect(() => {
  //   if (inView) handleReadmore()
  // }, [inView])

  if (error) return toast.error('An error has occurred: ' + error.message)

  return (
    <div className='relative h-full w-full px-8 text-green-900'>
      <div className='relative grid h-auto w-full grid-cols-1 justify-between pb-4 md:h-2/5 md:grid-cols-2 '>
        <div ref={buttonsRef} style={{ opacity: 0 }} className='flex h-full w-full basis-1/2 items-end'>
          <EventsFilterButtons
            // flattenedStoreData={flattenedStoreData}
            flattenedStoreData={moredata}
            displayFilteredData={displayFilteredData}
            setFilteredData={setFilteredData}
          />
        </div>
        <div
          ref={descriptionRef}
          style={{ opacity: 0 }}
          className='order-first flex h-full max-h-[150px] w-2/3 shrink basis-1/2 justify-self-end overflow-hidden pb-8 text-lg md:order-last md:w-full md:justify-self-start md:text-2xl'
        >
          <EventDescription />
        </div>
      </div>

      <div className='relative h-auto pb-8 md:ml-0 md:h-3/5 md:max-h-[calc(100vh-300px)] md:overflow-y-scroll md:pb-20'>
        {isFetching ? (
          <LoadingIcon />
        ) : (
          <EventList
            displayFilteredData={displayFilteredData}
            // reachBottom={reachBottom}
          />
        )}
      </div>
    </div>
  )
}

export default EventLayout
