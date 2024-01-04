import ShopLayout from './_components/ShopLayout'
// import { prefetchFromFirestore } from '@/utils/firebase/firebase.utils.js'
// import { Hydrate, dehydrate } from '@tanstack/react-query'
// import getQueryClient from '@/utils/react-query/getQueryClient'

export const metadata = {
  title: 'The Livable Studio Shop Page',
  description: 'Shop for The Livable Studio Items.',
}

const ShopPage = async () => {
  // const queryClient = getQueryClient()

  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => await prefetchFromFirestore('products'),
  // })

  // const dehydratedState = dehydrate(queryClient)

  return (
    // <Hydrate state={dehydratedState}>
    <ShopLayout />
    // </Hydrate>
  )
}

export default ShopPage
