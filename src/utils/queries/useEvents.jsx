import { useInfiniteQuery } from '@tanstack/react-query'
import { getPaginationFromFirestore } from '../firebase/firebase.utils'
import { useState, useCallback } from 'react'

const useEvents = () => {
  const [eventsFilters, setEventsFilters] = useState([])

  const transformEvents = useCallback(
    (data) => {
      const events = data?.pages?.reduce((acc, page) => acc.concat(page.dataMap), [])
      if (!eventsFilters?.length) return events
      else
        return events.reduce((acc, event) => {
          if (eventsFilters.some((filter) => event.tags.includes(filter))) acc.push(event)
          return acc
        }, [])
    },
    [eventsFilters],
  )

  const { data, error, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['events'],
    queryFn: async (props) =>
      await getPaginationFromFirestore({ queryKey: 'events', pageParam: props.pageParam, pageSize: 4 }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.pageParams ?? undefined,
    refetchOnWindowFocus: false,
    select: transformEvents,
  })

  return {
    events: data,
    isLoading,
    isFetching,
    error,
    eventsFilters,
    setEventsFilters,
    fetchNextPage,
  }
}

export default useEvents
