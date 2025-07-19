'use client'
import ProductContent from './ProductContent'
import useCommonMainAnimation from '@/utils/hooks/useCommonMainAnimation'

const ProductLayout = ({ product, mainScopeRef }) => {
  useCommonMainAnimation({ mainScopeRef })

  return (
    <>
      <div
        className={
          'content-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <div
          // style={{ opacity: 0 }}
          className='horizontal-line shop relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        // style={{ opacity: 0 }}
        className='content-body relative 
                    bottom-0  
                    min-h-[600px] w-full min-w-[350px] translate-x-[-4px] 
                    translate-y-px border-l border-green-900/60 md:w-[calc(100%-200px)]
                    '
      >
        <ProductContent product={product} />
      </div>
    </>
  )
}

export default ProductLayout
