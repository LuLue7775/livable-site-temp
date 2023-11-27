import ShopLayout from './_components/ShopLayout'
// import { prefetchFromFirestore } from '@/utils/firebase/firebase.utils.js'
// import { Hydrate, dehydrate } from '@tanstack/react-query'
// import getQueryClient from '@/utils/react-query/getQueryClient'
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
