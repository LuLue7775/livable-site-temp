'use client'

import { useProducts } from '@/utils/react-query/useProducts'
import LoadingIcon from '@/components/LoadingIcon'
import { sortFunctionMap } from '@/utils/functions'
import Image from 'next/image'
import Link from 'next/link'

const ShopList = ({ products, sortDateStatus, sortPriceStatus }) => {
  const { isFetching, error } = useProducts()

  if (error) return conole.error('An error has occurred: ' + error.message)
  return (
    <main data-testid='shop-list' className='grid grid-cols-1 gap-8 md:-translate-y-32 md:grid-cols-3'>
      {isFetching ? (
        <LoadingIcon />
      ) : (
        products
          ?.sort(sortFunctionMap(sortDateStatus, 'createdAt.seconds'))
          ?.sort(sortFunctionMap(sortPriceStatus, 'price'))
          ?.map((product, i) => (
            <div
              data-testid='product'
              data-test-date={product?.createdAt.seconds}
              data-test-category={product?.categories?.category}
              data-test-sub_category={product?.categories?.sub_category}
              key={i}
              className={`
                ${i === 0 && 'md:col-span-1 md:col-start-3 '} h-auto w-auto`}
            >
              <Link href={`/shop/${product?.id}`} className='hover:text-red-300'>
                <h2 className='text-sm'>{product?.title?.zh}</h2>
                <div className='flex justify-between '>
                  <h2 className='text-lg'>{product?.title?.en}</h2>
                  [view more]
                </div>
                <p data-testid='product-price' className='mb-2 border-b border-green-900/50 text-sm'>
                  
                  NTD {product?.price}
                </p>

                <div className={`${i === 0 && 'max-h-[400px] overflow-hidden'} `}>
                  <Image
                    alt={`image-${product?.title?.en}`}
                    src={product?.images?.[0]}
                    width={1200}
                    height={1200}
                    sizes='100vw'
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </Link>
            </div>
          ))
      )}
    </main>
  )
}
export default ShopList
