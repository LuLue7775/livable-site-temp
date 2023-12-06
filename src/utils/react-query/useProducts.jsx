import { mapError } from '@/utils/functions'
import { getDocsFromFirestore, getNextPageDocsFromFirestore, productsNextBatch } from '../firebase/firebase.utils'
import { useCallback, useState, useEffect, useMemo } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

export const useProducts = () => {
  const [productsFilter, setProductsFilter] = useState(null)
  const [productsSubFilter, setProductsSubFilter] = useState(null)
  // const filterProductsByCategories = useCallback(
  //   (products) => {
  //     if (!productsFilter && !productsSubFilter) return products
  //     if (productsSubFilter) {
  //       return products.filter((product) => {
  //         return product.categories.sub_category === productsSubFilter
  //       })
  //     } else if (productsFilter) {
  //       return products.filter((product) => {
  //         return product.categories.category === productsFilter
  //       })
  //     }
  //   },
  //   [productsFilter, productsSubFilter],
  // )

  // const {
  //   data: products,
  //   error,
  //   isFetching,
  //   fetchNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ['products'],
  //   queryFn: async ({ pageParam }) => {
  //     const defaultPageParam = pageParam === undefined || pageParam === null ? 1 : pageParam
  //     return await getNextPageDocsFromFirestore({
  //       queryKey: 'products',
  //       pageParam: defaultPageParam,
  //       orderTag: 'createdAt',
  //     })
  //   },
  //   getNextPageParam: (lastPage) => lastPage?.nextPageParam,
  //   refetchOnWindowFocus: false,
  //   select: filterProductsByCategories,
  //   retry: 2,
  // })

  const [products, setProducts] = useState([])
  const [lastKey, setLastKey] = useState('')
  const [isFetching, setNextFetching] = useState(false)
  const [error, setError] = useState('')

  const fetchMorePosts = (key) => {
    if (key.toString().length > 0) {
      productsNextBatch(key)
        .then((res) => {
          setLastKey(res.lastKey)
          // add new posts to old posts
          setProducts(products.concat(res.dataMap))
          setNextFetching(false)
        })
        .catch((err) => {
          setError(err)
          setNextFetching(false)
        })
    }
  }
  // const {
  //   data: products,
  //   error,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => await getDocsFromFirestore('products'),
  //   refetchOnWindowFocus: false,
  //   select: filterProductsByCategories,
  //   retry: 2,
  // })

  const filterProductsByCategories = useMemo(() => {
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
  }, [products, productsFilter, productsSubFilter])

  return {
    isFetching,
    error,
    setProductsFilter,
    setProductsSubFilter,
    products,
    filterProductsByCategories,
    setProducts,
    lastKey,
    setLastKey,
    fetchMorePosts,
  }
}
