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
          <div key={productId} className='flex max-w-[400px] border-b border-green-900/20 py-2 '>
            <a className='cursor-pointer' onClick={() => routerMiddleware.push(`/shop/${item.id}`)}>
              <div className='h-[150px] w-[150px] overflow-hidden'>
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
                <h3 className='max-w-[250px] font-serif text-base hover:text-red-400'>
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
              <button className='font-mono hover:text-red-300' onClick={() => removeProductsFromCart({ productId })}>
                [x delete]
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default CheckoutProducts
