import Image from 'next/image'
import Link from 'next/link'

const ShopItem = ({ product, i }) => {
  return (
    <div
      data-testid='product'
      data-test-date={product?.createdAt.seconds}
      data-test-category={product?.categories?.category}
      data-test-sub_category={product?.categories?.sub_category}
      className={`
                ${i === 0 && 'h-[500px] md:col-span-1 md:col-start-3'} h-auto w-auto`}
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

        <div className={`${i === 0 && 'max-h-[500px] '} `}>
          <Image
            alt={`image-${product?.title?.en}`}
            src={product?.images?.[0]}
            width={1200}
            height={1200}
            sizes='100vw'
            style={
              i === 0
                ? {
                    maxHeight: '500px',
                    objectFit: 'contain',
                    width: '100%',
                    height: 'auto',
                  }
                : {
                    width: '100%',
                    height: 'auto',
                  }
            }
          />
        </div>
      </Link>
    </div>
  )
}

export default ShopItem
