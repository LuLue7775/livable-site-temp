import Image from 'next/image'
import useDelayRouting from '@/utils/hooks/useDelayRouting'

const ShopItem = ({ product, i }) => {
  const isXl = product.grid_size === 'xl' 
  const isLg = product.grid_size === 'lg'
  const routerMiddleware = useDelayRouting()
  
  return (
    <div
      data-testid='product'
      data-test-date={product?.editedAt?.seconds}
      data-test-category={product?.categories?.category}
      data-test-sub_category={product?.categories?.sub_category}
      className={`
                flex size-auto flex-col ${isXl ? 'max-w-[3000px]' : ''}`}
    >
      <a 
        onClick={() => routerMiddleware.push(`/shop/${product?.id}`)} 
        className='flex cursor-pointer flex-col hover:text-red-300'
      >
        <div className={`
          ${isXl ? 'max-w-[700px]' : isLg ? 'max-w-[500px]' : 'max-w-[300px]'}
        `}>
          <Image
            alt={`image-${product?.title?.en}`}
            src={product?.images?.[0]}
            width={1200}
            height={1200}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='h-auto w-full object-contain'
          />
          <div className='my-2'>
            <h2 className='text-sm'>{product?.title?.zh}</h2>
            <div className='flex justify-between'>
              <h2 className='text-lg'>{product?.title?.en}</h2>
              <span className='hidden text-sm min-[1500px]:inline'>[ view ]</span>
            </div>
              {/* <p data-testid='product-price' className='mb-2 text-sm'>
                NTD {product?.price}
              </p> */}
          </div>
        </div>
      </a>
    </div>
  )
}

export default ShopItem
