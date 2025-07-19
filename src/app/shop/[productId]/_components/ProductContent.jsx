import ProductBasicDetail from './ProductBasicDetail'
import ProductForm from './ProductForm'
import ProductDetail from './ProductDetail'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

/**　@todo caraousel */
const ProductContent = ({ product }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <main className='absolute top-4 grid w-screen grid-cols-1 gap-8 p-16 md:left-[-200px] md:grid-cols-3'>
      <div className='col-span-1'>
        <div className='relative overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {product?.images?.map((image, index) => (
              <div key={index} className='relative flex-[0_0_100%]'>
                <Image
                  alt={`image-${product?.title?.en}-${index + 1}`}
                  src={image}
                  width={1200}
                  height={1200}
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            ))}
          </div>
          <div className='absolute bottom-0 left-0 w-full p-6'>
            <button 
              className='mr-4 size-10 rounded-full border border-white/30 bg-black/30 font-bold text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:text-red-200 md:size-auto md:px-4 md:py-2' 
              onClick={scrollPrev}
            >
              <span className='!text-white md:hidden'>&lt;</span>
              <span className='hidden md:inline'>&lt; PREV</span>
            </button>
            <button 
              className='mr-4 size-10 rounded-full border  border-white/30 bg-black/30 font-bold text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:text-red-200 md:size-auto md:px-4 md:py-2' 
              onClick={scrollNext}
            >
              <span className='!text-white md:hidden'>&gt;</span>
              <span className='hidden md:inline'>NEXT &gt;</span>
            </button>
          </div>
        </div>
      </div>
      <div className='col-span-1 md:col-span-2'>
        <div className='flex flex-col leading-8 md:flex-row'>
          <h1 data-testid='product-title-zh' className='text-[1.6rem]'> 
            {product?.title?.zh} 
          </h1>
          <p data-testid='product-title-en' className='ml-4 border-l border-green-900/50 pl-4 text-[1.4rem]'>
            {product?.title?.en}
          </p>
        </div>

        <div data-testid='product-details' className='font-mono leading-8'>
          <ProductBasicDetail product={product} />
          <ProductForm product={product} />
          {/* <ProductDetail product={product} /> */}
        </div>
      </div>
    </main>
  )
}

export default ProductContent
