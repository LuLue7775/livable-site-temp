import { useInfiniteQuery } from '@tanstack/react-query'
import { getPaginationFromFirestore } from '../firebase/firebase.utils'
import { useState, useCallback } from 'react'
import { sortFunctionMap, interleaveByGridSize } from '../functions'

export const useProducts = () => {
  const [productsFilter, setProductsFilter] = useState(null)
  const [productsSubFilter, setProductsSubFilter] = useState(null)

  const [sortDateStatus, setSortDate] = useState('none') // none/ asc/ dsc
  const [sortPriceStatus, setSortPrice] = useState('none') // none/ asc/ dsc

  const transformProducts = useCallback(
    (data) => {
      const products = data?.pages
        ?.filter((page) => page.dataMap.length > 0)
        ?.reduce((acc, page) => acc.concat(page.dataMap), [])
        ?.filter((product) => product.published)
        // Deduplicate by ID - keep only the first occurrence
        ?.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        )
        ?.sort(sortFunctionMap(sortDateStatus, 'editedAt.seconds'))
        ?.sort(sortFunctionMap(sortPriceStatus, 'price'))
      
      let filteredProducts
      if (!productsFilter && !productsSubFilter) {
        filteredProducts = products
      } else if (productsSubFilter) {
        filteredProducts = products.filter((product) => {
          return product.categories.sub_category === productsSubFilter
        })
      } else if (productsFilter) {
        filteredProducts = products.filter((product) => {
          return product.categories.category === productsFilter
        })
      }

      // Apply grid size interleaving to spread out grid sizes
      return interleaveByGridSize(filteredProducts)
    },
    [productsFilter, productsSubFilter, sortDateStatus, sortPriceStatus],
  )

  const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async (props) => {
      return await getPaginationFromFirestore({ queryKey: 'products', pageParam: props.pageParam, pageSize: 20 })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.pageParams ?? undefined,
    refetchOnWindowFocus: true,
    staleTime: 0,
    refetchInterval: 1000,
    refetchOnMount: true,
    select: transformProducts,
    // Add these options to force fresh data
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,
  })

  return {
    products: data,
    isLoading,
    isError,
    productsFilter,
    setProductsFilter,
    productsSubFilter,
    setProductsSubFilter,
    fetchNextPage,
    setSortDate,
    setSortPrice,
  }
}
