import LoadingIcon from '@/components/LoadingIcon'
import Product from './_components/Product'
import { getDocFromFirestore, getDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import { Suspense } from 'react'

export async function generateStaticParams() {
  const products = await getDocsFromFirestore('products')
  return products.map((product) => ({
    productId: product.id.replace(' ', ''),
  }))
}

const sortVariationOrder = (product) => {
  if (!product.variation) return product
  const keys = Object.keys(product.variation)
  const sortedKeys = keys.sort() // sort alphabetically
  const valuesInOrder = sortedKeys.reduce((newMap, key) => {
    newMap[key] = product.variation[key]
    return newMap
  }, {})

  return { ...product, variation: valuesInOrder }
}

const SingleProductPage = async ({ params }) => {
  const product = await getDocFromFirestore('products', params?.productId)

  return (
    <Suspense fallback={<LoadingIcon />}>
      <Product product={sortVariationOrder(product)} />
    </Suspense>
  )
}

export default SingleProductPage
