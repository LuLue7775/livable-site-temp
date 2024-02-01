import { useInfiniteQuery } from '@tanstack/react-query'
import { getPaginationFromFirestore } from '../firebase/firebase.utils'
import { useState, useCallback } from 'react'
import { sortFunctionMap } from '../functions'

export const useProducts = () => {
  const [productsFilter, setProductsFilter] = useState(null)
  const [productsSubFilter, setProductsSubFilter] = useState(null)

  const [sortDateStatus, setSortDate] = useState('none') // none/ asc/ dsc
  const [sortPriceStatus, setSortPrice] = useState('none') // none/ asc/ dsc

  const transformProducts = useCallback(
    (data) => {
      const products = data?.pages
        ?.reduce((acc, page) => acc.concat(page.dataMap), [])
        ?.sort(sortFunctionMap(sortDateStatus, 'createdAt.seconds'))
        ?.sort(sortFunctionMap(sortPriceStatus, 'price'))
      if (!productsFilter && !productsSubFilter) return products
      if (productsSubFilter) {
        return products.filter((product) => {
          return product.categories.sub_category === productsSubFilter
        })
      } else if (productsFilter) {
        return products.filter((product) => {
          return product.categories.category === productsFilter
        })
      }
    },
    [productsFilter, productsSubFilter, sortDateStatus, sortPriceStatus],
  )

  const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async (props) =>
      await getPaginationFromFirestore({ queryKey: 'products', pageParam: props.pageParam, pageSize: 8 }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.pageParams ?? undefined,
    refetchOnWindowFocus: false,
    select: transformProducts,
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
