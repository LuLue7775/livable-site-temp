'use client'
import ShopItem from './ShopItem'
import LoadingIcon from '@/components/LoadingIcon'
import { useProducts } from '@/utils/queries/useProducts'

const ShopList = ({ products, error }) => {
  const { isLoading } = useProducts()

  if (error) return conole.error('An error has occurred: ' + error.message)
  return (
    <main data-testid='shop-list' className='grid grid-cols-1 gap-8 md:-translate-y-32 md:grid-cols-3'>
      {products?.map((product, i) =>
        !isLoading ? <ShopItem key={i} product={product} i={i} /> : <LoadingIcon key={i} />,
      )}
    </main>
  )
}
export default ShopList
