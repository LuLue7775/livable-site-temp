import { mapError } from '@/utils/functions'
import { getDocsFromFirestore } from '../firebase/firebase.utils'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
  const [productsFilter, setProductsFilter] = useState(null)
  const [productsSubFilter, setProductsSubFilter] = useState(null)
  const filterProductsByCategories = useCallback(
    (products) => {
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
    [productsFilter, productsSubFilter],
  )

  const {
    data: products,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getDocsFromFirestore('products'),
    refetchOnWindowFocus: false,
    select: filterProductsByCategories,
    retry: 2,
  })

  return {
    products,
    isFetching,
    error: mapError(error),
    setProductsFilter,
    setProductsSubFilter,
  }
}
