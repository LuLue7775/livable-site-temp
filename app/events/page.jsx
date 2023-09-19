import { prefetchFromFirestore } from '@/utils/firebase/firebase.utils'
import getQueryClient from '@/utils/react-query/getQueryClient'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import EventLayout from '@/events/EventLayout'

export default async function Events() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: async () => await prefetchFromFirestore('events'),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <EventLayout/>
    </Hydrate>
  )
}
