import EventLayout from './_components/EventLayout'
// import { prefetchFromFirestore } from '@/utils/firebase/firebase.utils'
// import getQueryClient from '@/utils/react-query/getQueryClient'
// import { dehydrate, Hydrate } from '@tanstack/react-query'

/** next 13 way of fetching on severside  */
const EventsPage = async () => {
  // const queryClient = getQueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['events'],
  //   queryFn: async () => await prefetchFromFirestore('events'),
  // })

  // const dehydratedState = dehydrate(queryClient)

  return (
    // <Hydrate state={dehydratedState}>
    <EventLayout />
    // </Hydrate>
  )
}
export default EventsPage
