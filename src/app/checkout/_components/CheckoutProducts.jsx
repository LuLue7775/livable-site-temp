'use client'
import { useCart } from '@/providers/cartContext'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import Image from 'next/image'
const CheckoutProducts = () => {
  const { productItems, removeProductsFromCart } = useCart()
  const routerMiddleware = useDelayRouting()

  return (
    <>
      <h2 className='font-serif font-bold '> Product list </h2>
      {productItems &&
        Object.entries(productItems).map(([productId, item]) => (
          <div key={productId} className='py-2 max-w-[400px] flex border-b border-green-900/20 '>
            <a className='cursor-pointer' onClick={() => routerMiddleware.push(`/shop/${item.id}`)}>
              <div className='w-[150px] h-[150px] overflow-hidden'>
                <Image
                  alt={`${productId}-image`}
                  src={item.image}
                  width={1200}
                  height={1200}
                  sizes='100vw'
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            </a>

            <div className='pl-4'>
              <a className='cursor-pointer' onClick={() => routerMiddleware.push(`/shop/${item.id}`)}>
                <h3 className='max-w-[250px] font-serif hover:text-red-400 text-base'>
                  {item.title.zh} <br />
                  {item.title.en}
                </h3>
              </a>
              <div>
                NTD {item.price} x {item.quantity}
              </div>
              <div>
                {Object.entries(item.variation).map(([key, val]) => (
                  <p className='font-mono' key={key}>
                    {key}: {val}
                  </p>
                ))}
              </div>
              <button className='hover:text-red-300 font-mono' onClick={() => removeProductsFromCart({ productId })}>
                {' '}
                [x delete]{' '}
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default CheckoutProducts
